function returnWhatDay(dayIndex) {
  switch (dayIndex) {
    case 0:
      return 'sunday'
    case 1:
      return 'monday'
    case 2:
      return 'tuesday'
    case 3:
      return 'wednesday'
    case 4:
      return 'thursday'
    case 5:
      return 'friday'
    case 6:
      return 'saturday'
    default:
      return 'Not found';
  }
}

function returnWhatMonth(dayIndex) {
  switch (dayIndex) {
    case 0:
      return 'january'
    case 1:
      return 'february'
    case 2:
      return 'march'
    case 3:
      return 'april'
    case 4:
      return 'may'
    case 5:
      return 'june'
    case 6:
      return 'july'
    case 7:
      return 'august'
    case 8:
      return 'september'
    case 9:
      return 'october'
    case 10:
      return 'november'
    case 11:
      return 'december'
    default:
      return 'Not found';
  }
}

function getStoreOpenStatus(currentDate, openingDate, closingDate) {
  if (currentDate > openingDate && currentDate < closingDate) {
    return 'open'
  } else {
    return 'close'
  }
}

function returnAcceptedDate(openingDate) {
  let dates = openingDate.split('-')
  let setYear = dates[0]
  let setMonth = dates[1] - 1
  let setDate = dates[2]
  let inputDate = new Date(setYear, setMonth, setDate)
  let year = inputDate.getFullYear()
  let month = inputDate.getMonth() + 1
  let date = inputDate.getDate()

  if (String(month).length <= 1) {
    month = '0' + month      
  }
  
  if (String(date).length <= 1) {
    date = '0' + date      
  }
  let acceptedDate = `${year}-${month}-${date}`
  return acceptedDate  
}


module.exports = {
  returnWhatDay,
  getStoreOpenStatus,
  returnWhatMonth,
  returnAcceptedDate,
}