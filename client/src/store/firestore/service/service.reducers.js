let initialState = {
  services: [],
  servicesExists: true,
  servicesLoading: true,
  allServices: [],
  allServicesExists: true,
  allServicesLoading: true,
  selectedService: {},
  serviceName: '',
  serviceNameError: false,
  servicePrice: '',
  servicePriceError: false,
  serviceDuration: '',
  serviceDurationError: false,
  serviceType: '', 
  serviceDisableStatus: false,
  serviceTypeOptions: ['primary', 'secondary'],
  loadingStatus: false,
  addServiceName: '',
  addServiceNameError: false,
  addServicePrice: '',
  addServicePriceError: false,
  addServiceDuration: '',
  addServiceDurationError: false,
  addServiceType: '',
}

const serviceDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_SERVICES_SUCCESS':
      return ({
        ...state,
        services: action.payload,
        servicesLoading: false,
      })
    case 'SET_SERVICES_FAILED':
      return ({
        ...state,
        servicesExists: action.payload,
      })
    case 'SET_ALL_SERVICES_SUCCESS':
      return ({
        ...state,
        allServices: action.payload,
        allServicesLoading: false,
      })
    case 'SET_ALL_SERVICES_FAILED':
      return ({
        ...state,
        allServicesExists: action.payload,
      })
    case 'SET_SELECTED_SERVICE':
      return ({
        ...state,
        selectedService: action.payload,
      })
    case 'SET_SERVICE_NAME_INPUT':
      return ({
        ...state,
        serviceName: action.payload,
      })
    case 'SET_SERVICE_NAME_INPUT_ERROR':
      return ({
        ...state,
        serviceNameError: action.payload,
      })
    case 'SET_SERVICE_DURATION_INPUT':
      return ({
        ...state,
        serviceDuration: action.payload,
      })
    case 'SET_SERVICE_DURATION_INPUT_ERROR':
      return ({
        ...state,
        serviceDurationError: action.payload,
      })
    case 'SET_SERVICE_PRICE_INPUT':
      return ({
        ...state,
        servicePrice: action.payload,
      })
    case 'SET_SERVICE_PRICE_INPUT_ERROR':
      return ({
        ...state,
        servicePriceError: action.payload,
      })
    case 'SET_SERVICE_TYPE_INPUT':
      return ({
        ...state,
        serviceType: action.payload,
      })
    case 'SET_SERVICE_DISABLE_STATUS':
      return ({
        ...state,
        serviceDisableStatus: action.payload,
      })
    case 'SET_SERVICE_LOADING_STATUS':
      return ({
        ...state,
        loadingStatus: action.payload,
      })
    case 'SET_ADD_SERVICE_NAME_INPUT':
      return ({
        ...state,
        addServiceName: action.payload,
      })
    case 'SET_ADD_SERVICE_NAME_INPUT_ERROR':
      return ({
        ...state,
        addServiceNameError: action.payload,
      })
    case 'SET_ADD_SERVICE_DURATION_INPUT':
      return ({
        ...state,
        addServiceDuration: action.payload,
      })
    case 'SET_ADD_SERVICE_DURATION_INPUT_ERROR':
      return ({
        ...state,
        addServiceDurationError: action.payload,
      })
    case 'SET_ADD_SERVICE_PRICE_INPUT':
      return ({
        ...state,
        addServicePrice: action.payload,
      })
    case 'SET_ADD_SERVICE_PRICE_INPUT_ERROR':
      return ({
        ...state,
        addServicePriceError: action.payload,
      })
    case 'SET_ADD_SERVICE_TYPE_INPUT':
      return ({
        ...state,
        addServiceType: action.payload,
      })

    default:
      return state;
  }
}

export default serviceDataList;