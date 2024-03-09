const percentages = {

A : 19.01,
B: 14.64,
C: 5.64,
D: 1.45,
E: 16.92,
F: 13.03,
G: 5.02,
H: 1.29,
I: 7.53,
J: 5.80,
K: 2.23,
L: 2.23,
M: 1.72

};

let per = 11

// Calculate absolute differences from percentage "per"
const differences = Object.entries(percentages).map(([key, value]) => ({
    key,
    difference: Math.abs(value - per)
}));

// Sort differences in ascending order
differences.sort((a, b) => a.difference - b.difference);

// Get the four closest percentages
const closestPercentages = differences.slice(0, 4).map(item => ({
    [item.key]: percentages[item.key]
}));

console.log(`Four closest percentages to ${per}%:`);
closestPercentages.forEach(item => console.log(item));
