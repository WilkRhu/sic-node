const valAdm =  require('./validate');

const valCreateAdm = async (req, res, next) =>{
    const {tipo, nome, email, password} = req.body;
    try{
        const { error } = await valAdm.admValidate.validateAsync({ tipo, nome, email, password });
        if(!error){
            return next();
        } 
        return res.status(400).json({ err: 'Try Erro na validação dos dados enviados!' }).send();
    }catch(err){
        return res.status(400).json({ err: 'Catch Erro na validação dos dados enviados!' }).send();
    }
}

module.exports = {
    valCreateAdm
}