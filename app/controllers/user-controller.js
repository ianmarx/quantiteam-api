import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user-model';
import Team from '../models/team-model';

dotenv.config({ silent: true });

/* Create a user authentication token */
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

/* Call when a user signs in */
export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user), id: req.user.id });
};

/* Call when a user signs up */
export const signUpAthlete = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const code = req.body.teamCode;
  console.log(code);

  if (!name || !email || !password) {
    return res.status(422).send('All fields are required.');
  }

  User.findOne({ email })
  .then((existingUser) => {
    if (existingUser) {
      res.status(424).send('This email is already in use.');
    } else {
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = password;
      user.save()
      .then((newUser) => {
        /* Find team using team code to connect to user */
        Team.findOne({ teamCode: code })
        .then((existingTeam) => {
          newUser.team = existingTeam._id;
          newUser.save()
          .catch((error) => {
            res.status(500).json({ error });
          });

          existingTeam.athletes.push(newUser._id);
          existingTeam.save()
          .catch((error) => {
            res.status(500).json({ error });
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });

        res.send({ token: tokenForUser(newUser), id: newUser._id });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    }
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const signUpCoach = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.userType;
  const teamName = req.body.teamName;
  let userId;

  User.findOne({ email })
  .then((existingUser) => {
    if (existingUser) {
      res.status(424).send('This email is already in use.');
    } else {
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = password;
      user.userType = userType;
      user.save()
      .then((newUser) => {
        userId = newUser._id;

        /* Set up team */
        Team.findOne({ teamName })
        .then((existingTeam) => {
          if (existingTeam) {
            res.status(424).send('This team name is already in use.');
          } else {
            const team = new Team();
            team.name = teamName;
            team.coaches.push(userId);
            team.save()
            .then((newTeam) => {
              User.findById(userId)
              .then((coach) => {
                coach.team = newTeam._id;
                coach.save()
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
          }
        });

        res.send({ token: tokenForUser(newUser), id: newUser._id });
      });
    }
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

/* Call to fetch a user from the db */
export const fetchUser = (req, res) => {
  User.find({ _id: req.params.userId })
  .populate([{
    path: 'team',
    model: 'Team',
    populate: [{
      path: 'athletes',
      model: 'User',
    }, {
      path: 'workouts',
      model: 'Workout',
    }, {
      path: 'teamWorkouts',
      model: 'Workout',
    }],
  }, {
    path: 'workouts',
    model: 'Workout',
  }])
  .catch((error) => {
    res.status(500).json({ error });
  })
  .then((result) => {
    res.json(result[0]);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

/* Call to fetch all users from the db */
export const fetchAllUsers = (req, res) => {
  User.find()
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

/* Call to update a user in the db */
export const updateUser = (req, res) => {
  User.findById(req.params.userId)
  .then((result) => {
    result.name = req.body.name || result.name;
    result.position = req.body.position || result.position;
    result.height = req.body.height || result.height;
    result.weight = req.body.weight || result.weight;
    result.classYear = req.body.classYear || result.classYear;
    result.save()
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const matchAthlete = (req, res) => {
  User.find({ name: new RegExp(req.params.query, 'i'), team: req.params.teamId })
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
