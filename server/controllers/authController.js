import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const signup = async(req,res) => {
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password) return res.status(400).json({success:false,message:'All Fields are Required'});

        if(password.length < 6) return res.status(400).json({success:false,message:'Password must be 6 characters long'});

        const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailregex.test(email)) return res.status(400).json({success:false,message:'Invalid Email'});

        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({success:false,message:'User already exists'});

        /* hash password */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        /* create a new user */
        const newuser = await User.create({
            name,
            email,
            password:hashedPassword
        });

        return res.status(201).json({success:true,message:'Account Created Successfully',data:newuser});

    } catch (error) {
        console.log('Error from signup controller',error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};