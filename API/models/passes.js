import mongoose from 'mongoose';

const passSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
});

const Pass = mongoose.model('Pass', passSchema);
export default Pass;
