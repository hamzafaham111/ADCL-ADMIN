const mongoose = require('mongoose');
const express = require('express');
const RandExp = require('randexp');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const router = express.Router();
const Auth = require('../Model/userSchema');
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
    const { enterEmail, enterPassword } = req.body;

    if (!enterEmail || !enterPassword) {
        res.status(403).json({ error: "Enter Complete Information" })
        return;
    } else {
        const emailFound = await Auth.findOne({ email: enterEmail })
        if (emailFound) {
            var { password, token } = emailFound;
            bcrypt.compare(enterPassword, password, function (error, response) {
                if (response) {
                    res.status(202).json({ message: "Loged IN", token })
                    return;
                } else {
                    console.log("sorry something went wrong");
                    res.status(403).send({ error: "wrong information" });
                    return;
                }
                res.status(403).send({ error: "wrong information" });
                return;
            });
        } else {
        }
    }
})

router.post('/forgetpassword', async (req, res) => {
    var { recoveryEmail } = req.body;
    //check if user email alredy exist then recove the password
    if (!recoveryEmail) {
        res.status(403).json({ error: "Enter Your Email First" });
        return;
    } else {
        const data = await Auth.findOne({ email: recoveryEmail })
        if (data) {
            const randexp = new RandExp(/\w{16}/);
            const tempPassString = randexp.gen();

            //creating hash for temp password
            const saltRounds = 15;                             //We are setting salt rounds, higher is safer.
            const myPlaintextPassword = tempPassString;               //Unprotected password
            bcrypt.hash(myPlaintextPassword, saltRounds, async (err, hash) => {


                const updatedPassword = await Auth.updateOne({ email: recoveryEmail }, { $set: { password: hash } })
                if (updatedPassword) {
                    const data = await Auth.findOne({ email: recoveryEmail })
                    const { email, password } = data;
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'hamzafaham111@gmail.com',
                            pass: 'lbjo gkrj iach gjob'
                        }
                    });
                    var mailOptions = {
                        sender: email,
                        to: email,
                        subject: 'Chang password',
                        html: `<div>
                        <div>Your Temperory ADCL Admin password is:</div>
                        <h2 style="font-size:"30px">${tempPassString}</h2>
                        <p>Please note it somewere</p>
                        </div>`,
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.status(202).json({ message: `Temperary Passward Sent To Your Email` })
                }
            });
        } else {
            console.log("you are not a valid user");
            res.status(403).json({ error: "You Are Not A Valid User" })
        }
    }
})


module.exports = router;