const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const { setTestEmailSend } = require("../state/state.data");

const sendEmail = (userEmail, name, confirmationCode) => {
  //siempre que utilizamos el estado, lo inicializamos a su valor inicial
  setTestEmailSend(false);

  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: email,
    to: userEmail,
    subject: "Confirmation code",
    text: `tu código es ${confirmationCode}, gracias por confiar en guillebags, ${name}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error, "error ❌");
      setTestEmailSend(false);
    } else {
      console.log("Email sent: " + info.response);
      setTestEmailSend(true);
    }
  });
};

module.exports = sendEmail;
