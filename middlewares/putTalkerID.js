const {
  readContentFile,
  writeContentFile,
} = require('../helpers/readWriteFile');

const PATH_FILE = './talker.json';

const putTalkerID = async (req, res) => {
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
};

module.exports = {
  putTalkerID,
};