const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

exports.registerUser=async(req,res)=>{
    const{username,email,password}=req.body;
    try{
        const existing=await User.findOne({email});
        if(existing) return res.status(400).json({message: 'Email already exists'});

        const hashed=await bcrypt.hash(password,10);
        const user=new User({username,email,password:hashed});
        await user.save();

        res.status(201).json({message: 'User registered successfully'});
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:'Invalid email'});

        const match=await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({ message: 'Incorrect password' });

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.json({token, user:{id:user._id, username:usern.username}});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};
