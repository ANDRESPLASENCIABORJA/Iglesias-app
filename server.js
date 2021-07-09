// This constant requires all the express functionalities
const express = require("express");
// This constant uses the constant express that has inside it all the express functionalities
const app = express();
// Require nodemailer package
const nodemailer = require("nodemailer");
// Require .env, config method is going to look up the information stored on the env variables and will use that info
require("dotenv").config();

// This constant is where the port will be listening
const PORT = process.env.PORT || 5000;
const user = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

// Middleware
app.use(express.static("public"));
app.use(express.json());

//This is how we use the get method
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/contactform.html");
});

// Now create a post route
app.post("/", (req, res) => {
  // With re.body we will get the data on the backend because in the middleware we are telling express to pass the data on a json file that we specified it on the fron end js
  console.log(req.body);

  // Now make the information to go to an email, the method createTransport is to do so
  const emailTransporter = nodemailer.createTransport({
    // This is the service that we are using, in this case is gmail
    service: "gmail",
    // This are the credentials
    auth: {
      user: user,
      pass: password,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.USER_EMAIL,
    subject: `Message from ${req.body.email}: ${req.body.name}`,
    text: req.body.problem
  };


  emailTransporter.sendMail(mailOptions, (err, info)=>{
      if(err){
          console.log(err);
          res.send('error');
      } else {
          console.log('Email sent ' + info.response);
          res.send('success');
      }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
