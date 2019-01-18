
// ---------------------------------------------- GENERAL ACTION ----------------------------------------------
export const setCookies = (cookiesFunction) => {
  return {
    type: 'SET_COOKIES_FUNCTION',
    payload: cookiesFunction
  }
}

export const setWindow = (windowFunction) => {
  return {
    type: 'SET_WINDOW_FUNCTION',
    payload: windowFunction
  }
}