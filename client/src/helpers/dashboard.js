const jwt = require('jsonwebtoken');

const PRIVATEKEY = process.env.REACT_APP_PRIVATEKEY;

let todayFullDate = new Date(Date.now())
let todayYear = todayFullDate.getFullYear()
let todayDate = todayFullDate.getDate()
let todayMonth = todayFullDate.getMonth() + 1
// To set cookies expiration date for 10 years
let expirationYear = Number(todayYear) + 10
let expirationDate = new Date(expirationYear, todayMonth, todayDate)

function getLatestDashboardMenuStatus (cookies) {
  let DMS = cookies.get('DMS')

  if (DMS) {
    let decodedDMS = jwt.verify(DMS, PRIVATEKEY)
    return decodedDMS
  }
}

function saveDashboardMenuStatus (cookies, dashboardMenuStatus) {
  let DMS = jwt.sign(dashboardMenuStatus, PRIVATEKEY)
  cookies.set('DMS', DMS, { path: '/', secure: false, expires: expirationDate })
}


module.exports = {
  getLatestDashboardMenuStatus,
  saveDashboardMenuStatus,
}

