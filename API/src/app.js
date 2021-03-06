import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import bcrypt  from 'bcrypt';
import jwt  from 'jsonwebtoken';

import routes from './routes';
import models, { connectDb } from './models';
import { getUserById } from './routes/user';
import * as ParkingLots from './constants/ParkingLots';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models
  };
  next();
});

app.use('/users', routes.user);
app.use('/passes', routes.pass);

app.post('/login', async (req, res, next) => {
  const user = await getUserById(req.context.models.User, req.body.userId);
  const result = await bcrypt.compare(req.body.password, user.password);
  if (result) {
    const token = jwt.sign({
        userId: req.body.userId
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1hr"
    });
    return res.send({ user: user, token: token });
  }
  return res.send(new Error('Not Authenticated'));
});

// helper function for dev mode only
const eraseDatabaseOnSync = true;
connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Pass.deleteMany({}),
    ]);
    createEntries();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`),
  );
});

const createEntries = async () => {
  const password1 =  await bcrypt.hash("test", 10);
  const password2 =  await bcrypt.hash("password", 10);

  const user1 = new models.User({
    userId: 'jason',
    password: password1,
    licensePlate: "123"
  });

  const user2 = new models.User({
    userId: 'tarik',
    password: password2,
    licensePlate: "test"
  });

  const pass1 = new models.Pass({
    users: ["jason", "tarik"],
    parkingLots: [ParkingLots.WEST, ParkingLots.ROSE]
  });

  const pass2 = new models.Pass({
    users: [],
    parkingLots: [ParkingLots.NORTH, ParkingLots.FRASER]
  });

  await pass1.save();
  await pass2.save();

  await user1.save();
  await user2.save();
};
