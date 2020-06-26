//Storage controller

//Item controller
const ItemCtrl = (function () {
  //Item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data structure / State
  const data = {
    items: [{
        id: 0,
        name: 'Steak dinner',
        calories: 1200
      },
      {
        id: 1,
        name: 'Coookie',
        calories: 400
      },
      {
        id: 2,
        name: 'Eggs',
        calories: 300
      }
    ],
    currentItem: null,
    totalCalories: 0
  }


  //Public methods
  return {
    logData: function () {
      return data;
    }
  }

})();

//UI controller
const UICtrl = (function () {

  //Public methods

})();

//App controller
const App = (function (ItemCtrl, UICtrl) {

  //Public methods
  return {
    init: function () {
      console.log('Initializing the app...');
    }
  }

})(ItemCtrl, UICtrl);


//Initialize app
App.init();