import User from "../models/user.js";
import bcrypt from "bcrypt";

export function createUser(req,res){


    const passwordHash = bcrypt.hashSync(req.body.password,10)
    


    const userData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : passwordHash,
    }

    const user = new User(userData)

    user.save().then(
        ()=>{
            res.json({
                message : "User created successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Failed to create user"
            })
        }
    )
}

export function isAdmin(req){
    if(req.user == null){
        return false;
    }

    if (req.user.role == "admin"){
        return true;
    }else{
        return false; 
    }
}