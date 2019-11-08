const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const {secretOrPrivateKey} = require('../config/secretKey'); 
const options = {
    algorithm: "HS256", expiresIn: "1h", issuer: "genie"
};

module.exports = { 
    sign: (user) => {~
        const payload = {
            idx: user.idx, grade: user.grade, name: user.name
        };
        const result = {
            token: jwt.sign(payload, secretOrPrivateKey, options),
            refreshToken: randToken.uid(256) 
        };
            return result;
    },
    verify: (token) => {
        let decoded;
        try {
        decoded = jwt.verify(token, secretOrPrivateKey);
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return -1;
            } else if (err.message === 'igit stvalid token') {
                console.log('invalid token');
                return -2;
            } else {
                console.log("invalid token");
                return -2;
        }
        }
        return decoded;
    },
    refresh: (user) => {
        const payload = {
            idx: user.idx,
            grade: user.grade,
            name: user.name
        };
        return jwt.sign(payload, secretOrPrivateKey,options);
    } 
};