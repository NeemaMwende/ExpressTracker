document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const tableBody = document.querySelector('#expense-table tbody');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = form.name.value;
        const amount = form.amount.value;
        const category = form.category.value;
        const date = form.date.value;
        const createdAt = new Date().toLocaleString();
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${amount}</td>
            <td>${category}</td>
            <td>${date}</td>
            <td>${createdAt}</td>
        `;
        
        tableBody.appendChild(newRow);
        
        form.reset();
    });
});
