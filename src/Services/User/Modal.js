import User from "../../DB/Schemas/UserSchema.js";

export const GetUser = async ({ _id }) => {
    try {
        return await User.findOne({ _id }, { password: 0 }).lean() || null;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

export const UpdateProfile = async ({ _id, ...data }) => {
    try {
        return await User.findOneAndUpdate(
            { _id },
            { $set: data },
            { new: true, projection: { password: 0 }, lean: true }
        );
    } catch (error) {
        console.error("Error updating user profile:", error);
        return null;
    }
};

export const AddNewUser = async (data) => {
    try {
        console.log(data);

        const newUser = new User({ ...data });
        const user = await newUser.save();
        return user?.toObject() || null;
    } catch (error) {
        console.error("Error adding new user:", error);
        return null;
    }
};

export const GetAllUsers = async (page = 1, limit = 10, filter = {}, search = '') => {
    try {
        // let query = {};
        // if (filter.status !== undefined) {
        //     query.isActive = filter.status;
        // }
        // if (search) {
        //     query.$or = [
        //         { fname: { $regex: search, $options: "i" } },
        //         { lname: { $regex: search, $options: "i" } },
        //         { username: { $regex: search, $options: "i" } },
        //         { email: { $regex: search, $options: "i" } }
        //     ];
        // }
        // const users = await User.find(query, { password: 0 })
        //     .skip((page - 1) * limit)
        //     .limit(limit)
        //     .lean();
        const pipeline = [];

        if (filter.status !== undefined) {
            pipeline.push({
                $match: {
                    isActive: filter.status,
                },
            });
        }

        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { fname: { $regex: search, $options: "i" } },
                        { lname: { $regex: search, $options: "i" } },
                        { username: { $regex: search, $options: "i" } },
                        { email: { $regex: search, $options: "i" } },
                    ],
                },
            });
        }
        pipeline.push(
            { $unset: "password" }, // Exclude password
            {
              $project: {
                name: { $concat: ["$fname", " ", "$lname"] }, // Add full name
                // fname: 1,
                // lname: 1,
                username: 1,
                group: 1,
                email: 1,
                isActive: 1,
                isEmailVerified: 1,
                createdAt:1
              },
            }
          );
        
            

        pipeline.push(
            { $skip: (page - 1) * limit },
            { $limit: limit }
        );

        const users = await User.aggregate(pipeline);

        const totalUsers = await User.countDocuments(pipeline);
        return {
            users,
            page,
            limit,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit)
        };
    } catch (error) {
        console.error("Error fetching all users:", error);
        return { users: [], totalUsers: 0, totalPages: 0 };
    }
};

