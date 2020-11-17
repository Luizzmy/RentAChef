const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})


exports.userRegister = (names, email, role) => {
  let userRole = ""
  if (role === "Chef") {
    userRole = "Chef "
  }
  
  return transporter.sendMail({
    from: 'Rent-a-Chef',
    to: email,
    subject: `Welcome to Rent-a-Chef, ${userRole}${names}`,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Rent-a-Chef</title>
    </head>
    <body>
      <h1 class="title">Hello ${names}, welcome to Rent-a-Chef!</h1>
    </body>
    </html>
    `
  })
}