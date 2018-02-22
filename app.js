document.querySelector('#loan-form').addEventListener('submit', function(e) {
  document.querySelector('#results').style.display = 'none';
  document.querySelector('#loading').style.display = 'block';
  setTimeout(calculateLoan, 2000);
  e.preventDefault();
});

function calculateLoan() {
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthyPayment = document.querySelector('#monthy-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInteres = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInteres, calculatedPayments);
  const monthly = principal * x * calculatedInteres / (x - 1);

  if (isFinite(monthly)) {
    monthyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    document.querySelector('#results').style.display = 'block';
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Please choose the numbers');
    document.querySelector('#loading').style.display = 'none';
  }
}

function showError(error) {
  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
