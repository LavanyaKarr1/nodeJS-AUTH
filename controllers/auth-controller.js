
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register controller

const registerUser = async(req,res)=>{
    try{
        //extarct user information from the request body
        const {username,email,password,role} = req.body;

        //check if the user is already existed in our database
        const checkExistingUser = await User.findOne({$or :[{username},{email}]});
        if(checkExistingUser){
            return res.status(400).json({
                success:false,
                message:'user is already existed with same username or email',
            });
        }

        //hash user password
        const salt = await bcrypt.genSalt(6);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create a new user and save in fdb
        const newlyCreatedUser = new User({
            username,
            email,
            password:hashedPassword,
            role:role || 'user'
        })
        await newlyCreatedUser.save();
        if(newlyCreatedUser){
            return res.status(200).json({
                success:true,
                message:'User registerd successfully'
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:'Unable to register'
            });
        }


    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:'some error occured! please try again'
        });
        
    }
}

//login controller

const loginUser = async(req,res)=>{
    try{
        const {username ,password}=req.body;

        //find if the currentuser id exist in database or not
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User Does not Exist'
            });
        }

        //if the password is correct or not
        const isPasswordmatch = await bcrypt.compare(password,user.password);
        if(!isPasswordmatch){
            return res.status(400).json({
                success:false,
                message:'Invalid Credentials'
            });
        }

        //create user token
        const accessToken = jwt.sign({
            userId:user._id,
            username:user.username,
            role:user.role
        },process.env.JWT_SECRET_KEY,{
            expiresIn:'30m'
        })

        res.status(200).json({
            success:true,
            message:'Loggin Successful',
            token:accessToken
        })


    }catch(e){
        console.log(e);
       return res.status(500).json({
            success:false,
            message:'some error occured! please try again'
        });
        
    }
};

const changePassword=async(req,res)=>{
    try{
        const userId=req.userInfo.userId;

        //extarxt old and new password;
        const {oldPassword,newPassword}=req.body;

        //find the current l;ogged in user
        const user=await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User Does not Exist'
            });
        }

        //check if the old password is correct
        const isPassword = await bcrypt.compare(oldPassword,user.password);
        if(!isPassword){
            return res.status(400).json({
                success:false,
                message:'old Password is incorrect'
            });
        }

        //hash the new password
        const salt= await bcrypt.genSalt(6);
        const newhashedPassword = await bcrypt.hash(newPassword,salt);

        //update the user password
        user.password=newhashedPassword;
        await user.save();

        return res.status(200).json({
            success:true,
            message:'Password changes Successfully'
        });

    }catch(e){
        console.log(e);
       return res.status(500).json({
            success:false,
            message:'some error occured! please try again'
        });
    }
}

module.exports ={
    registerUser,
    loginUser,
    changePassword
}