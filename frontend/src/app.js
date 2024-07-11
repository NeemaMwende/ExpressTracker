document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const expenseForm = document.getElementById('expense-form');
    const editExpenseForm = document.getElementById('edit-expense-form');
    const expenseList = document.getElementById('expense-list');
    const userNameSpan = document.getElementById('user-name');

    let expenses = [];
    let currentUser = null;
    let currentExpenseId = null;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Perform login
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            currentUser = await response.json();
            userNameSpan.textContent = currentUser.username;
            window.location.href = '#dashboard';
            alert('Login successful');
            loadExpenses();
        } else {
            alert('Invalid username or password');
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        // Perform registration
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('New user created');
            window.location.href = '#home';
        } else {
            alert('Error creating user');
        }
    });

    expenseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('expense-name').value;
        const amount = document.getElementById('expense-amount').value;
        const category = document.getElementById('expense-category').value;
        const date = document.getElementById('expense-date').value;

        // Add new expense
        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`
            },
            body: JSON.stringify({ name, amount, category, date })
        });

        if (response.ok) {
            const expense = await response.json();
            expenses.push(expense);
            addExpenseToList(expense);
            alert('New expense added');
            window.location.href = '#dashboard';
        } else {
            alert('Error adding expense');
        }
    });

    editExpenseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('edit-expense-name').value;
        const amount = document.getElementById('edit-expense-amount').value;
        const category = document.getElementById('edit-expense-category').value;
        const date = document.getElementById('edit-expense-date').value;

        // Edit expense
        const response = await fetch(`/api/expenses/${currentExpenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`
            },
            body: JSON.stringify({ name, amount, category, date })
        });

        if (response.ok) {
            const updatedExpense = await response.json();
            const index = expenses.findIndex(exp => exp.id === updatedExpense.id);
            expenses[index] = updatedExpense;
            renderExpenses();
            alert('Expense updated');
            window.location.href = '#dashboard';
        } else {
            alert('Error updating expense');
        }
    });

    document.getElementById('add-expense-btn').addEventListener('click', () => {
        window.location.href = '#add-expense';
    });

    async function loadExpenses() {
        const response = await fetch('/api/expenses', {
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        });
        expenses = await response.json();
        renderExpenses();
    }

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(expense => addExpenseToList(expense));
    }

    function addExpenseToList(expense) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - $${expense.amount} - ${expense.category} - ${expense.date}
            <button class="view-expense-btn" data-id="${expense.id}">View</button>
        `;
        expenseList.appendChild(li);

        li.querySelector('.view-expense-btn').addEventListener('click', () => {
            viewExpense(expense.id);
        });
    }

    async function viewExpense(id) {
        currentExpenseId = id;
        const expense = expenses.find(exp => exp.id === id);
        document.getElementById('expense-details').innerHTML = `
            <p>Name: ${expense.name}</p>
            <p>Amount: ${expense.amount}</p>
            <p>Category: ${expense.category}</p>
            <p>Date: ${expense.date}</p>
        `;
        window.location.href = '#view-expense';
    }

    document.getElementById('edit-expense-btn').addEventListener('click', () => {
        const expense = expenses.find(exp => exp.id === currentExpenseId);
        document.getElementById('edit-expense-name').value = expense.name;
        document.getElementById('edit-expense-amount').value = expense.amount;
        document.getElementById('edit-expense-category').value = expense.category;
        document.getElementById('edit-expense-date').value = expense.date;
        window.location.href = '#edit-expense';
    });

    document.getElementById('delete-expense-btn').addEventListener('click', async () => {
        // Delete expense
        const response = await fetch(`/api/expenses/${currentExpenseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        });

        if (response.ok) {
            expenses = expenses.filter(exp => exp.id !== currentExpenseId);
            renderExpenses();
            alert('Expense deleted');
            window.location.href = '#dashboard';
        } else {
            alert('Error deleting expense');
        }
    });
});
