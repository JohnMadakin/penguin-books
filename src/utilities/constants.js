export default  {
  states: [
    {
      id: 1,
      name: 'in shelf'
    },
    {
      id: 4,
      name:  'borrowed'
    },
    {
      id: 6,
      name: 'others'
    }

  ],

  categories: [
    {
      id: 1,
      name: 'Arts'
    },
    {
      id: 2,
      name: 'Sciences'
    },
    {
      id: 3,
      name: 'Philosophy'
    },
    {
      id: 4,
      name: 'Business'
    },
    {
      id: 5,
      name: 'Engineering'
    },
    {
      id: 6,
      name: 'Others'
    }

  ],
  conditions: [
    {
      id: 1,
      name: 'New',

    },
    {
      id: 2,
      name: 'Used'
    }
  ],
  types: [
    {
      id: 1,
      name: 'books'
    },
    {
      id: 2,
      name: 'Audio CD'
    },
    {
      id: 3,
      name: 'DVD'
    },
     {
      id: 4,
      name: 'booklet'
    },
    {
      id: 5,
      name: 'Magazine'
    }
  ],
  formErrorStates:  {
    title: true,
    isbn: true,
    author: true,
    categories: true,
    itemState: false,
    numberInStock: false,
    type: false,
    description: false,
    conditions: true
    
  }

}