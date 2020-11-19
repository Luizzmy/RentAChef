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

exports.userContact=(userName, senderName, email, sender, body, budget)=>{

  return transporter.sendMail({
    from: 'Rent-a-Chef',
    to: [email,sender],
    subject: `${senderName} from Rent-A-Chef wants to get in touch with you!`,
    html:
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Rent-a-Chef</title>
    </head>
    <body>
      <h1 class="title">Hi! ${userName}, the user ${senderName} wants to get in touch with you! send a reply to this email: ${sender}!</h1>
      <h3 class="budget">For a budget of $${budget} ${senderName} is expecting/offering the following</h3>
      <h4 class="body">${body}</h4>
    </body>
    </html>
    `
  })
}
