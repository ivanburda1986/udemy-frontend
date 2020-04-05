//Listen to submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  //Hide results
  document.getElementById('results').style.display = 'none';
  //Show loading
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

//Calculate results
function calculateResults(e) {
  console.log('Calculating...');
  //UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const montlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    montlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    //Display the lines with results  
    document.getElementById('results').style.display = 'block';

    //Hide the loading
    document.getElementById('loading').style.display = 'none';

  } else {
    showError('Please check your numbers');
  }
}

//Show error
function showError(error) {
  //Hide results
  document.getElementById('results').style.display = 'none';
  //Hide loading
  document.getElementById('loading').style.display = 'none';


  // Create a div
  const errorDiv = document.createElement('div');

  //Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class 
  errorDiv.className = 'alert alert-danger';

  //Create text node and append to the div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  //Clear error after 3 seconds
  setTimeout(clearError, 3000);

}


// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}