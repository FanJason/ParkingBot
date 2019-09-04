import { Router } from 'express';
import bcrypt  from 'bcrypt';

const router = Router();
const saltRounds = 10;

export const getUserById = async (db, userId) => {
  const user = await db.findOne({ userId: userId });
  return user;
};

router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});

router.get('/:userId', async (req, res) => {
  const user = getUserById(req,context.models.User, req.body.userId);
  return res.send(user);
});

router.post('/', async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const user = await req.context.models.User.create({
      username: req.body.userId,
      password: hash,
      licensePlate: req.body.licensePlate
    });
    return res.send(user);
  } catch(err) { next(err); }
});

router.delete('/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(
    req.params.userId,
  );

  let result = null;
  if (user) {
    result = await user.remove();
  }

  return res.send(result);
});
export default router;
