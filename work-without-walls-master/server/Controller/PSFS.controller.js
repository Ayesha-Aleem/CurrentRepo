const User = require("../models/User");

const paging= async (req, res) => {
    let {page,limit}=req.query;
    if(!page) page=1;
    if(!limit) limit=5;
    const skip=(page-1)*5;
    const users=await User.find().skip(skip).limit(limit)
      res.send({page:page,limit:limit,users:users})
}

const sort=async(req,res)=> {
        const users=await User.find().sort({approve:1})
        res.send(users)
  }

const search=async(req,res)=>{
const users=await User.find(req.query)
res.send(users)
}
//filtering through approve and rating
const filter=async(req,res)=>{
    const users=await User.find(req.query)
    res.send(users)
    }
  module.exports={paging,sort,search,filter}