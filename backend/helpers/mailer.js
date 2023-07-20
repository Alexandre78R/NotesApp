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
        from: "alexandre.renard98@gmail.com",
        to: dest,
        subject: "Réinitialisez votre mot de passe",
        text: `Utilisez ce lien pour réinitialiser votre mot de passe : ${url}`,
        html: `<p>Utilisez ce lien pour réinitialiser votre mot de passe : <a href=${url}>Réinitialisez votre mot de passe</a>`,
    };
    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendResetPasswordMail,
};