import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

/* Schema for the Team model */
const TeamSchema = new Schema({
  name: String,
  athletes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  coaches: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }],
  teamWorkouts: [{ type: Schema.Types.ObjectId, ref: 'TeamWorkout' }],
  teamCode: { type: String, default: shortid.generate },
});

TeamSchema.set('toJSON', {
  virtuals: true,
});

TeamSchema.pre('save', (next) => {
  next();
});

const TeamModel = mongoose.model('Team', TeamSchema);

export default TeamModel;
