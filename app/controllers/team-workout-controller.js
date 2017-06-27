import TeamWorkout from '../models/team-workout-model';
import Team from '../models/team-model';

export const addTeamWorkout = (req, res, next) => {
  /* Get team workout info from user input */
  const creatorId = req.body.userId;
  const teamId = req.body.teamId;
  const activity = req.body.activity;
  const distance = req.body.distance;
  const distUnit = req.body.distUnit;
  const time = req.body.time;

  if (!creatorId || !activity || !distUnit) {
    return res.status(422).send('Enter required fields.');
  }

  const teamWorkout = new TeamWorkout();

  teamWorkout._creator = creatorId;
  teamWorkout._team = teamId;
  teamWorkout.activity = activity;
  teamWorkout.distUnit = distUnit;

  if (distance) {
    teamWorkout.distance = distance;
  } else if (time) {
    teamWorkout.time = time;
  }
  teamWorkout.save()
  .then((result) => {
    Team.findById(result._team)
    .then((team) => {
      team.teamWorkouts.push(result);
      team.save()
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
