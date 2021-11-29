const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users.controller');
const { getCurrentUser } = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/authentication');

router.get(
    "/loginwithgoogle",
    passport.authenticate("google", { scope: ["profile", "email"] })
    );
    
router.get(    
    "/login/googleok",
    passport.authenticate("google", { failureRedirect: "/notFound" }),  
    userController.createWithGoogle      
);

router.post("/", userController.create);       
router.get("/:id", userController.read);
router.get("/me", authMiddleware.loginRequired, userController.getCurrentUser)    
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);
        
module.exports = router;
        
