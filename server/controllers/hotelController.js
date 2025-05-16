import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body
        const owner = req.user._id

        //check the hotel if already exist
        const hotel = await Hotel.findOne({ owner })
        
        if (hotel) {
            return res.json({success: false, message: "Hotel Already exist"})
        }

        await Hotel.create({ name, address, contact, city, owner })
        
        await User.findByIdAndUpdate(hotel, { role: "hotelOwner" })
        
        res.json({success: true, message: "Hotel Registered successfuly"})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}