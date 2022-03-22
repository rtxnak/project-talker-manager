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
  isValidTalkerTalk,
  isValidTalkerTalkDate,
  isValidTalkerTalkRate,
  isValidToken,
} = require('../middlewares/createTalkerValidation');

const { generateToken } = require('../helpers/generateToken');

const PATH_FILE = './talker.json';

router.get('/talker', async (_req, res) => {
  const talkers = await readContentFile(PATH_FILE) || [];

  res.status(200).json(talkers);
});

router.get(
  '/talker/search',
  isValidToken,
  async (req, res) => {
  const { q } = req.query;
  
  const talkers = await readContentFile(PATH_FILE) || [];

  if (!q || q === '') return res.status(200).json(talkers);

  const talkerQuery = talkers.filter((talker) => talker.name.includes(q));

  if (!talkerQuery) return res.status(200).json([]);

  return res.status(200).json(talkerQuery);
  },
);

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
  .json({ token: generateToken }),
);

router.post(
  '/talker',
  isValidToken,
  isValidTalkerName,
  isValidTalkerAge,
  isValidTalkerTalk,
  isValidTalkerTalkDate,
  isValidTalkerTalkRate,
  async (req, res) => {
  const createdTalker = req.body;
  const talkers = await readContentFile(PATH_FILE) || [];
  createdTalker.id = (talkers.length + 1);
  talkers.push(createdTalker);
  writeContentFile(PATH_FILE, talkers);

  res.status(201).json(createdTalker);
},
);

router.put(
  '/talker/:id',
  isValidToken,
  isValidTalkerName,
  isValidTalkerAge,
  isValidTalkerTalk,
  isValidTalkerTalkDate,
  isValidTalkerTalkRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await readContentFile(PATH_FILE) || [];
    const talkersIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));

    if (talkersIndex === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    talkers[talkersIndex] = { ...talkers[talkersIndex], name, age, talk };

    writeContentFile(PATH_FILE, talkers);

    return res.status(200).json(talkers[talkersIndex]);
  },
);

router.delete(
  '/talker/:id',
  isValidToken,
  async (req, res) => {
    const { id } = req.params;
    const talkers = await readContentFile(PATH_FILE) || [];
    const talkersIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));

    if (talkersIndex === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    talkers.splice(talkersIndex, 1);
    
    await writeContentFile(PATH_FILE, talkers);

    return res.status(204).end();
  },
);

module.exports = router;
