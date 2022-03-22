const {
  readContentFile,
  // writeContentFile,
} = require('../helpers/readWriteFile');

const PATH_FILE = './talker.json';

const getTalkerSearch = async (req, res) => {
  const { q } = req.query;
  
  const talkers = await readContentFile(PATH_FILE) || [];

  if (!q || q === '') return res.status(200).json(talkers);

  const talkerQuery = talkers.filter((talker) => talker.name.includes(q));

  if (!talkerQuery) return res.status(200).json([]);

  return res.status(200).json(talkerQuery);
};

module.exports = {
  getTalkerSearch,
};