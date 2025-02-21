// These are named exports and can be multiple in a module
import bcrypt from "bcrypt";
import prisma from "../../helpers/prisma.js"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { generateOTP } from "../../helpers/otpGenerator.js";
import Mailgen from "mailgen";


export const sendOtp = async (req, res) => {
    try {
    const { email, name } = req.body;
    let otp = await generateOTP(6);
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
        user: "smpt4861@gmail.com",
        pass: "ydqtqbcsxyqzcsix",
      },
    });
    let MailGenerator = new Mailgen({
        theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
    },
});

// Verfiy and finally register 
let response = {
    body: {
        name,
        intro: `Thank you for registering, ${name}!`,
        action: {
            instructions: 'Please enter the following OTP to complete your registration:',
            button: {
                color: '#22BC66', // Optional action button color
                text: `Your OTP: ${otp}`,
            },
        },
        outro: 'Looking forward to doing more business with you.',
    },
};

let mail = MailGenerator.generate(response);
let message = {
    from: 'Mummy Tiffins', // sender address
    to: `${email}`, // list of receivers
    subject: "Mummy Tiffins Registration OTP", // Subject line // plain text body
    html: mail, // html body
};

transporter.sendMail(message).catch((error) => {
    return res.status(500).json(error);
});
const o = await prisma.otp.create({
    data: {
        email,
        otp,
    },
});
res
.status(200)
.json({
    message: `Email sent successfuly to ${email} with otp ${o.otp}`,
});
} catch (error) {
    console.log(error);
    // await prisma.otp.delete({
        //   where: { email },
        // });
    }
};

// register controller
export const VerifyOtpRegister = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;
    // encrypting the password
    let hashedPassword = await bcrypt.hash(password, 10);
    // creating a new user in prisma
    let r_otp = await prisma.otp.findUnique({
      where: {
        email,
      },
    });
    if (otp == r_otp.otp) {
      const newUser = await prisma.user.create({
        data: {
          name,
          role,
          email,
          password: hashedPassword,
        },
      });
      await prisma.otp.delete({
        where: { email },
      });
      if(!newUser) {
        res.status(401).json({ message: `Failed creating a user :(` });
      }
      res.status(201).json({ message: `user Created successfully` });
    } else {
      res.status(401).json({ message: `Invalid otp` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Failed creating a user :(` });
  }
};
// Login controller
export const login = async (req, res) => {
  // these are our route handler functions
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(401).json({ message: `Invalid credentials` });
    }
    const isPasswordValid =
      (await bcrypt.compare(password, user.password));
    if (!isPasswordValid) {
      res.status(401).json({ message: `Invalid Credentials` });
    } else {
      // res.send(`login works`);
      const age = 1000 * 60 * 60 * 24 * 7;

      const token = jwt.sign(
        {
          id: user.id,
          admin: false,
        },
        process.env.JWT_KEY,
        { expiresIn: age } // age of validity of a cookie
      );
      const { password: userpassword, ...userInfo } = user;
      res
        .cookie("token", token, {
          httpOnly: true,
          // secure:true,
          maxAge: age, //max age of the cookie
        })
        .status(200)
        .json(userInfo);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Couldn't log in: ${err}` });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: `Logout Successfull` });
};
