// JavaScript code to handle form submission and calculations
const matchForm = document.getElementById('matchForm');
const resultContainer = document.getElementById('resultContainer');

matchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const homeGoalRate = parseFloat(document.getElementById('homeGoalRate').value);
    const awayGoalRate = parseFloat(document.getElementById('awayGoalRate').value);

    // Calculate the probability of a goal for each team
    const prob_home = {};
    const prob_away = {};
    for (let i = 0; i < 10; i++) {
        prob_home[i] = Math.exp(-homeGoalRate) * Math.pow(homeGoalRate, i) / factorial(i);
        prob_away[i] = Math.exp(-awayGoalRate) * Math.pow(awayGoalRate, i) / factorial(i);
    }

    // Display the probability for each possible home team score
    let homeResults = "<h2>Probabilities for the home team</h2>";
    for (let i = 0; i < 10; i++) {
        homeResults += `<p>Score ${i}: ${(prob_home[i] * 100).toFixed(2)}%</p>`;
    }

    // Find the maximum probability for the home team
    let max1 = Math.max(...Object.values(prob_home));
    homeResults += `<p>Max probability for the home team: ${(max1 * 100).toFixed(2)}%</p>`;

    // Display the probability for each possible away team score
    let awayResults = "<h2>Probabilities for the away team</h2>";
    for (let j = 0; j < 10; j++) {
        awayResults += `<p>Score ${j}: ${(prob_away[j] * 100).toFixed(2)}%</p>`;
    }

    // Find the maximum probability for the away team
    let max2 = Math.max(...Object.values(prob_away));
    awayResults += `<p>Max probability for the away team: ${(max2 * 100).toFixed(2)}%</p>`;

    // Append results to the result container
    resultContainer.innerHTML = homeResults + awayResults;

    // Calculate the average of the maximum probabilities
    let perfin = ((max1 + max2) / 2 * 100).toFixed(2);
    resultContainer.innerHTML += `<p>Average of maximum probabilities: ${perfin}%</p>`;

    // Calculate the probabilities for each possible result
    const prob_result = {};
    for (let i = 0; i < 10; i++) {
        prob_result[i] = {};
        for (let j = 0; j < 10; j++) {
            prob_result[i][j] = prob_home[i] * prob_away[j];
        }
    }

    // Display the joint probabilities for each possible result
    let jointResults = "<h2>Joint Probabilities</h2>";
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            jointResults += `<p>Score: ${i} - ${j}: ${(prob_result[i][j] * 100).toFixed(2)}%</p>`;
        }
    }
    resultContainer.innerHTML += jointResults;
});

// Function to calculate factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
