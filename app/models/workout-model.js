import mongoose, { Schema } from 'mongoose';
import round from 'lodash.round';

/* Schema for the Workout model */
const WorkoutSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'User' }, // match id type to User model
  creatorName: String,
  activity: String,
  distance: Number,
  distUnit: String,
  time: Number,
  timeString: String,
  split: Number,
  splitDist: String,
  splitUnit: String,
  strokeRate: Number,
  watts: Number,
  avgHR: Number,
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

const WorkoutModel = mongoose.model('Workout', WorkoutSchema);

export default WorkoutModel;
