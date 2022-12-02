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
        let{sort,asc}=req.query;
        asc=-1;
        const users=User.find().sort({approve:true})
        res.send({users})
  }




  module.exports={paging,sort}