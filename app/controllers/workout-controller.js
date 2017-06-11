import Workout from '../models/workout-model';

/* Save workout into database */
export const addWorkout = (req, res, next) => {
  /* Get workout info from user input */
  const activity = req.body.activity;
  const distance = req.body.distance;
  const distUnit = req.body.distUnit;
  const time = req.body.time;
  const split = req.body.split;
  const splitDist = req.body.splitDist;
  const splitUnit = req.body.splitUnit;
  const strokeRate = req.body.strokeRate;
  const watts = req.body.watts;
  const avgHR = req.body.avgHR;

  /* Check for required fields */
  if (!activity || !distance || !distUnit || !time || !split || !splitDist
      || !splitUnit || !strokeRate || !watts || !avgHR) {
    return res.status(422).send('All fields are required.');
  }

  /* Create workout object and save to db */
  const workout = new Workout();
  workout.activity = activity;
  workout.distance = distance;
  workout.distUnit = distUnit;
  workout.time = time;
  workout.split = split;
  workout.splitDist = splitDist;
  workout.splitUnit = splitUnit;
  workout.strokeRate = strokeRate;
  workout.watts = watts;
  workout.avgHR = avgHR;
  workout.save()
  .then((result) => {
    res.send({ id: result._id });
  });
};

/* Fetch a workout by id from the db */
export const fetchWorkout = (req, res) => {
  Workout.find({ _id: req.params.workoutId })
  .then((result) => {
    res.json(result[0]);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

/* Update a workout in the db */
export const updateWorkout = (req, res) => {
  Workout.findById(req.params.workoutId)
  .then((result) => {
    result.activity = req.body.activity || result.activity;
    result.distance = req.body.distance || result.distance;
    result.distUnit = req.body.distUnit || result.distUnit;
    result.time = req.body.time || result.time;
    result.timeString = req.body.timeString || result.timeString;
    result.split = req.body.split || result.split;
    result.splitDist = req.body.splitDist || result.splitDist;
    result.strokeRate = req.body.strokeRate || result.strokeRate;
    result.watts = req.body.watts || result.watts;
    result.avgHR = req.body.avgHR || result.avgHR;
    result.save()
    .then((workout) => {
      res.json(workout);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
