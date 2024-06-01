import userModel from "../models/users.js";

const userRepository = {
    findByEmail: async (email) => {
        try {
            const user = await userModel.findOne({ email });
            return user;
        } catch (error) {
            logger.error("Error al buscar usuario por correo electrónico:", error.message);
            throw new Error("Error al buscar usuario por correo electrónico: " + error.message);
        }
    },

    findById: async (userId, useLean = false) => {
        try {
            if (useLean) {
                const user = await userModel.findById(userId).lean();
                return user;
            } else {
                const user = await userModel.findById(userId).populate('createdProducts');
                return user;
            }
        } catch (error) {
            logger.error("Error al buscar usuario por ID:", error.message);
            throw new Error("Error al buscar usuario por ID: " + error.message);
        }
    },    

    createUser: async (userData) => {
        try {
            const newUser = new userModel(userData);
            await newUser.save();
            return newUser;
        } catch (error) {
            logger.error("Error al crear usuario:", error.message);
            throw new Error("Error al crear usuario: " + error.message);
        }
    },
};

export default userRepository;
