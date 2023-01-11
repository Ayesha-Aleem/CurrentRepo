const User = require("../models/User");
const bcrypt = require("bcrypt");
const reset = async (req, res) => {
    //corrected
    const { CNIC, password,oldpassword } = req.body;
    console.log(req.body);
    const user = await User.findOne({ CNIC });
  const isValid=await bcrypt.compare(oldpassword,user.password)
    if(user && isValid) {
            
        user.password=password
        const salt = await bcrypt.genSalt(10);
        const hashedPaswword = await bcrypt.hash(password, salt);
        user.password=hashedPaswword
        user.save((err,result)=>{
            if(err){
              return res.status(400).json({error:"reset password error"});
            }else{
              return res.status(200).json({message:'Your password has been changed'})
            }
          })
    }
    else {
        res.status(400).json({ message:"Wrong Password or CNIC" })
    }
  };
  //delete
  const deleteAccount = async (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, user) => {
      if (err) {
        res.status(400).json({ err });
      } else {
        res.status(200).json({ user, message: 'User deleted successfully' });
      }
    });
  };
  module.exports={reset,deleteAccount}
