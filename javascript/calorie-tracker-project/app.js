//Storage controller

//Item controller
const ItemCtrl = (function () {
  //Item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data structure / State
  const data = {
    items: [
      // {
      //   id: 0,
      //   name: "Steak dinner",
      //   calories: 1200,
      // },
      // {
      //   id: 1,
      //   name: "Coookie",
      //   calories: 400,
      // },
      // {
      //   id: 2,
      //   name: "Eggs",
      //   calories: 300,
      // },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  //Public methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      //Create an item ID
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Calories to number
      calories = parseInt(calories);

      //Create a new item
      newItem = new Item(ID, name, calories);
      //Add the new item to the items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function (id) {
      let found = null;
      //Loop through the items
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },

    getTotalCalories: function () {
      let total = 0;
      //Loop through all items and add the calories of each of them to the total
      data.items.forEach(function (item) {
        total += item.calories;
      });
      //Update the data object with the current number of total calories
      data.totalCalories = total;

      //Return total
      return data.totalCalories;
    },
    logData: function () {
      return data;
    },
  };
})();

//UI controller
const UICtrl = (function () {
  //UI selectors - object
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };

  //Public methods
  return {
    populateItemList: function (items) {
      let html = ``;
      items.forEach(function (item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      </li>`;
      });

      //Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem: function (item) {
      //Show the list of added meals
      document.querySelector(UISelectors.itemList).style.display = "block";

      //Create <li> element
      const li = document.createElement("li");
      //Add class
      li.className = "collection-item";
      //Add id
      li.id = `item-${item.id}`;

      //Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} calories</em>
      <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
      //Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: function () {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },

    getSelectors: function () {
      return UISelectors;
    },
  };
})();

//App controller
const App = (function (ItemCtrl, UICtrl) {
  //Load event listeners
  const loadEventListeners = function () {
    //Use the puglic method of UICtrl to get available UI selector for further re-use in the App controller here
    const UISelectors = UICtrl.getSelectors();

    //Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    //Edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);
  };

  //Add item submit
  const itemAddSubmit = function (e) {
    //Get form input from UI controller
    const input = UICtrl.getItemInput();

    //Check for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      //Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      //Add item to the UI list
      UICtrl.addListItem(newItem);

      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Add total calories to the UI
      UICtrl.showTotalCalories(totalCalories);

      //Clear the input fields for name and calories after a meal is added
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  //Click edit item
  const itemEditClick = function (e) {
    if (e.target.classList.contains("edit-item")) {
      //Get the list item id
      const listId = e.target.parentNode.parentNode.id;

      //Break into an array
      const listIdaArr = listId.split("-");

      //Get the actual id
      const id = parseInt(listIdaArr[1]);

      //Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      //Set the current item
      ItemCtrl.setCurrentItem(itemToEdit);

      //Add item to the form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };

  //Public methods
  return {
    init: function () {
      //Set initial state of buttons
      UICtrl.clearEditState();

      //Fetch items from data structure
      const items = ItemCtrl.getItems();

      //Check the number of items. If there are none then hide the list, so the the top line is not displayed
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //Populate list with items
        UICtrl.populateItemList(items);
      }

      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Add total calories to the UI
      UICtrl.showTotalCalories(totalCalories);

      //Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

//Initialize app
App.init();
