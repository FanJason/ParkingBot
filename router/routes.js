const User = require('../models/users');
const Pass = require('../models/passes');

module.exports = (app) => {
  app.get('/users', (req, res) => {
    User.find((err, users) => {
      if (err) console.log(err);
      res.json({users: users});
      console.log(users);
    })
  });

  app.get('/passes', (req, res) => {
    Pass.find((err, passes) => {
      if (err) console.log(err);
      res.json({passes: passes});
      console.log(passes);
    })
  });

  app.post('/login', (req, res) => {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        const err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return next();
      }
    });
  });

  User.create(userData, function(error) {
    if (error) { 
      return next(error);
    } else { 
      res.end(response);
    }
  });

  Pass.create(passData, function(error) {
    if (error) { 
      return next(error);
    } else { 
      res.end(response);
    }
  });
};
