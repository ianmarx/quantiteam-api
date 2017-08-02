import Workout from '../models/workout-model';
import User from '../models/user-model';
import Team from '../models/team-model';

export const addWorkout = (req, res, next) => {
  /* Get workout info from user input */
  const creatorId = req.body.userId;
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
    User.findById(result._creator)
    .then((user) => {
      /* Add the workout to the team's list of workouts */
      if (user.team) {
        Team.findById(user.team)
        .then((team) => {
          team.workouts.push(result);
          team.save()
          .catch((error) => {
            res.status(500).json({ error });
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
      }

      user.workouts.push(result._id);
      user.save()
      .catch((error) => {
        res.status(500).json({ error });
      });
      result.creatorName = user.name;
      result.save()
      .catch((error) => {
        res.status(500).json({ error });
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
    res.send({ id: result._creator });
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
  Workout.remove({ _id: req.params.workoutId })
  .catch((error) => {
    res.status(500).json({ error });
  });

  /* remove the workoutId from the user's list of workout IDs */
  User.update(
    { _id: req.params.userId },
    { $pull: { workouts: req.params.workoutId } },
  )
  .catch((error) => {
    res.status(500).json({ error });
  });
};

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
