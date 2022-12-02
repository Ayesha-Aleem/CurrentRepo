const router = require("express").Router();
const {paging,sort}=require("../Controller/PSFS.controller")

router.get("/paging",paging);
router.get("/sorting",sort);

module.exports = router;