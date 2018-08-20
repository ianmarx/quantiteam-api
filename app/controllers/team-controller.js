import Team from '../models/team-model';
import User from '../models/user-model';

export const fetchUserTeam = (req, res) => {
  User.findById(req.params.userId)
  .populate({
    path: 'team',
    populate: {
      path: 'athletes',
      model: 'User',
    },
  })
  .populate({
    path: 'team',
    populate: {
      path: 'coaches',
      model: 'User',
    },
  })
  .then((user) => {
    const userIsCoach = user.team.coaches.some((coach) => {
      return coach.equals(req.params.userId);
    });

    const teamObject = {
      team: user.team,
      isCoach: userIsCoach,
    };

    res.json(teamObject);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const checkTeamNameAvailability = (req, res) => {
  Team.findOne({ name: req.params.query })
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const checkTeamCodeValidity = (req, res) => {
  Team.findOne({ teamCode: req.params.teamCode })
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
