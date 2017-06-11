import mongoose, { Schema } from 'mongoose';

/* Schema for the Workout model */
const WorkoutSchema = new Schema({
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
  const seconds = remainder % 60;
  const dec = seconds % 1;

  /* format string representation of workout time */
  if (hours === 0) {
    workout.timeString = `${minutes}:${seconds}.${dec}`;
  } else {
    workout.timeString = `${hours}:${minutes}:${seconds}.${dec}`;
  }
  next();
});

const WorkoutModel = mongoose.model('Workout', WorkoutSchema);

export default WorkoutModel;
