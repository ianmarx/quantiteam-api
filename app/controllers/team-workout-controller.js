import TeamWorkout from '../models/team-workout-model';
import Team from '../models/team-model';
import User from '../models/user-model';
import Workout from '../models/workout-model';

export const addTeamWorkout = (req, res, next) => {
  /* Get team workout info from user input */
  const creatorId = req.body.userId;
  const teamId = req.body.teamId;
  const activity = req.body.activity;
  const distance = req.body.distance;
  const distUnit = req.body.distUnit;
  const time = req.body.time;
  const type = req.body.type;

  if (!creatorId || !activity || !distUnit) {
    return res.status(422).send('Enter required fields.');
  }

  const teamWorkout = new TeamWorkout();

  teamWorkout._creator = creatorId;
  teamWorkout._team = teamId;
  teamWorkout.activity = activity;
  teamWorkout.distUnit = distUnit;

  if (type === 'distance') {
    teamWorkout.distance = distance;
  } else if (type === 'time') {
    teamWorkout.time = time;
  }
  teamWorkout.type = type;
  teamWorkout.save()
  .then((result) => {
    Team.findOneAndUpdate(
      { _id: result._team },
      { $push: { teamWorkouts: result._id } },
    )
    .then((team) => {
      result.teamName = team.name;
      result.save()
      .catch((error) => {
        res.status(500).json({ error });
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const fetchTeamWorkout = (req, res) => {
  TeamWorkout.findById(req.params.teamWorkoutId)
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const fetchTeamWorkouts = (req, res) => {
  User.findById(req.params.userId)
  .then((result) => {
    Team.findById(result.team)
    .populate('teamWorkouts')
    .catch((error) => {
      res.status(500).json({ error });
    })
    .then((team) => {
      res.json(team.teamWorkouts);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateTeamWorkout = (req, res) => {
  TeamWorkout.findById(req.params.teamWorkoutId)
  .then((result) => {
    result.activity = req.body.activity || result.activity;
    result.distance = req.body.distance || result.distance;
    result.distUnit = req.body.distUnit || result.distUnit;
    result.time = req.body.time || result.time;
    // save some other stuff later when you add in time functionality
    result.save()
    .then((teamWorkout) => {
      res.json(teamWorkout);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const deleteTeamWorkout = (req, res) => {
  TeamWorkout.deleteOne({ _id: req.params.teamWorkoutId })
  .catch((error) => {
    res.status(500).json({ error });
  });

  Team.update(
    { _id: req.params.teamId },
    { $pull: { teamWorkouts: req.params.teamWorkoutId } },
  )
  .then(() => {
    res.json();
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const addResult = (req, res) => {
  const activity = req.body.activity;
  const distance = req.body.distance;
  const distUnit = req.body.distUnit;
  const time = req.body.time;
  const strokeRate = req.body.strokeRate;
  const watts = req.body.watts;
  const avgHR = req.body.avgHR;
  const athleteName = req.body.athleteName;
  let athleteId;

  User.find({ name: athleteName })
  .then((result) => {
    athleteId = result._id;
  })
  .catch((error) => {
    res.status(500).json({ error });
  });

  /* Check for required fields */
  if (!activity || !distance || !distUnit || !time) {
    return res.status(422).send('All fields are required.');
  }

//  let type;

  /* Create workout object and save to db */
  const workout = new Workout();

  workout._creator = athleteId;
  workout.creatorName = athleteName;
  workout.activity = activity;
  workout.distance = distance;
  workout.distUnit = distUnit;
  workout.time = time;
  workout.strokeRate = strokeRate;
  workout.watts = watts;
  workout.avgHR = avgHR;
  workout.save()
  .catch((error) => {
    res.status(500).json({ error });
  })
  .then((result) => {
    TeamWorkout.findOneAndUpdate(
      { _id: req.params.teamWorkoutId },
      { $push: { results: result._id } },
    )
    .catch((error) => {
      res.status(500).json({ error });
    });
    res.json();
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const fetchDistResults = (req, res) => {
  TeamWorkout.findById(req.params.teamWorkoutId)
  .populate({ path: 'results', options: { sort: { distance: -1 } } })
  .catch((error) => {
    res.status(500).json({ error });
  })
  .then((teamWorkout) => {
    res.json(teamWorkout.results);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const fetchTimeResults = (req, res) => {
  TeamWorkout.findById(req.params.teamWorkoutId)
  .populate({ path: 'results', options: { sort: { time: 1 } } })
  .catch((error) => {
    res.status(500).json({ error });
  })
  .then((teamWorkout) => {
    res.json(teamWorkout.results);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const deleteResult = (req, res) => {
  /* remove the workout document */
  Workout.deleteOne({ _id: req.params.workoutId })
  .catch((error) => {
    res.status(500).json({ error });
  });

  /* remove the workoutId from the user's list of workout IDs */
  TeamWorkout.update(
    { _id: req.params.teamId },
    { $pull: { results: req.params.workoutId } },
  )
  .then(() => {
    res.json();
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
