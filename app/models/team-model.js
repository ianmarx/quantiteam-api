import mongoose, { Schema } from 'mongoose';

/* Schema for the Team model */
const TeamSchema = new Schema({
  name: String,
  athletes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  coaches: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }],
});

TeamSchema.set('toJSON', {
  virtuals: true,
});

TeamSchema.pre('save', (next) => {
  next();
});

const TeamModel = mongoose.model('Team', TeamSchema);

export default TeamModel;
