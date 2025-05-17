const logoutUser = (req, res) => {
    try{
        res.clearCookie('sessionToken', { httpOnly: true, sameSite: 'none', secure : true });
        res.status(200).json({ message: "User logged out" });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error during logout" });
    }
}

export default logoutUser;