document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;

        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description, amount })
        });

        if (response.ok) {
            const expense = await response.json();
            addExpenseToList(expense);
        }
    });

    async function loadExpenses() {
        const response = await fetch('/api/expenses');
        const expenses = await response.json();
        expenses.forEach(expense => addExpenseToList(expense));
    }

    function addExpenseToList(expense) {
        const li = document.createElement('li');
        li.innerHTML = `${expense.description} - $${expense.amount}`;
        expenseList.appendChild(li);
    }

    loadExpenses();
});
