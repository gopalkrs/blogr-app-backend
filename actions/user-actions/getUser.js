import jwt from 'jsonwebtoken';
const COOKIE_NAME = 'sessionToken'
const getUser = async (req, res) => {

    const token = req.cookies[COOKIE_NAME];
    
    // if (!token) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      
      req.userId = decoded.id;
      // req.body.userId = decoded.id;
      return res.status(200).json({ message: "User Logged In", user : req.userId });
    }catch(err) {
      console.log(err)
      return res.status(401).json({ message: "Error verifying user" });
    }
};

export default getUser;