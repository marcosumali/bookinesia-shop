import {
  CHANGE_COMPONENT, SHOW_CHILD, CHANGE_CHILD
} from '../../constant/action-types';

const initialState = {
  stateStatus: [
    {
      name: 'Welcome',
      status: true,
      child: null
    },
    {
      name: 'Calendar',
      status: false,
      child: null
    },
    {
      name: 'Manage',
      status: false,
      child: [
        {
          name: 'Barbers',
          status: true
        },
        {
          name: 'Services',
          status: false
        },
        {
          name: 'Users',
          status: false
        }
      ],
      childStatus: false
    },
    {
      name: 'Reports',
      status: false,
      child: [
        {
          name: 'Transaction',
          status: true
        },
        {
          name: 'Customer',
          status: false
        }
      ],
      childStatus: false
    }
  ]
}

const Bookinesia = (state = {...initialState}, action) => {
  switch (action.type) {
    case CHANGE_COMPONENT:
      return {
        ...state,
        stateStatus: action.payload
      };
    case SHOW_CHILD:
      return {
        ...state,
        stateStatus: action.payload
      };
    case CHANGE_CHILD:
      return {
        ...state,
        stateStatus: action.payload
      }
    default:
      return state;
  }
};

export default Bookinesia;
