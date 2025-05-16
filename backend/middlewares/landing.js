const { v4: uuidv4 } = require('uuid'); 
const { promisify } = require('util')

const promisifySession = (req, _res, next) => {
  req.session.saveAsync = promisify(req.session.save.bind(req.session));
  next();
};

const setSession = async (req, res, next) => {
    // saving session to a db

    if(req.session.stateId){
        return next()
    } 
    req.session.stateId = uuidv4()
    // req.session.save()
    await req.session.saveAsync();
    return res.json({sessionId: req.session.stateId})
    
}

module.exports = { setSession, promisifySession }