
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{

    const authHeader =req.headers['authorization'];
    console.log(authHeader);
    const token =authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success:false,
            message:'Access Denied'
        });
    }

    //decode this token
    try{

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decodedToken);
        req.userInfo = decodedToken;
        
        next();

    }catch(e){
        return res.status(500).json({
            success:false,
            message:'Access Denied'
        });
    }
    
    
    
}

module.exports = authMiddleware;