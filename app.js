const groceryForm = document.getElementById("grocery-form");
const submitButton = document.getElementById("submit-button");
const groceryList = document.getElementById("grocery-list");
const clearList = document.getElementById("clear-btn");
const alert = document.querySelector(".alert");

const baseMilisecondsForAlerts = 1200;
var inputValue;

// ****** SELECT ITEMS **********

// edit option

// ****** EVENT LISTENERS **********

groceryForm.addEventListener("submit", AddItem)
clearList.addEventListener("click", RemoveAll)

// ****** FUNCTIONS **********
function LoadItems () {

}

function AddItem (e) {
	e.preventDefault();

	inputValue = document.getElementById("grocery").value

	if (inputValue == "") {
		ShowAlert("Digite um valor válido", "danger", baseMilisecondsForAlerts);
		return;
	}

	let randomHash = (Math.random() + 1).toString(36).substring(2) + (Math.random() + 1).toString(36).substring(2);

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

	groceryList.classList.add("show-container");
	clearList.classList.add("show-container");

	groceryList.appendChild(itemElement);

	document.getElementById("grocery").value = "";

	ShowAlert("Item adicionado", "success", baseMilisecondsForAlerts);
}

function EditItem (e) {

}

function RemoveItem (e) {
	let elementHash = e.rangeParent.id.split("-")[1]
	let elementMain = document.getElementById(`item-${elementHash}`)

	elementMain.remove();

	let itemsList = document.getElementById("grocery-list").children

	if (itemsList.length == 0) {
		groceryList.classList.remove("show-container");
		clearList.classList.remove("show-container");
	}

	ShowAlert("Item removido", "danger", baseMilisecondsForAlerts);
}

function RemoveAll () {
	let itemsList = document.getElementById("grocery-list").children

	if (itemsList.length == 0)
		return;

	Array.from(itemsList).forEach(child => {
		child.remove();
	});

	groceryList.classList.remove("show-container");
	clearList.classList.remove("show-container");

	ShowAlert("Itens removidos", "danger", baseMilisecondsForAlerts);
}

function ShowAlert (text, type, miliseconds) {
	alert.textContent = text;
	alert.classList.add(`alert-${type}`);
	// remove alert
	setTimeout(function () {
		alert.classList.remove(`alert-${type}`);
		//alert.textContent = "";
	}, miliseconds);

	setTimeout(function () {
		alert.textContent = "";
	}, miliseconds * 2);
}

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
