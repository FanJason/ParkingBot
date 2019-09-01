import mongoose from 'mongoose';

const passSchema = new mongoose.Schema({
    users: {
        type: Array
    },
    parkingLots: {
        type: Array
    }
});

const Pass = mongoose.model('Pass', passSchema);
export default Pass;
