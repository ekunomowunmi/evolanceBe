
const User = require('../models/user');
const validateRegisterInput = require('../_helpers/validation/register');
const validateLoginInput = require('../_helpers/validation/login');
const nodemailer = require('nodemailer');

createAccount = (req,res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
    .then(user => {
        if(user){
            return res.status(400).json({email: 'Email already exists'});
        } else {
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                birthDate: req.body.birthDate,

            });
            newUser.save()
            .then(user => {return res.status(200).json(user)})
            .catch(err => res.json(error))
        }
    })
    .catch(error => {
        return res.status(400).json(error);
    });

}

authenticate = (req,res) => {
    const {errors,isValid} = validateLoginInput(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email})
    .then(user => {
        if(!user){
            return res.status(404).json('Email not found');
        }
        if(password == user.password){
            const payload = {
                id:user.id,
                user: user
            }
            return res.status(200).json(payload);
        }
        else return res.status(400).json('Incorrect Password')
    })
}

getAllUsers = async (req,res) => {
    await User.find({})
    .then(users => {
        console.log(users);
        return res.status(200).json(users);
    })
    .catch(error => {
        console.log(error);
    })
}

sendMailer = async (user, callBack) => {
    console.log('request user');
    const transporter = nodemailer.createTransport({
        host: "sc800.whpservers.com",
        port: 587,
        secure: false,
        auth: {
          user: "omowunmi@ndali.app",
          pass: "omowunmiekun1@gmail.com"
        }
    })
    const mailOptions = {
        from: `"info@evolance.com"`,
        to: `omowunmiekun1@gmail.com`,
        subject: "New User Created",
        html: `<h1>A user has been created</h1> 
        <p><b>Name:</b> ${user.firstName} ${user.lastName}</p>
        <p><b>Email Address: ${user.email}</b></p>
        
        <p>Please open the web portal to confirm</p>`
      };
      transporter.sendMail(mailOptions,callBack);
}

// henry@evolancetechnologies.com`,
sendMail = async (req,res) => {
    let user = req.body;
    sendMailer(user,(err,info) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({ error: "Failed to send email" });
          } else {
            console.log("Email has been sent");
            res.send(info);
          }
    })
}


module.exports = {
    createAccount,
    authenticate,
    getAllUsers,
    sendMail
}