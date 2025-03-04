import HotelModals from "../../DB/Schemas/HotelModals.js"

export const AddHotelEmineties = async (data) => {
    let { _id, ...restData } = data
    if (_id) {
        let UpdatedHotelData = await HotelModals.findByIdAndUpdate(_id, { ...restData }, { new: true })
        if (!UpdatedHotelData) {
            return null
        }
        return UpdatedHotelData
    } else {
        let newhotel = new HotelModals({ ...data })
        let newHoteladded = await newhotel.save()
        if (!newHoteladded) {
            return null
        }
        return newHoteladded
    }

}


export const getHoteldetails = async () => {

}