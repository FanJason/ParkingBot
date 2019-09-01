import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const passes = await req.context.models.Pass.find();
  return res.send(passes);
});

router.get('/:passId', async (req, res) => {
  const pass = await req.context.models.Pass.findById(
    req.params.passId,
  );
  return res.send(pass);
});

router.post('/', async (req, res) => {
  const pass = await req.context.models.Pass.create({
    users: req.body.users,
    parkingLots: req.body.parkingLots
  });

  return res.send(pass);
});

router.delete('/:passId', async (req, res) => {
  const message = await req.context.models.Pass.findById(
    req.params.passId,
  );

  let result = null;
  if (message) {
    result = await message.remove();
  }

  return res.send(result);
});

export default router;
