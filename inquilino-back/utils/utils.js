const sendgrid = require("@sendgrid/mail");
const { link } = require("joi");

const sendConfirmationMail = async (email, link) => {
  sendgrid.setApiKey(process.env.EMAIL_API_KEY);

  const message = {
    to: email,
    from: 'sierracardalda@gmail.com',
    subject: 'Validate your account',
    text: `La dirección de verificación es: ${link}`,
    html: `
        <div>
          <h1> Valida tu registro </h1>
          <p> Accede al siguiente
          enlace para validar tu cuenta </p>

          ${link}
        </div>
      `,
  };

  // Enviar mensaje
  await sendgrid.send(message);
}

const updateEmailMail = async (email, link) => {
  sendgrid.setApiKey(process.env.EMAIL_API_KEY);
  const message = {
    to: email,
    from: 'sierracardalda@gmail.com',
    subject: 'Validate your account',
    text: `La dirección de verificación del nuevo email es: ${link}`,
    html: `
        <div>
          <h1> Valida tu nuevo email </h1>
          <p> Si te has registrado en el sistema, accede al siguiente
          enlace para validar tu nuevo email </p>

          ${link}
        </div>
      `,
  }

  await sendgrid.send(message);
}

const recoverPasswordMail = async (email, link) => {
  sendgrid.setApiKey(process.env.EMAIL_API_KEY);
  const message = {
    to: email,
    from: 'sierracardalda@gmail.com',
    subject: 'Recupera tu contraseña',
    text: `Accede al siguiente enlace para cambiar tu contraseña ${link}`,
    html: `
        <div>
          <h1> Recupera tu contraseña </h1>
          <p> Accede al siguiente enlace para cambiar tu contraseña </p>

        ${link}
        </div>
      `,
  }
  await sendgrid.send(message);
}

module.exports = {
  sendConfirmationMail,
  updateEmailMail,
  recoverPasswordMail
}
