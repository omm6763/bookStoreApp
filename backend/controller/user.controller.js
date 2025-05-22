import User from "../model/usermodel.js";
import bcryptjs from "bcryptjs"
export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message:"user exists already", user: {
                fullname: user.fullname,
                email: user.email,
                _id: user._id
            } })
        }



        const hashpassword = await bcryptjs.hash(password, 10)

        const createduser = new User({
            fullname, email, password: hashpassword
        })
        await createduser.save()
        res.status(201).json({ message: "user created successfully",user:{
            fullname:createduser.fullname,
            email:createduser.email,
            _id:createduser._id
        } })
    }
    catch (err) {
        console.log("error in signup", err);
        res.status(500).json({ message: "internal server error" ,user:{
            fullname:createduser.fullname,
            email:createduser.email,
            _id:createduser._id
        }})

    }
}

export const Login = async (req, res) => {
    try {
        const { email, password} = req.body;
        const user =await  User.findOne({ email })
        const ismatch = await bcryptjs.compare(password, user.password)
        if (!user || !ismatch) {
            return res.status(400).json({ message: "invalid credentials" })

        }
        else {
            res.status(200).json({ message: "loged in successfully", user: { fullname: user.fullname, email: user.email, _id: user._id } })
        }

    } catch (err) {
        console.log("error in login", err.message);
        res.status(500).json({ message: "internal server error" });

    }
}