const nodemailer = require("nodemailer");

async function sendEmail(to, subject, body) {
  // create a nodemailer transporter object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kishan.hackx@gmail.com", // replace with your Gmail account email
      pass: "hackx@123", // replace with your Gmail account password or application-specific password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "kishan.hackx@gmail.com", // replace with your Gmail account email
    to: to,
    subject: subject,
    text: body,
  });

  console.log(`Message sent: ${info.messageId}`);
  toast.success("Message sent");
}
