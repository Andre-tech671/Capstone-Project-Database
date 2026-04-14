// Handle delete confirmation
document.querySelectorAll('.delete-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    if (!confirm('Are you sure you want to delete this book?')) {
      e.preventDefault();
    }
  });
});

// Set today's date as default for date_read field
const dateReadInput = document.getElementById('date_read');
if (dateReadInput && !dateReadInput.value) {
  const today = new Date().toISOString().split('T')[0];
  dateReadInput.value = today;
}

