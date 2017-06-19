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
      workout.timeString = `${minutes}:0${seconds}${dec}`;
    } else {
      workout.timeString = `${minutes}:${seconds}${dec}`;
    }
  } else if (seconds < 10) {
    workout.timeString = `${hours}:0${minutes}:${seconds}${dec}`;
  } else {
    workout.timeString = `${hours}:${minutes}:${seconds}${dec}`;
  }
  next();
});

const WorkoutModel = mongoose.model('Workout', WorkoutSchema);

export default WorkoutModel;
