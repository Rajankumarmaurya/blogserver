import jwt from 'jsonwebtoken'
import 'dotenv/config';

const fetchUser=(req,res,next)=>{
    //get the user from the token and add it to the request object
    const token = req.header('auth-token');

    if(!token){
        res.status(401).send({error:"please authtenticate using a valid token"});

    }
    try {
        const {userId} = jwt.verify(token,"" + process.env.JWT_SECURE);
        req.userId = userId
        console.log("fetchUser", userId);
        next();
    } catch (error) {
        res.status(401).send({error:"please authtenticate using a valid token"});
    }
}
export default fetchUser;