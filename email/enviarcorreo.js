const nodemailer = require('nodemailer');
//const div = document.querySelector("#enviarcorreo");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "rodzertesting@gmail.com",
    pass: "qkxz tvtp ktod psey"
  },
});

/*transporter.verify().then(() => { 
  
  console.log('Ready to send email') 

})
.catch(error => console.log('Error: ', error));// verify connection configuration  
*/
module.exports = transporter;


