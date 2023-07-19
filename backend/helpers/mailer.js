const mailer = require("nodemailer");

const transporter = mailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendResetPasswordMail = async ({ dest, url }) => {
    const mailOptions = {
        from: "alexandre.renard98@gmail.com", // this is the address from which the email will be sent
        to: dest, // this is the address to which the email will be sent
        subject: "Réinitialisez votre mot de passe",
        text: `Utilisez ce lien pour réinitialiser votre mot de passe : ${url}`, // url will be defined later in our controller
        html: `<p>Utilisez ce lien pour réinitialiser votre mot de passe : <a href=${url}>Réinitialisez votre mot de passe</a>`,
    };
    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendResetPasswordMail,
};