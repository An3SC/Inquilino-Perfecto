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
      <div style="background: linear-gradient(-340deg, #F5C634 50%, whitesmoke 0%)">
        <h1> Valida tu registro </h1>
        <p> Accede al siguiente enlace para validar tu cuenta </p>
        <label style="font-size: 20px">
          <a href="${link}">¡Clícame para validar tu cuenta!</a>
        </label>
        </div>
      </div>
      `,
  };

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
    <div style="background: linear-gradient(-340deg, #F5C634 50%, whitesmoke 0%)">
      <h1> Valida tu nuevo email </h1>
      <p style="font-size: 20px">Si te has registrado en el sistema, accede al siguiente enlace para validar tu nuevo email </p>
      <label style="font-size: 20px">
          <a href="${link}">¡Clícame para cambiar tu email!</a>
        </label>
      </div>
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
    <div style="background: linear-gradient(-340deg, #F5C634 50%, whitesmoke 0%)">
      <h1> Recupera tu contraseña </h1>
      <p style="font-size: 20px"> Accede al siguiente enlace para cambiar tu contraseña </p>
      <label style="font-size: 20px">
        <a href="${link}">¡Clícame para cambiar tu contraseña!</a>
      </label>
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
