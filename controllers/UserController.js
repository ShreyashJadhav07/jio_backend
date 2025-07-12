const UserModel = require("../Model/UserModel");


const getCurrentUser = async (req, res) => {
   
    try {
         console.log("getCurrentUser is called")
        const userId = req.userId;
        const { _id, name, email, createdAt, wishlist, isPremium } = await UserModel.findById(userId);
        res.status(200).json({
            user: {
                _id: _id,
                name: name,
                email: email,
                createdAt: createdAt,
                wishlist: wishlist,
                isPremium: isPremium,
            },
            status: "success",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};
const getUserWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId);
        res.status(200).json({
            data: user.wishlist,
            status: "success",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};



const addToWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        const { id, poster_path, name, media_type } = req.body;
        
   
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: "failure",
            });
        }
        
  
        if (user.wishlist.find(item => item.id === id)) {
            return res.status(400).json({
                message: "Item already in wishlist",
                status: "failure",
            });
        }

        const wishlistItem = {
            id: id,
            poster_path: poster_path,
            name: name,
            media_type: media_type,
        };

 
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $push: { wishlist: wishlistItem } },
            { new: true }
        );

        res.status(200).json({
            message: "Item added to wishlist successfully",
            status: "success",
            data: updatedUser.wishlist
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            message: error.message,
            status: "failure",
        });
    }
};


module.exports = { getCurrentUser, getUserWishlist, addToWishlist };