import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { connectDb } from './models';
import routes from './routes';
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
  const user1 = new models.User({
    username: 'jason',
  });

  const user2 = new models.User({
    username: 'tarik',
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
