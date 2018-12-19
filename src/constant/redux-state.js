export const initialState = {
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
          status: false
        },
        {
          name: 'Services',
          status: false
        },
        {
          name: 'Users',
          status: false
        }
      ]
    },
    {
      name: 'Reports',
      status: false,
      child: [
        {
          name: 'Transaction',
          status: false
        },
        {
          name: 'Customer',
          status: false
        }
      ]
    }
  ]
}