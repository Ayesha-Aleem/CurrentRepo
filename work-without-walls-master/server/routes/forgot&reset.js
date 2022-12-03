const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
router.put("/forgotpass", async (req,res)=>{
 
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User Not Registered");
    let token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.RESET_PASSWORD_KEY,{expiresIn:'20m'}
    );
   var resetUrl = 'http' + '://' + 'localhost' + ':' + 3000 + '/ResetPassword/' + token
   
    let transporter = nodemailer.createTransport({
     
     host: 'smtp.office365.com', // Office 365 server
          port: 587,     // secure SMTP
          secure: false,
          requireTLS: true,
      auth: {
        user: 'ameerhamza1710@outlook.com',
        pass: 'ameerhamza1616'
        
        
      },
      tls: {
        ciphers: 'SSLv3'
    }
    });
   
   const mailOptions = {
      from:'ameerhamza1710@outlook.com', // sender address
      to: req.body.email,
      subject: 'reset password link from WorkWithout walls.!!',// Subject line
      text: 'email sent using node js.\n',
   
   html : 'To reset your password, click this <a href="' + resetUrl + '"><span>link</span></a>.<br>This is a <b>test</b> email.'
     };
    return  user.updateOne({ resetLink:token },function(err,success){
      
  
    if (err){
      return res.status(400).json({error:"reset password link"});
    } 
    else {
   
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
        //  console.log('Email sent: ' + info.response);
        return res.json({message:'Email has been sent'});
        }
      });
    }
  
  
  
    }).clone();
  });

router.put("/reset", async (req,res)=>{
    const {resetLink,newPass}=req.body;
    //console.log(resetLink);
    if(resetLink){
      jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY,function(error,decodedData){
        if(error){
          return res.status(401).json({
            error:"Incorrect token or it is expired"
          })
        }
        
          User.findOne({resetLink}, async (err,user)=>{
          
                if(err || !user){
                  return res.status(400).json({error:"User with this token does not exist."});
                }
              
          user.password=newPass
          const salt = await bcrypt.genSalt(10);
          const hashedPaswword = await bcrypt.hash(newPass, salt);
          user.password=hashedPaswword
          user.resetLink=''
          
                user.save((err,result)=>{
                  if(err){
                    return res.status(400).json({error:"reset password error"});
                  }else{
                    return res.status(200).json({message:'Your password has been changed'})
                  }
                })
        })
      })
    }else{
      return res.status(401).json({error:"Authentication error!!!"});
    }
    
    });

    module.exports=router;