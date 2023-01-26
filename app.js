const groceryForm = document.getElementById("grocery-form");
const groceryInput = document.getElementById("grocery");
const submitButton = document.getElementById("submit-button");
const groceryList = document.getElementById("grocery-list");
const clearList = document.getElementById("clear-btn");
const alert = document.querySelector(".alert");

const baseMilisecondsForAlerts = 1200;
var inputValue;
var hashCurrent;

// ****** SELECT ITEMS **********

// edit option

// ****** EVENT LISTENERS **********

groceryForm.addEventListener("submit", OnSendItemClick)
clearList.addEventListener("click", OnRemoveAllClick)

// ****** FUNCTIONS **********
function LoadItems () {

}

function OnSendItemClick (e) {
	e.preventDefault();

	inputValue = document.getElementById("grocery").value

	if (inputValue == "") {
		ShowAlert("Digite um valor válido", "danger", baseMilisecondsForAlerts);
		return;
	}

	if (hashCurrent == "" || hashCurrent == undefined)
		AddItem(inputValue);
	else
		EditItem(inputValue);
}

function AddItem (inputValue) {
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
	deleteBtn.addEventListener("click", OnRemoveClick);

	const editBtn = itemElement.querySelector(`#edit-${randomHash}`);
	editBtn.addEventListener("click", OnEditClick);

	groceryList.classList.add("show-container");
	clearList.classList.add("show-container");

	groceryList.appendChild(itemElement);

	document.getElementById("grocery").value = "";

	ShowAlert("Item adicionado", "success", baseMilisecondsForAlerts);
}

function EditItem (inputValue) {
	let elementMain = document.getElementById(`item-${hashCurrent}`).getElementsByClassName("title")[0];

	elementMain.innerText = groceryInput.value;
	hashCurrent == "";
	groceryInput.value = "";

	ShowAlert("Item alterado", "success", baseMilisecondsForAlerts);
}

function OnEditClick (e) {
	hashCurrent = e.rangeParent.id.split("-")[1]
	let elementMain = document.getElementById(`item-${hashCurrent}`).getElementsByClassName("title")[0];

	groceryInput.value = elementMain.innerText;
}

function OnRemoveClick (e) {
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

function OnRemoveAllClick () {
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

	setTimeout(function () {
		alert.classList.remove(`alert-${type}`);
		//alert.textContent = "";
	}, miliseconds);

	setTimeout(function () {
		alert.textContent = "";
	}, miliseconds + 400);
}

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
