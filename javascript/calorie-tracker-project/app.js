//Storage controller

//Item controller
const ItemCtrl = (function () {
  //Item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data structure (State)
  const data = {
    items: [{
        id: 0,
        name: 'Steak Dinner',
        calories: 1200
      },
      {
        id: 1,
        name: 'Cookie',
        calories: 400
      },
      {
        id: 2,
        name: 'Eggs',
        calories: 300
      },
    ],
    currentItem: null,
    totalCalories: 0
  }

  //Publick methods
  return {
    getItems: function () {
      return data.items;
    },
    logData: function () {
      return data;
    }
  }
})();


//UI controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list'
  }


  //Publick methods
  return {
    populateItemList: function (items) {
      let html = '';
      items.forEach(function (item) {
        html += `
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
        </li>
        `;
      });

      //Insert list items 
      document.querySelector(UISelectors.itemList).innerHTML = html;
    }
  }

})();



//App controller - contains anything which should run when the app launches
const App = (function (ItemCtrl, UICtrl) {

  //Public methods
  return {
    init: function () {
      //Fetch items from data structure
      const items = ItemCtrl.getItems();

      //Populate list with items
      UICtrl.populateItemList(items);
    }
  }

})(ItemCtrl, UICtrl);

//Innitialize app
App.init();