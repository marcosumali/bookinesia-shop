// Get shop data
export const getShop = (shopId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let shopRef = firestore.collection('shop').doc(shopId)
    
    shopRef
    .onSnapshot(function (doc) {
      if (doc.exists) {
        let data = doc.data()
        let id = doc.id
        data['id'] = id
        dispatch(getShopAction(data))
      } 
    })
  }
}

const getShopAction = (data) => {
  return {
    type: 'SET_SHOP_SUCCESS',
    payload: data
  }
}
