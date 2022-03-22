const {
  readContentFile,
  // writeContentFile,
} = require('../helpers/readWriteFile');

const PATH_FILE = './talker.json';

const getTalkerID = async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH_FILE) || [];
  const talkerID = talkers.find((talker) => talker.id === parseInt(id, 10));

    if (!talkerID) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talkerID);
};

module.exports = {
  getTalkerID,
};