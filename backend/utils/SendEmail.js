import nodeMailer from "nodemailer";

const SendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "20ituos093@ddu.ac.in",
      password: "kathan555@@@",
    },
  });
  const mailOptions = {
    from: "20ituos093@ddu.ac.in",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};
export default SendEmail;
