const isValidTalkerName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' }); 
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }

  next();
};

const isValidTalkerAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' }); 
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
  }
  next();
};

const isValidTalkerTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
  }

  next();
};
const isValidTalkerTalkDate = (req, res, next) => {
  const { talk } = req.body;
  const validDateRegex = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;

  if (!talk.watchedAt.match(validDateRegex)) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }

  next();
};

const isValidTalkerTalkRate = (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
  }

  next();
};

const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;
  const tokenLength = 16;
  
  if (!token) { 
    return res.status(401).json({ message: 'Token não encontrado' }); 
  }

  if (token.length !== tokenLength) { 
    return res.status(401).json({ message: 'Token inválido' }); 
  }
  
    next();
  };

module.exports = {
  isValidTalkerName,
  isValidTalkerAge,
  isValidTalkerTalk,
  isValidTalkerTalkDate,
  isValidTalkerTalkRate,
  isValidToken,
};