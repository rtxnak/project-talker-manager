const router = require('express').Router();
const {
  readContentFile,
} = require('../helpers/readWriteFile');

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

module.exports = router;
