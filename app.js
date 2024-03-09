// Ask the user for match data
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Enter data for the match");
rl.question("Home team's average goal rate: ", (lambda_value) => {
  rl.question("Away team's average goal rate: ", (mu_value) => {


    // Calculate the probability of a goal for each team
    const prob_home = {};
    const prob_away = {};
    for (let i = 0; i < 10; i++) {
      prob_home[i] = Math.exp(-lambda_value) * Math.pow(lambda_value, i) / factorial(i);
      prob_away[i] = Math.exp(-mu_value) * Math.pow(mu_value, i) / factorial(i);
    }

    // Display the probability for each possible home team score
    console.log("\nProbabilities for the home team");
    for (let i = 0; i < 10; i++) {
      console.log(`Score ${i}: ${(prob_home[i] * 100).toFixed(2)}%`);
    }

    let max1 = Math.max(...Object.values(prob_home))
    console.log(`max value is: ${(max1 * 100).toFixed(2)}%`)

    // Display the probability for each possible away team score
    console.log("\nProbabilities for the away team");
    for (let j = 0; j < 10; j++) {
      console.log(`Score ${j}: ${(prob_away[j] * 100).toFixed(2)}%`);
    }

    let max2 = Math.max(...Object.values(prob_away))
    console.log("max value is: ", (max2 * 100).toFixed(2) + "%")

    // Calculate the probability of each possible result
    const prob_result = {};
    for (let i = 0; i < 10; i++) {
      prob_result[i] = {};
      for (let j = 0; j < 10; j++) {
        prob_result[i][j] = prob_home[i] * prob_away[j];
      }
    }

    // Display the probability for each possible result
    console.log("\nProbabilities for each possible result");
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        console.log(`Result ${i}-${j}: ${(prob_result[i][j] * 100).toFixed(2)}%`);
      }
    }




    // calculate the closest percentage 
    let perfin = ((max1 + max2)/9 * 100).toFixed(2)

    const differences = Object.entries(prob_result).map(([key, value]) => ({
      key,
      difference : Math.abs(value - perfin)
    }));
    
    differences.sort((a,b) => a.difference - b.difference);

    const closestPercentages = differences.slice(0, 4).map(item => ({
      [item.key]: prob_result[item.key]
  }));

  console.log(`Four closest percentages to ${perfin}%:`);
  closestPercentages.forEach(item => console.log(item));




    rl.close();
  });
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
