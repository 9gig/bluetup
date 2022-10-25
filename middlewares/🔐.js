const { sendStatus } = require('express/lib/response');
const jwt       = require('jsonwebtoken');


function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null ) return res.sendStatus(401);

    jwt.verify(token, "bluebeatle", (err, user) => {
        if(err){
            console.log(err);
            return res.sendStatus(401);
        } 
        req.user = user;
        next();
    });
}

function generateAccessToken(phone){
    return jwt.sign({data: phone}, "bluebeatle", {
        expiresIn: "120m"
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken
};