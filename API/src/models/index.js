import mongoose from 'mongoose';

import User from './user';
import Pass from './pass';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Pass };

export { connectDb };
export default models;
