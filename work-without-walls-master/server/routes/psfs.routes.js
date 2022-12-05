const router = require("express").Router();
const {paging,sort,search,filter}=require("../Controller/PSFS.controller")

router.get("/paging",paging);
router.get("/sorting",sort); 
router.get("/searching",search);
router.get("/filtering",filter);

module.exports = router;