document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }

    document.getElementById('username').textContent = localStorage.getItem('username');

    document.getElementById('add-expense-btn').addEventListener('click', () => {
        window.location.href = 'add_expense.html';
    });

    fetch('http://localhost:5000/api/expenses', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const expenseList = document.getElementById('expense-list');
        data.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${expense.name}</h3>
                <p>Amount: ${expense.amount}</p>
                <p>Category: ${expense.category}</p>
                <p>Date: ${expense.date}</p>
                <button onclick="editExpense(${expense.id})">Edit</button>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    });
});

function editExpense(id) {
    window.location.href = `edit_expense.html?id=${id}`;
}

function deleteExpense(id) {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        alert('Expense deleted');
        window.location.reload();
    });
}
