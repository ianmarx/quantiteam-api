import mongoose, { Schema } from 'mongoose';
import round from 'lodash.round';

/* Schema for the Workout model */
const WorkoutSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'User' }, // match id type to User model
  creatorName: String,
  date: { type: Date, default: Date.now },
  activity: String,
  distance: Number,
  distUnit: String,
  time: Number,
  timeString: String,
  split: Number,
  splitDist: String,
  splitUnit: String,
  splitString: String,
  strokeRate: Number,
  watts: Number,
  avgHR: Number,
  wattsPerBeat: Number,
});

WorkoutSchema.set('toJSON', {
  virtuals: true,
});

WorkoutSchema.pre('save', function timeToString(next) {
  const workout = this;

  /* exit function if time value hasn't been changed */
  if (!workout.isModified('time')) return next();

  /* divide up total number of seconds into time units */
  const hours = Math.floor(workout.time / 3600);
  const remainder = workout.time % 3600;
  const minutes = Math.floor(remainder / 60);
  const seconds = round((remainder % 60), 1);
  let dec = seconds % 1;

  if (dec === 0) {
    dec = '.0';
  } else {
    dec = '';
  }

  /* format string representation of workout time */
  if (hours === 0) {
    if (seconds < 10) {
      // mm:0s.d
      workout.timeString = `${minutes}:0${seconds}${dec}`;
    } else {
      // mm:ss.d
      workout.timeString = `${minutes}:${seconds}${dec}`;
    }
  } else if (seconds < 10 || seconds === 0) {
    if (minutes < 10) {
      // hh:0m:0s.d
      workout.timeString = `${hours}:0${minutes}:0${seconds}${dec}`;
    } else {
      // hh:mm:0s.d
      workout.timeString = `${hours}:${minutes}:0${seconds}${dec}`;
    }
  } else if (minutes < 10) {
    // hh:0m:ss.d
    workout.timeString = `${hours}:0${minutes}:${seconds}${dec}`;
  } else {
    // hh:mm:ss.d
    workout.timeString = `${hours}:${minutes}:${seconds}${dec}`;
  }
  next();
});

WorkoutSchema.pre('save', function calculateSplit(next) {
  const workout = this;

  if (!workout.isModified('time')) return next();

  if (workout.activity !== 'erg' || workout.distUnit !== 'm') return next();

  const splitSeconds = (workout.time / (workout.distance / 500));
  workout.split = splitSeconds;
  workout.splitDist = 500;
  workout.splitUnit = 'm';

  const hours = Math.floor(splitSeconds / 3600);
  const remainder = splitSeconds % 3600;
  const minutes = Math.floor(remainder / 60);
  const seconds = round((remainder % 60), 1);
  let dec = round(seconds % 1, 1);

  if (dec === 0) {
    dec = '.0';
  } else {
    dec = '';
  }

  /* format string representation of workout time */
  if (hours === 0) {
    if (seconds < 10) {
      // mm:0s.d
      workout.splitString = `${minutes}:0${seconds}${dec}`;
    } else {
      // mm:ss.d
      workout.splitString = `${minutes}:${seconds}${dec}`;
    }
  } else if (seconds < 10 || seconds === 0) {
    if (minutes < 10) {
      // hh:0m:0s.d
      workout.splitString = `${hours}:0${minutes}:0${seconds}${dec}`;
    } else {
      // hh:mm:0s.d
      workout.splitString = `${hours}:${minutes}:0${seconds}${dec}`;
    }
  } else if (minutes < 10) {
    // hh:0m:ss.d
    workout.splitString = `${hours}:0${minutes}:${seconds}${dec}`;
  } else {
    // hh:mm:ss.d
    workout.splitString = `${hours}:${minutes}:${seconds}${dec}`;
  }
  next();
});

WorkoutSchema.pre('save', function calculateWatts(next) {
  const workout = this;

  if (!workout.isModified('time')) return next();

  if (workout.activity !== 'erg' || workout.distUnit !== 'm') return next();

  // based on Concept2 watts equation
  workout.watts = round((2.80 / (Math.pow((workout.split / 500), 3), 1)));

  next();
});

WorkoutSchema.pre('save', function calculateWattsPerBeat(next) {
  const workout = this;

  if (!workout.isModified('time')) return next();

  if (!workout.watts || !workout.avgHR) return next();

  workout.wattsPerBeat = round((workout.watts / workout.avgHR), 3);

  next();
});

const WorkoutModel = mongoose.model('Workout', WorkoutSchema);

export default WorkoutModel;
