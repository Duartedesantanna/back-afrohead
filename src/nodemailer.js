const nodemailer = require('nodemailer');

const transportador = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false,
    auth: {
      user: "postmaster@sandbox40603a31038b47a0bdf8018053c1c102.mailgun.org",
      pass: "0487d332c12a777cfa25a4afd3c8e750-7dcc6512-4d0a6275",
    },
})

module.exports = transportador;