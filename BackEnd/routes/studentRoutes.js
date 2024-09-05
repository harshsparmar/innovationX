const express=require("express");
const ForgetPasswordController = require("../controllers/forgetPasswordController");
const { getStudentInfo, upDateStudentInfo, signUpStudent, logInStudent, upDateStudentImg } = require("../controllers/studentControllers");
const router=express.Router();

router.post("/signup",signUpStudent);
router.post("/login",logInStudent);
router.get("/student/:id",getStudentInfo);
router.post("/updateinfo/:id",upDateStudentInfo);//update all info eccepted img
router.post("/updateimg/:id",upDateStudentImg);
router.post("/request-reset-password", ForgetPasswordController.requestResetPassword);
router.post("/reset-password", ForgetPasswordController.resetPassword);

module.exports=router;