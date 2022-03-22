const {
  readContentFile,
  writeContentFile,
} = require('../helpers/readWriteFile');

const PATH_FILE = './talker.json';

const deleteTalkerID = async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH_FILE) || [];
  const talkersIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));

  if (talkersIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  talkers.splice(talkersIndex, 1);
  
  await writeContentFile(PATH_FILE, talkers);

  return res.status(204).end();
};

module.exports = {
  deleteTalkerID,
};