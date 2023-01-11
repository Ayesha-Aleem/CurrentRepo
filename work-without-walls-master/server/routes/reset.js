const express = require('express');
const router = express.Router();
const validateRequest = require("../validations/validateRequest");
const { login } = require("../validations/auth.validation");
const {reset,deleteAccount}=require("../Controller/rese.controller");
router.put("/reset-password", validateRequest(login), reset); //corrected
router.delete("/delete-user/:id", deleteAccount);

module.exports=router;
  