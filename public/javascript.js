/*<script>
  document.getElementById('callbackForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting

    const form = e.target;
    const inputs = form.querySelectorAll('input');
    let allFilled = true;

    inputs.forEach(input => {
      if (input.value.trim() === '') {
        allFilled = false;
        input.style.border = '2px solid red'; // Highlight the empty field
      } else {
        input.style.border = ''; // Reset style if filled
      }
    });

    if (!allFilled) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    // If all fields are filled, submit the form (via JS or actual submit)
    form.submit(); // or use AJAX to post data
  });
</script>*/