const groceryForm = document.getElementById("grocery-form");
const submitButton = document.getElementById("submit-button");
const groceryList = document.getElementById("grocery-list");
const clearList = document.getElementById("clear-btn");
const alert = document.querySelector(".alert");

var inputValue;

// ****** SELECT ITEMS **********

// edit option

// ****** EVENT LISTENERS **********

groceryForm.addEventListener("submit", AddItem)

// ****** FUNCTIONS **********
function LoadItems () {

}

function AddItem (e) {
	e.preventDefault();

	let randomHash = (Math.random() + 1).toString(36).substring(2) + (Math.random() + 1).toString(36).substring(2);

	inputValue = document.getElementById("grocery").value

	let itemElement = document.createElement("div");
	itemElement.classList.add("grocery-item")
	itemElement.id = `item-${randomHash}`


	itemElement.innerHTML = `
			<p class="title">${inputValue}</p>
			<div class="btn-container">
				<button class="edit-btn" id="edit-${randomHash}" type="button">
					<i class="fas fa-edit"></i>
				</button>
				<button class="delete-btn" id="delete-${randomHash}" type="button">
					<i class="fas fa-trash"></i>
				</button>
			</div>
	`

	const deleteBtn = itemElement.querySelector(`#delete-${randomHash}`);
	deleteBtn.addEventListener("click", RemoveItem);

	const editBtn = itemElement.querySelector(`#delete-${randomHash}`);
	editBtn.addEventListener("click", EditItem);

	groceryList.classList.add("show-container")
	clearList.classList.add("show-container")

	groceryList.appendChild(itemElement);

	ShowAlert("Adicionado item", "success", 1200);

	// document.querySelector(`#edit-${randomHash}`).addEventListener("click", EditItem);
	// document.querySelector(`#delete-${randomHash}`).addEventListener("click", RemoveItem);

}

function EditItem (e) {

}

function RemoveItem (e) {
	let elementHash = e.rangeParent.id.split("-")[1]
	let elementMain = document.getElementById(`item-${elementHash}`)

	elementMain.remove();
}

function RemoveAll () {

}

function ShowAlert (text, type, miliseconds) {
	alert.textContent = text;
	alert.classList.add(`alert-${type}`);
	// remove alert
	setTimeout(function () {
		alert.textContent = "";
		alert.classList.remove(`alert-${type}`);
	}, miliseconds);
}

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
