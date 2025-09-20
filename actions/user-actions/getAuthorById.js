import { User } from '../../models/models.js';

const getAuthorById = async (req, res) => {
    try{
        const { authorId } = req.params;
        const userData = await User.findById(authorId).select('-hashedPassword');
        if(!userData){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({user: userData});
    }catch(err){
        console.error(err);
    }
}

export default getAuthorById;