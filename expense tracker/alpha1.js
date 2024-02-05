//1
const balance = document.getElementById(
  "balance"
);
const money_plus = document.getElementById(
  "money-plus"
);
const money_minus = document.getElementById(
  "money-minus"
);
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

// let transactions = dummyTransactions;

//last 
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//5
//Add Transaction
function addTransaction(e){
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert('please add text and amount')
  }else{
    const transaction = {
      id:generateID(),
      text:text.value,
      amount:+amount.value
    }

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value='';
    amount.value='';
  }
}


//5.5
//Generate Random ID
function generateID(){
  return Math.floor(Math.random()*1000000000);
}

//2

//Add Trasactions to DOM list
function addTransactionDOM(transaction) {
  //GET sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  //Add Class Based on Value
  item.classList.add(
    transaction.amount < 0 ? "minus" : "plus"
  );

  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(
  transaction.amount
  )}</span>
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">Delete</button>
  <button class="edit-btn" onclick="editTransaction(${transaction.id})">Edit</button>
  `;


  list.appendChild(item);
}

//4

//Update the balance income and expence
function updateValues() {
  const amounts = transactions.map(
    (transaction) => transaction.amount
  );
  const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense =
    (amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) *
    -1).toFixed(2);

    balance.innerText=`$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}


//6 

//Remove Transaction by ID
function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  Init();
}
//last
//update Local Storage Transaction
function updateLocalStorage(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}

//3

//Init App
function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

Init();

form.addEventListener('submit',addTransaction);
//Edit
function editTransaction(id) {
  const transactionIndex = transactions.findIndex(transaction => transaction.id === id);
  if (transactionIndex !== -1) {
    const editedText = prompt("Edit transaction text:", transactions[transactionIndex].text);
    const editedAmount = prompt("Edit transaction amount:", transactions[transactionIndex].amount);

    if (editedText !== null && editedAmount !== null) {
      transactions[transactionIndex].text = editedText;
      transactions[transactionIndex].amount = +editedAmount;

      updateLocalStorage();
      Init();
    }
  }
}
