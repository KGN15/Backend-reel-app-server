const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

//user registar logic function
const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    const isUserAlredyExist = await userModel.findOne({
        email,
    })

    if (isUserAlredyExist) {
        return res.status(400).json({
            message: 'OPS.. user alreday exists.'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword,
    })

    const token = jwt.sign(
        { id: user._id, role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );


    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });



    res.status(201).json({
        message: 'user registed sucsesfulliy',
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
        }
    })
}

//user login logic function
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email,
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password...!"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password...!"
        })
    }

    const token = jwt.sign(
        { id: user._id, role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );


    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    res.status(200).json({
        message: 'user logined sucsesfulliy',
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
        }
    })
}

//user logout logic function
const logoutUser = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        message: "User Logouted Sucsessfully...!"

    })
}

//food partner registar logic function
const registarFoodPartner = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        // 1️⃣ Validation
        if (!name || !email || !password || !address) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // 2️⃣ Already exists check
        const isFoodPartnerAlredyExist = await foodPartnerModel.findOne({ email });

        if (isFoodPartnerAlredyExist) {
            return res.status(400).json({
                message: 'Food Partner already exists'
            });
        }

        // 3️⃣ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4️⃣ Create user
        const foodPartner = await foodPartnerModel.create({
            name,
            email,
            password: hashedPassword,
            address,
        });

        const token = jwt.sign(
            { id: foodPartner._id, role: "foodPartner" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );


        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        // 7️⃣ Response
        res.status(201).json({
            message: 'Food Partner registered successfully',
            foodPartner: {
                _id: foodPartner._id,
                name: foodPartner.name,
                email: foodPartner.email,
                address: foodPartner.address,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

//food partner login logic function
const loginFoodPartner = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const foodPartner = await foodPartnerModel.findOne({ email });

        if (!foodPartner) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            foodPartner.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: foodPartner._id, role: "foodPartner" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );


        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        res.status(200).json({
            message: "Food partner logged in successfully",
            foodPartner: {
                _id: foodPartner._id,
                name: foodPartner.name,
                email: foodPartner.email,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};


//food partner logout logic function
const logoutFoodPartner = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        message: "Food Partner Logouted Sucsessfully...!"

    })
}

//all func export
module.exports = { registerUser, loginUser, logoutUser, registarFoodPartner, loginFoodPartner, logoutFoodPartner }
