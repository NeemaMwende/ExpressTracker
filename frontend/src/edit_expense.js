document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const expenseId = params.get('id');
    const token = localStorage.getItem('token');

    fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('expense-id').value = data.id;
        document.getElementById('name').value = data.name;
        document.getElementById('amount').value = data.amount;
        document.getElementById('category').value = data.category;
        document.getElementById('date').value = data.date;
    });

    document.getElementById('edit-expense-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;

        fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, amount, category, date })
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                alert('Expense updated');
                window.location.href = 'index.html';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
