const jwt = require('jsonwebtoken');
const middlewares = {
    ensureToken: function (req, res, next) {
        let resp = {};
        if(req.headers.authorization){
            const bearerHeader = req.headers['authorization'];
            const bearerToken = bearerHeader.split(" ")[1];
            
            if(bearerToken){
                try{
                    const decoded = jwt.verify(bearerToken, process.env.JWT_KEY);
                    req.token = bearerToken;
                    next();
                }catch(err){
                    res.status(403).json(resp);
                }
            }else{
                res.status(403).json(resp);
            }
        }else{
            res.status(403).json(resp);
        }
    },
    ensureAdmin: function (req, res, next) {
        try{
            const decoded = jwt.verify(req.token , process.env.JWT_KEY);
            if(decoded.role === 'admin'){
                next();
            }else{
                resp = { message: 'No autorizado' };
                res.status(403).json(resp);
            }
        }catch(err){
            resp = { message: 'No autorizado' };
            res.status(403).json(resp);
        }
    }
};

module.exports = middlewares;
