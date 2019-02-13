require('dotenv').config()
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const fs = require('fs')
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const handlebars = require('handlebars');

const { formatMoney, getTotalTransaction } = require('./helpers/currency');
const { returnWhatDay, returnWhatMonth } = require('./helpers/date');

const AUTH_USERNAME = process.env.SENDGRID_USERNAME
const AUTH_PASS = process.env.SENDGRID_PASS
const AUTO_EMAIL = process.env.EMAIL_AUTOMATED
const REMINDER_EMAIL = process.env.EMAIL_REMINDER
const RECEIPTS_EMAIL = process.env.EMAIL_RECEIPTS
const SHOP_SKIP_EMAIL = fs.readFileSync(__dirname + '/nodemailer/templates/shop.skip.transaction.html', 'utf-8')
const SHOP_QUEUE_REMINDER_EMAIL = fs.readFileSync(__dirname + '/nodemailer/templates/shop.queue.reminder.html', 'utf-8')
const SHOP_FINISH_TRANSACTION = fs.readFileSync(__dirname + '/nodemailer/templates/shop.finish.transaction.html', 'utf-8')
const SHOP_ADD_TRANSACTION = fs.readFileSync(__dirname + '/nodemailer/templates/shop.add.transaction.html', 'utf-8')

admin.initializeApp(functions.config().firebase);

exports.sendEmailShopSkipTransaction = functions.https.onRequest((req, res) => {
  cors(req, res, () => {})

  let customerName = req.body.name
  let customerEmail = req.body.email
  let transactionId = req.body.transactionId
  let date = req.body.date
  let newDate = `${returnWhatDay(Number(new Date(date).getDay()))}, ${new Date(date).getDate()} ${returnWhatMonth(Number(new Date(date).getMonth()))} ${new Date(date).getFullYear()}` 
  
  let shopName = req.body.shopName
  let shopLogo = req.body.shopLogo
  let branchName = req.body.branchName
  let queueNo = req.body.queueNo
  let staffName = req.body.staffName
  let staffImage = req.body.staffImage
  let phone = req.body.phone

  let emailTemplate = SHOP_SKIP_EMAIL

  // setting up email with data in handlebars
  let template = handlebars.compile(emailTemplate)
  let data = { 
    'name': customerName,
    'transactionId': transactionId,
    'date': newDate,
    'shopName': shopName,
    'shopLogo': shopLogo,
    'branchName': branchName,
    'queueNo': queueNo,
    'staffName': staffName,
    'staffImage': staffImage,
    'phone': phone,
  }
  let templateWithData = template(data)

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Bookinesia" ${AUTO_EMAIL}`,
    to: customerEmail,
    subject: `Notification: Your queue number has been skipped !`, 
    html: `${templateWithData}`
  }

  // send mail with defined transport object
  let options = {
    auth: {
      api_user: `${AUTH_USERNAME}`,
      api_key: `${AUTH_PASS}`
    }
  }
  
  let client = nodemailer.createTransport(sgTransport(options))

  client.sendMail(mailOptions, function(err, info){
    if (err){
      console.log('ERROR: Shop Skip Transaction Message not sent ', err)
      res.status(400).json({
        message: 'ERROR: Shop Skip Transaction Message not sent',
        err,
      })    
    }
    else {
      // console.log(`Shop Skip Transaction Message sent`, info.message)
      res.status(200).json({
        message: 'Shop Skip Transaction Message is sent',
        messageInfo: info.message
      })    
    }
  })
})


exports.sendEmailQueueReminder = functions.https.onRequest((req, res) => {
  cors(req, res, () => {})

  let customerName = req.body.name
  let customerEmail = req.body.email
  let transactionId = req.body.transactionId
  let date = req.body.date
  let newDate = `${returnWhatDay(Number(new Date(date).getDay()))}, ${new Date(date).getDate()} ${returnWhatMonth(Number(new Date(date).getMonth()))} ${new Date(date).getFullYear()}` 
  
  let shopName = req.body.shopName
  let shopNames = shopName.split(' ')
  let shopNamesCapitalize = []
  shopNames && shopNames.map(shopWord => {
    let capitalizeWord = shopWord.charAt(0).toUpperCase() + shopWord.slice(1)
    shopNamesCapitalize.push(capitalizeWord)
  })
  let shopNameCapitalize = shopNamesCapitalize.join(" ")
  let shopLogo = req.body.shopLogo
  
  let branchName = req.body.branchName
  let branchNames = branchName.split(' ')
  let branchNamesCapitalize = []
  branchNames && branchNames.map(branchWord => {
    let capitalizeWord = branchWord.charAt(0).toUpperCase() + branchWord.slice(1)
    branchNamesCapitalize.push(capitalizeWord)
  })
  let branchNameCapitalize = branchNamesCapitalize.join(" ")
  
  let queueNo = req.body.queueNo
  let staffName = req.body.staffName
  let staffImage = req.body.staffImage
  let currentQueue = req.body.currentQueue
  let text = req.body.text
  let category = req.body.category

  let emailTemplate = SHOP_QUEUE_REMINDER_EMAIL

  // setting up email with data in handlebars
  let template = handlebars.compile(emailTemplate)
  let data = { 
    'name': customerName,
    'transactionId': transactionId,
    'date': newDate,
    'shopName': shopName,
    'shopLogo': shopLogo,
    'branchName': branchName,
    'queueNo': queueNo,
    'staffName': staffName,
    'staffImage': staffImage,
    'currentQueue': currentQueue,
    'text': text,
    'category': category,
  }
  let templateWithData = template(data)

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Bookinesia" ${REMINDER_EMAIL}`,
    to: customerEmail,
    subject: `Reminder: Your ${category} appointment on ${new Date(date).toDateString()} at ${shopNameCapitalize}, ${branchNameCapitalize}`, 
    html: `${templateWithData}`
  }

  // send mail with defined transport object
  let options = {
    auth: {
      api_user: `${AUTH_USERNAME}`,
      api_key: `${AUTH_PASS}`
    }
  }
  
  let client = nodemailer.createTransport(sgTransport(options))

  client.sendMail(mailOptions, function(err, info){
    if (err){
      console.log('ERROR: Reminder Message not sent', err)
      res.status(400).json({
        message: 'ERROR: Reminder Message not sent',
        err,
      })    
    }
    else {
      // console.log(`Reminder Message is sent`, info.message)
      res.status(200).json({
        message: 'Reminder Message is sent',
        messageInfo: info.message
      })    
    }
  })
})

exports.sendEmailTransactionReceipt = functions.https.onRequest((req, res) => {
  cors(req, res, () => {})

  let customerName = req.body.name
  let customerEmail = req.body.email
  let transactionId = req.body.transactionId
  
  let date = req.body.date
  let newDate = `${returnWhatDay(Number(new Date(date).getDay()))}, ${new Date(date).getDate()} ${returnWhatMonth(Number(new Date(date).getMonth()))} ${new Date(date).getFullYear()}` 
  
  let shopName = req.body.shopName
  let shopNames = shopName.split(' ')
  let shopNamesCapitalize = []
  shopNames && shopNames.map(shopWord => {
    let capitalizeWord = shopWord.charAt(0).toUpperCase() + shopWord.slice(1)
    shopNamesCapitalize.push(capitalizeWord)
  })
  let shopNameCapitalize = shopNamesCapitalize.join(" ")
  let shopLogo = req.body.shopLogo
  
  let branchName = req.body.branchName
  let branchNames = branchName.split(' ')
  let branchNamesCapitalize = []
  branchNames && branchNames.map(branchWord => {
    let capitalizeWord = branchWord.charAt(0).toUpperCase() + branchWord.slice(1)
    branchNamesCapitalize.push(capitalizeWord)
  })
  let branchNameCapitalize = branchNamesCapitalize.join(" ")
  
  let queueNo = req.body.queueNo
  let staffName = req.body.staffName
  let staffImage = req.body.staffImage
  let services = req.body.service
  
  let currency = ''
  let monetisedServices = []
  services && services.map((service) => {
    let newService = {
      name: service.name,
      description: service.description,
      currency: service.currency,
      price: formatMoney(service.price)
    }
    currency = service.currency
    monetisedServices.push(newService)
  })

  let totalAmount = formatMoney(getTotalTransaction(services))

  let emailTemplate = SHOP_FINISH_TRANSACTION

  // setting up email with data in handlebars
  let template = handlebars.compile(emailTemplate)
  let data = { 
    'name': customerName,
    'transactionId': transactionId,
    'date': newDate,
    'shopName': shopName,
    'shopLogo': shopLogo,
    'branchName': branchName,
    'queueNo': queueNo,
    'staffName': staffName,
    'staffImage': staffImage,
    'services': monetisedServices,
    'totalAmount': totalAmount,
    'currency': currency
  }
  let templateWithData = template(data)

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Bookinesia" ${RECEIPTS_EMAIL}`,
    to: customerEmail,
    subject: `Your transaction receipt at ${shopNameCapitalize}, ${branchNameCapitalize} on ${new Date(date).toDateString()}`, 
    html: `${templateWithData}`
  }

  // send mail with defined transport object
  let options = {
    auth: {
      api_user: `${AUTH_USERNAME}`,
      api_key: `${AUTH_PASS}`
    }
  }

  let client = nodemailer.createTransport(sgTransport(options))

  client.sendMail(mailOptions, function(err, info){
    if (err){
      console.log('ERROR: Shop Finish Transaction Message not sent', err)
      res.status(400).json({
        message: 'ERROR: Shop Finish Transaction Message not sent',
        err,
      })    
    }
    else {
      // console.log(`Shop Finish Transaction Message is sent`, info.message)
      res.status(200).json({
        message: 'Shop Finish Transaction Message is sent',
        messageInfo: info.message
      })    
    }
  })
})

exports.sendEmailBookTransaction = functions.https.onRequest((req, res) => {
  cors(req, res, () => {})

  let customerName = req.body.name
  let customerEmail = req.body.email
  let transactionId = req.body.transactionId
  let date = req.body.date
  let newDate = `${returnWhatDay(Number(new Date(date).getDay()))}, ${new Date(date).getDate()} ${returnWhatMonth(Number(new Date(date).getMonth()))} ${new Date(date).getFullYear()}` 
  
  let shopName = req.body.shopName
  let shopNames = shopName.split(' ')
  let shopNamesCapitalize = []
  shopNames && shopNames.map(shopWord => {
    let capitalizeWord = shopWord.charAt(0).toUpperCase() + shopWord.slice(1)
    shopNamesCapitalize.push(capitalizeWord)
  })
  let shopNameCapitalize = shopNamesCapitalize.join(" ")
  let shopLogo = req.body.shopLogo
  
  let branchName = req.body.branchName
  let branchNames = branchName.split(' ')
  let branchNamesCapitalize = []
  branchNames && branchNames.map(branchWord => {
    let capitalizeWord = branchWord.charAt(0).toUpperCase() + branchWord.slice(1)
    branchNamesCapitalize.push(capitalizeWord)
  })
  let branchNameCapitalize = branchNamesCapitalize.join(" ")
  
  let queueNo = req.body.queueNo
  let staffName = req.body.staffName
  let staffImage = req.body.staffImage

  let emailTemplate = SHOP_ADD_TRANSACTION

  // setting up email with data in handlebars
  let template = handlebars.compile(emailTemplate)
  let data = { 
    'name': customerName,
    'transactionId': transactionId,
    'date': newDate,
    'shopName': shopName,
    'shopLogo': shopLogo,
    'branchName': branchName,
    'queueNo': queueNo,
    'staffName': staffName,
    'staffImage': staffImage,
  }
  let templateWithData = template(data)

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Bookinesia" ${AUTO_EMAIL}`,
    to: customerEmail,
    subject: `Your booking receipt for an appointment on ${new Date(date).toDateString()} at ${shopNameCapitalize}, ${branchNameCapitalize}`, 
    html: `${templateWithData}`
  };

  // send mail with defined transport object
  let options = {
    auth: {
      api_user: `${AUTH_USERNAME}`,
      api_key: `${AUTH_PASS}`
    }
  }
  
  let client = nodemailer.createTransport(sgTransport(options))

  client.sendMail(mailOptions, function(err, info){
    if (err){
      console.log('ERROR: Booking Receipt Message not sent', err)
      res.status(400).json({
        message: 'ERROR: Booking Receipt Message not sent',
        err,
      })    
    }
    else {
      // console.log(`Booking Receipt Message is sent`, info.message)
      res.status(200).json({
        message: 'Booking Receipt Message is sent',
        messageInfo: info.message
      })    
    }
  })
})