const groceryForm = document.getElementById("grocery-form");
const groceryInput = document.getElementById("grocery");
const submitButton = document.getElementById("submit-button");
const groceryList = document.getElementById("grocery-list");
const clearList = document.getElementById("clear-btn");
const alert = document.querySelector(".alert");

const baseMilisecondsForAlerts = 1200;
let hashCurrent;
let itemsList = [];

// ****** EVENT LISTENERS **********
self.addEventListener("load", OnPageLoad);
groceryForm.addEventListener("submit", OnSendItemClick);
clearList.addEventListener("click", OnRemoveAllClick);

// ****** FUNCTIONS **********
//    **** EVENTS ****      //
function OnPageLoad (e) {
	LoadItems();
	groceryInput.value = "";
}

function OnSendItemClick (e) {
	e.preventDefault();

	if (groceryInput.value == "") {
		ShowAlert("Digite um valor válido", "danger", baseMilisecondsForAlerts);
		return;
	}

	if (hashCurrent == "" || hashCurrent == undefined)
		AddItem(groceryInput.value);
	else
		EditItem(groceryInput.value);
}

function OnEditClick (e) {
	if (hashCurrent != "" && hashCurrent != undefined)
		SetSelection(hashCurrent, false);

	hashCurrent = this.id.split("-")[1];
	let elementMain = document
		.getElementById(`item-${hashCurrent}`)
		.getElementsByClassName("title")[0];

	SetSelection(hashCurrent, true);

	submitButton.textContent = "Editar";
	groceryInput.value = elementMain.innerText;
}

function OnRemoveClick (e) {
	if (hashCurrent != "" && hashCurrent != undefined) {
		SetSelection(hashCurrent, false);

		hashCurrent = "";
		groceryInput.value = "";
		submitButton.textContent = "Enviar";
	}

	let elementHash = this.id.split("-")[1];
	let elementMain = document.getElementById(`item-${elementHash}`);
	let elementValue = document
		.getElementById(`item-${elementHash}`)
		.getElementsByClassName("title")[0];

	elementMain.remove();

	let tempDelete = {
		hash: elementHash,
		value: elementValue.textContent,
	};


	RemoveItemFromList(tempDelete);

	if (itemsList.length == 0) {
		groceryList.classList.remove("show-container");
		clearList.classList.remove("show-container");
	}

	SetLocalStorage();

	ShowAlert("Item removido", "danger", baseMilisecondsForAlerts);
}

function OnRemoveAllClick () {
	if (groceryList.children.length == 0) return;

	Array.from(groceryList.children).forEach((child) => {
		child.remove();
	});

	groceryList.classList.remove("show-container");
	clearList.classList.remove("show-container");

	itemsList.length = 0;
	SetLocalStorage();

	ShowAlert("Itens removidos", "danger", baseMilisecondsForAlerts);
}

//     **** AUXS ****       //
function LoadItems () {
	let storedItems = GetLocalStorage();

	if (
		storedItems == "" ||
		storedItems == undefined ||
		JSON.parse(storedItems).length == 0
	)
		return;

	console.log(JSON.parse(storedItems));
	itemsList = JSON.parse(storedItems);

	itemsList.forEach((item) => {
		IncludeItemOnPage(item.hash, item.value);
	});
}

function AddItem (inputValue) {
	let randomHash = GetRandomHash();

	IncludeItemOnPage(randomHash, inputValue);

	groceryInput.value = "";

	let tempAdd = {
		hash: randomHash,
		value: inputValue
	};

	itemsList.push(tempAdd);

	SetLocalStorage();

	ShowAlert("Item adicionado", "success", baseMilisecondsForAlerts);
}

function IncludeItemOnPage (hash, value) {
	let itemElement = document.createElement("div");
	itemElement.classList.add("grocery-item");
	itemElement.id = `item-${hash}`;

	itemElement.innerHTML = `
			<p class="title">${value}</p>
			<div class="btn-container">
				<button class="edit-btn" id="edit-${hash}" type="button">
					<i class="fas fa-edit"></i>
				</button>
				<button class="delete-btn" id="delete-${hash}" type="button">
					<i class="fas fa-trash"></i>
				</button>
			</div>
	`;

	const deleteBtn = itemElement.querySelector(`#delete-${hash}`);
	deleteBtn.addEventListener("click", OnRemoveClick);

	const editBtn = itemElement.querySelector(`#edit-${hash}`);
	editBtn.addEventListener("click", OnEditClick);

	groceryList.classList.add("show-container");
	clearList.classList.add("show-container");

	groceryList.appendChild(itemElement);
}

function EditItem (inputValue) {
	let elementMain = document
		.getElementById(`item-${hashCurrent}`)
		.getElementsByClassName("title")[0];

	elementMain.innerText = inputValue;

	SetSelection(hashCurrent, false);

	let tempEdit = {
		hash: hashCurrent,
		value: inputValue,
	};
	EditItemOnList(tempEdit);

	this.hashCurrent = "";
	groceryInput.value = "";
	submitButton.textContent = "Enviar";

	SetLocalStorage();
	ShowAlert("Item alterado", "success", baseMilisecondsForAlerts);
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

function GetRandomHash () {
	return (
		(Math.random() + 1).toString(36).substring(2) +
		(Math.random() + 1).toString(36).substring(2)
	);
}

function SetSelection (hash, willAdd) {
	if (willAdd)
		document.getElementById(`item-${hash}`).classList.add("selected-item");
	else
		document.getElementById(`item-${hash}`).classList.remove("selected-item");
}

// ****** LOCAL STORAGE **********

function SetLocalStorage () {
	localStorage.setItem("items", JSON.stringify(itemsList));
	//[{ "id": "1223fdsfd3", "valor": 10 }, { "id": "1223fdsf483", "valor": 55 }]
}

function GetLocalStorage () {
	return localStorage.items;
}

// ****** SETUP ITEMS **********

function RemoveItemFromList (itemRemove) {
	let tempList = [];

	itemsList.forEach((item) => {
		if (item.hash != itemRemove.hash) tempList.push(item);
	});

	itemsList = tempList;
}

function EditItemOnList (itemEdit) {
	let tempList = [];

	itemsList.forEach((item) => {
		if (item.hash == itemEdit.hash) item.value = itemEdit.value;

		tempList.push(item);
	});

	itemsList = tempList;
}
