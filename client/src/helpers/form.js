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

module.exports = {
  validateEmail,
  returnPassword
}