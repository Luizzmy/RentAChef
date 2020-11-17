const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

exports.chefRegister = (names) => {
  return transporter.sendMail({
    from: 'Rent-a-Chef',
    to: email,
    subject: "Welcome to Rent-a-Chef",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Rent-a-Chef</title>
    </head>
    <body>
      <h1 class="title">Hello Chef ${names}, welcome to Rent-a-Chef!</h1>
    </body>
    </html>
    `
  })
}

exports.userRegister = (names) => {
  return transporter.sendMail({
    from: 'Rent-a-Chef',
    to: email,
    subject: "Welcome to Rent-a-Chef",
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