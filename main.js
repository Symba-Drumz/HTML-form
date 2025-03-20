
// Array to store shopping list items
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// DOM elements
const addItemForm = document.getElementById('add-item-form');
const itemInput = document.getElementById('item-input');
const shoppingListContainer = document.getElementById('shopping-list');
const clearListButton = document.getElementById('clear-list');

// Function to render the shopping list
function renderShoppingList() {
  shoppingListContainer.innerHTML = '';         //It ensures the list is refreshed every time the function is called.
  shoppingList.forEach((item, index) => {      //For each item, it creates a new <li> element and adds it to the list.
    const li = document.createElement('li');   //A new <li> element is created for each item.
    li.textContent = item.text;                //The text of the item (item.text) is added to the <li>
    if (item.purchased) {
      li.classList.add('purchased');
    }

    // Add click event to mark as purchased
    //When a list item is clicked, its purchased status is toggled (true becomes false, and vice versa).

    li.addEventListener('click', () => {
      shoppingList[index].purchased = !shoppingList[index].purchased;
      saveToLocalStorage();
      renderShoppingList();
    });

    // Add double-click event to edit items (bonus feature)
    //When a list item is double-clicked, a prompt appears allowing the user to edit the item's text.
    li.addEventListener('dblclick', () => {
      const newText = prompt('Edit item:', item.text);
      if (newText !== null && newText.trim() !== '') {
        shoppingList[index].text = newText.trim();
        saveToLocalStorage();
        renderShoppingList();
      }
    });

    shoppingListContainer.appendChild(li);
  });
}

// Add new item to the list
//itemInput.value: Gets the text the user typed into the input field.
//.trim(): Removes any extra spaces at the beginning or end of the text.
//The result is stored in the variable newItemText.
//shoppingList.push({ text: newItemText, purchased: false })
//Adds a new item to the shoppingList array.
//The new item is an object with two properties:
//text: The text of the item (e.g., "Books").
//purchased: A boolean (false by default) to track whether the item has been purchased.

addItemForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission
  const newItemText = itemInput.value.trim();
  if (newItemText) {
    shoppingList.push({ text: newItemText, purchased: false });
    saveToLocalStorage();
    renderShoppingList();
    itemInput.value = ''; // Clear the input field
  }
});

// Clear the entire list
clearListButton.addEventListener('click', () => {
  shoppingList = [];
  saveToLocalStorage();
  renderShoppingList();
});

// Save the list to local storage
//localStorage.setItem('shoppingList', JSON.stringify(shoppingList)); saves the shopping list to the browser’s local storage.
//It ensures the list persists even after the page is refreshed or closed.
//To retrieve the data, use localStorage.getItem() and JSON.parse().
function saveToLocalStorage() {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Initial render of the shopping list
renderShoppingList();
