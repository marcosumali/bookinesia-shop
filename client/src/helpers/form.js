const { parsePhoneNumberFromString, findNumbers } = require('libphonenumber-js');

// source: https://emailregex.com/ -> then remove \[ as suggested by terminal logs
function validateEmail(email) {
  var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


function returnPassword(string) {
  let length = string.length
  let password = '*'
  let hashedPassword = password.repeat(length)
  return hashedPassword
}


function validatePhone(phone) {
  let phoneJSON = parsePhoneNumberFromString(String(phone), 'ID')
  let result = {
    phone: '',
    status: false,
  }

  if (phoneJSON) {
    let formattedPhone = phoneJSON.format('E.164')
  
    let validStatus = phoneJSON.isValid()
    
    let lengthStatus = 'not-yet-determined'
    let phoneNumbers = findNumbers(String(phone), 'ID')
  
    if (phoneNumbers.length > 0) {
      let length = phoneNumbers[0].phone.length
      let country = phoneNumbers[0].country
      // Minimum length of number accepted by firebase phone auth
      if (country === 'ID' && length >= 9) {
        lengthStatus = true
      } else if (country === 'ID' && length < 9) {
        lengthStatus = false
      }
    } else {
      lengthStatus = false
    }
  
    if (validStatus === true && lengthStatus === true) {
      result.phone = formattedPhone
      result.status = true
    } else {
      result.status = false
    }
  } 

  return result
}


function formatPhone(phone, format) {
  // Accepted format: 'NATIONAL', 'INTERNATIONAL', 'E.164', 'RFC3966', 'IDD'
  let phoneJSON = parsePhoneNumberFromString(String(phone), 'ID')
  let formattedPhone = phoneJSON.format(format)

  return formattedPhone
}
module.exports = {
  validateEmail,
  returnPassword,
  validatePhone,
  formatPhone
}