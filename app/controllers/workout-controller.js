import Workout from '../models/workout-model';
import User from '../models/user-model';
import Team from '../models/team-model';

export const addWorkout = (req, res, next) => {
  /* Get workout info from user input */
  const creatorId = req.body.creatorId;
  const creatorName = req.body.creatorName;
  const activity = req.body.activity;
  const distance = req.body.distance;
  const distUnit = req.body.distUnit;
  const time = req.body.time;
  const strokeRate = req.body.strokeRate;
  const watts = req.body.watts;
  const avgHR = req.body.avgHR;

  /* Check for required fields */
  if (!creatorId || !activity || !distance || !distUnit || !time) {
    return res.status(422).send('All fields are required.');
  }

  /* Create workout object and save to db */
  const workout = new Workout();

  workout._creator = creatorId;
  workout.creatorName = creatorName;
  workout.activity = activity;
  workout.distance = distance;
  workout.distUnit = distUnit;
  workout.time = time;
  workout.strokeRate = strokeRate;
  workout.watts = watts;
  workout.avgHR = avgHR;
  workout.save()
  .then((result) => {
    /* Add the workout to its creator's list of workouts */
    User.findOneAndUpdate(
      { _id: creatorId },
      { $push: { workouts: result._id } },
    )
    .then((user) => {
      Team.findOneAndUpdate(
        { _id: user.team },
        { $push: { workouts: result._id } },
      )
      .catch((error) => {
        res.status(500).json({ error });
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const fetchWorkout = (req, res) => {
  Workout.findById(req.params.workoutId)
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

/* Fetch all workouts belonging to a user */
export const fetchUserWorkouts = (req, res) => {
  User.findById(req.params.userId)
  .populate('workouts')
  .catch((error) => {
    res.status(500).json({ error });
  })
  .then((result) => {
    res.json(result.workouts);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const fetchTeamSoloWorkouts = (req, res) => {
  User.findById(req.params.userId)
  .then((result) => {
    Team.findById(result.team)
    .populate('workouts')
    .catch((error) => {
      res.status(500).json({ error });
    })
    .then((team) => {
      res.json(team.workouts);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const deleteWorkout = (req, res) => {
  /* remove the workout document */
  Workout.deleteOne({ _id: req.params.workoutId })
  .catch((error) => {
    res.status(500).json({ error });
  });

  /* remove the workoutId from the user's list of workout IDs */
  User.update(
    { _id: req.params.userId },
    { $pull: { workouts: req.params.workoutId } },
  )
  .then((user) => {
    Team.update(
      { _id: user.team },
      { $pull: { workouts: req.params.workoutId } },
    )
    .catch((error) => {
      res.status(500).json({ error });
    });
    res.json(req.params.workoutId);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateWorkout = (req, res) => {
  Workout.findById(req.params.workoutId)
  .then((result) => {
    result.distance = req.body.distance || result.distance;
    result.distUnit = req.body.distUnit || result.distUnit;
    result.time = req.body.time || result.time;
    result.strokeRate = req.body.strokeRate === '' ? null : (req.body.strokeRate || result.strokeRate);
    result.watts = req.body.watts === '' ? null : (req.body.watts || result.watts);
    result.avgHR = req.body.avgHR === '' ? null : (req.body.avgHR || result.avgHR);
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

export const fetchUserDistTotals = (req, res) => {
  Workout.aggregate(
    { $match: { distUnit: 'km' }, // date: { $gte: { $subtract: [Date.now(), Math.pow(6.048, 8)] }, $lt: Date.now() } },
    },
    { $group: { _id: null, distance: { $sum: 'distance' } } },
  )
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
