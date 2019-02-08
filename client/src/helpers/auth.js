const jwt = require('jsonwebtoken');

const PRIVATEKEY = process.env.REACT_APP_PRIVATEKEY

let todayFullDate = new Date(Date.now())
let todayYear = todayFullDate.getFullYear()
let todayDate = todayFullDate.getDate()
let todayMonth = todayFullDate.getMonth() + 1
let expirationYear = Number(todayYear) + 10
let expirationDate = new Date(expirationYear, todayMonth, todayDate)

function getCookies(cookies) {
  let  BSID = cookies.get('BSID')
  return BSID
}

function setNewCookies(cookies, customerData) {
  let BSID = jwt.sign(customerData, PRIVATEKEY)
  cookies.set('BSID', BSID, { path: '/', secure: false, expires: expirationDate })
}

function verifyCookies(BSID) {
  let decodedBSID = jwt.verify(BSID, PRIVATEKEY)
  return decodedBSID
}

function removeCookies(cookies) {
  cookies.remove('BSID',  { path: '/', secure: false, expires: expirationDate })
}


module.exports = {
  setNewCookies,
  verifyCookies,
  getCookies,
  removeCookies
}



