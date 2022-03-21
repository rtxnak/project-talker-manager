const router = require('express').Router();
const {
  readContentFile,
  writeContentFile,
} = require('../helpers/readWriteFile');

const {
  isValidEmail,
  isValidPassword,
} = require('../middlewares/loginValidations');

const {
  isValidTalkerName,
  isValidTalkerAge,
  isValidTalkerTalkDate,
  isValidTalkerTalkRate,
  isValidToken,
} = require('../middlewares/createTalkerValidation');

const PATH_FILE = './talker.json';

router.get('/talker', async (_req, res) => {
  const talkers = await readContentFile(PATH_FILE) || [];

  res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH_FILE) || [];
  const talkerID = talkers.find((talker) => talker.id === parseInt(id, 10));

    if (!talkerID) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talkerID);
});

router.post(
  '/login', 
  isValidEmail, 
  isValidPassword, 
  (_req, res) => res.status(200)
  .json({ token: '7mqaVRXJSp886CGr' }),
);

router.post(
  '/talker',
  isValidToken,
  isValidTalkerName,
  isValidTalkerAge,
  isValidTalkerTalkDate,
  isValidTalkerTalkRate,
  async (req, res) => {
  const createdTalker = req.body;
  const talkers = await readContentFile(PATH_FILE) || [];
  createdTalker.id = (talkers.length + 1);
  writeContentFile(PATH_FILE, createdTalker);

  res.status(201).json(createdTalker);
},
);

module.exports = router;
