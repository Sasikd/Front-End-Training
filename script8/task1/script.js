const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseType = document.getElementById('expense-type');
const expenseAmount = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');
const searchExpenses = document.getElementById('search-expenses');
const filterType = document.getElementById('filter-type');
const filterTime = document.getElementById('filter-time');

let expenses = [];
let total = 0;

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const type = expenseType.value;
    const amount = parseFloat(expenseAmount.value);
    const date = new Date();

    if (name === '' || type === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter valid details.');
        return;
    }

    const expense = { id: Date.now(), name, type, amount, date };
    expenses.push(expense);

    updateExpenses();

    // Clear inputs
    expenseName.value = '';
    expenseType.value = '';
    expenseAmount.value = '';
});

function updateExpenses(filteredExpenses = expenses) {
    expenseList.innerHTML = '';
    total = 0;

    filteredExpenses.forEach(expense => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${expense.name} (${expense.type}) <span class="badge bg-primary rounded-pill">$${expense.amount.toFixed(2)}</span>
            <button class="btn btn-danger btn-sm delete-expense" data-id="${expense.id}">Delete</button>
            <button class="btn btn-warning btn-sm edit-expense" data-id="${expense.id}">Edit</button>
        `;
        expenseList.appendChild(li);

        total += expense.amount;
    });

    totalAmount.textContent = total.toFixed(2);
}

expenseList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-expense')) {
        const id = parseInt(event.target.dataset.id);
        expenses = expenses.filter(expense => expense.id !== id);
        updateExpenses();
    }

    if (event.target.classList.contains('edit-expense')) {
        const id = parseInt(event.target.dataset.id);
        const expense = expenses.find(exp => exp.id === id);

        expenseName.value = expense.name;
        expenseType.value = expense.type;
        expenseAmount.value = expense.amount;

        expenses = expenses.filter(expense => expense.id !== id);
        updateExpenses();
    }
});

searchExpenses.addEventListener('input', function() {
    const query = searchExpenses.value.toLowerCase();
    const filteredExpenses = expenses.filter(expense => expense.name.toLowerCase().includes(query));
    updateExpenses(filteredExpenses);
});

filterType.addEventListener('change', function() {
    const type = filterType.value;
    const filteredExpenses = type ? expenses.filter(expense => expense.type === type) : expenses;
    updateExpenses(filteredExpenses);
});

filterTime.addEventListener('change', function() {
    const now = new Date();
    let filteredExpenses;

    switch (filterTime.value) {
        case 'week':
            filteredExpenses = expenses.filter(expense => (now - expense.date) <= 7 * 24 * 60 * 60 * 1000);
            break;
        case 'month':
            filteredExpenses = expenses.filter(expense => (now - expense.date) <= 30 * 24 * 60 * 60 * 1000);
            break;
        case 'six-months':
            filteredExpenses = expenses.filter(expense => (now - expense.date) <= 6 * 30 * 24 * 60 * 60 * 1000);
            break;
        case 'year':
            filteredExpenses = expenses.filter(expense => (now - expense.date) <= 365 * 24 * 60 * 60 * 1000);
            break;
        default:
            filteredExpenses = expenses;
    }

    updateExpenses(filteredExpenses);
});
