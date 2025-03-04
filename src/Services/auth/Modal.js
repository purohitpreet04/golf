import User from "../../DB/Schemas/UserSchema.js";



export const FetchLoggedinUserDetails = async (_id) => {
    const user = await User.findById(_id, { password: 0 })
    if (user) {
        return { ...user }
    } else {
        return {}
    }
}