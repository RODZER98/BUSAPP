const nodemailer = require("nodemailer");
const div = document.querySelector("#enviarcorreo");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.email",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "rodzertesting@gmail.com",
    pass: "qkxz tvtp ktod psey",
  },
});

/*transporter.verify().then(() => { 
  
  console.log('Ready to send email') 

})
.catch(error => console.log('Error: ', error));// verify connection configuration  

module.exports = transporter;*/

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Rodzer Testing" <rodzertesting@gmail.com>', // sender address
    to: "email", // list of receivers
    subject: "Test Email", // Subject line
    text: "Este es un correo de prueba.", // plain text body
    html: "<b>Este es un correo de prueba.</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
