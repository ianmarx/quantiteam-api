import mongoose, { Schema } from 'mongoose';

/* Schema for the TeamWorkout model */
const TeamWorkoutSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  creatorName: String,
  _team: { type: Schema.Types.ObjectId, ref: 'Team' },
  teamName: String,
  activity: String,
  distance: Number,
  distUnit: String,
  time: Number,
  results: [{ type: Schema.Types.ObjectId, ref: 'Workout' }],
});

TeamWorkoutSchema.set('toJSON', {
  virtuals: true,
});

TeamWorkoutSchema.pre('save', (next) => {
  next();
});

const TeamWorkoutModel = mongoose.model('TeamWorkout', TeamWorkoutSchema);

export default TeamWorkoutModel;
