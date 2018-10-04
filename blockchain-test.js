const {getPosition, check, combine, containsArray} = require('./utils/helpers.js');

// Dialpad data structure
const dialpad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [null, 0, null]
]

// To start
let cursor = 0;
// cursor starting at 0
let output = [cursor.toString()];

// two steps in one direction followed by one step in the perpendicular direction
function tallL() {

  let results = [];
  let sendResults = [];

  output.forEach(item => {
    // get the location of the cursor
    let returnedNumbers = [];
    outerArray = getPosition(Number(item[item.length - 1]))[0];
    innerArray = getPosition(Number(item[item.length - 1]))[1];
    // Figure out which direction to move, checking all possibilities
    if (check(outerArray + 2, innerArray) && !check(outerArray - 2, innerArray) && check(outerArray, innerArray + 2) && !check(outerArray, innerArray - 2)) {
      // number is 1
      returnedNumbers.push(dialpad[outerArray + 2][innerArray + 1]);
      returnedNumbers.push(dialpad[outerArray + 1][innerArray + 2]);
    } else if (check(outerArray + 2, innerArray) && !check(outerArray - 2, innerArray) && !check(outerArray, innerArray + 2) && !check(outerArray, innerArray - 2)) {
      // number is 2
      returnedNumbers.push(dialpad[outerArray + 2][innerArray - 1]);
      returnedNumbers.push(dialpad[outerArray + 2][innerArray + 1]);
    } else if (check(outerArray + 2, innerArray) && !check(outerArray - 2, innerArray) && !check(outerArray, innerArray + 2) && check(outerArray, innerArray - 2)) {
      // number is 3
      returnedNumbers.push(dialpad[outerArray + 2][innerArray - 1]);
      returnedNumbers.push(dialpad[outerArray + 1][innerArray - 2]);
    } else if (!check(outerArray + 2, innerArray) && !check(outerArray - 2, innerArray) && check(outerArray, innerArray + 1) && !check(outerArray, innerArray - 2)) {
      // number is 4
      returnedNumbers.push(dialpad[outerArray + 2][innerArray + 1]);
      returnedNumbers.push(dialpad[outerArray + 1][innerArray + 2]);
      returnedNumbers.push(dialpad[outerArray - 1][innerArray + 2]);
    } else if (check(outerArray + 2, innerArray) && !check(outerArray - 2, innerArray) && !check(outerArray, innerArray + 2) && !check(outerArray, innerArray - 2)) {
        // number is 5 - do nothing
    } else if (!check(outerArray + 2, innerArray) && !check(outerArray - 2, innerArray) && !check(outerArray, innerArray + 2) && check(outerArray, innerArray - 2)) {
      // number is 6
      returnedNumbers.push(dialpad[outerArray + 2][innerArray - 1]);
      returnedNumbers.push(dialpad[outerArray + 1][innerArray - 2]);
      returnedNumbers.push(dialpad[outerArray - 1][innerArray - 2]);
    } else if (!check(outerArray + 2, innerArray) && check(outerArray - 2, innerArray) && check(outerArray, innerArray + 2) && !check(outerArray, innerArray - 2)) {
      // number is 7
      returnedNumbers.push(dialpad[outerArray - 2][innerArray + 1]);
      returnedNumbers.push(dialpad[outerArray - 1][innerArray + 2]);
    } else if (!check(outerArray + 2, innerArray) && check(outerArray - 2, innerArray) && !check(outerArray, innerArray + 2) && !check(outerArray, innerArray - 2)) {
        // number is 8
      returnedNumbers.push(dialpad[outerArray - 2][innerArray + 1]);
      returnedNumbers.push(dialpad[outerArray - 2][innerArray - 1]);
    } else if (!check(outerArray + 2, innerArray) && check(outerArray - 2, innerArray) && !check(outerArray, innerArray + 2) && check(outerArray, innerArray - 2)) {
      // number is 9
      returnedNumbers.push(dialpad[outerArray - 2][innerArray - 1]);
      returnedNumbers.push(dialpad[outerArray - 1][innerArray - 2]);
    } else if (!check(outerArray + 2, innerArray) && check(outerArray - 2, innerArray) && !check(outerArray, innerArray + 2) && !check(outerArray, innerArray - 2)) {
      // number is 0
      returnedNumbers.push(dialpad[outerArray - 2][innerArray - 1]);
      returnedNumbers.push(dialpad[outerArray - 2][innerArray + 1]);
    }
    if(!returnedNumbers.includes(null)) {
      results.push(combine(item, returnedNumbers));
    }

  });

  if (!containsArray(results)) {
    return results;
  } else {
    results.forEach((arr) => {
      arr.forEach((item) => {
        sendResults.push(item);
      })
    })
  }

  return sendResults;
}


function shortL() {

  let results = [];
  let sendResults = [];

  output.forEach(item => {
    let returnedNumbers = [];
    // Get the location of the number on the dialpad
    outerArray = getPosition(Number(item[item.length - 1]))[0];
    innerArray = getPosition(Number(item[item.length -1]))[1];

    // series of test to see which direction the cursor can move
    if (check(outerArray + 1, innerArray) && check(outerArray - 1, innerArray) && check(outerArray, innerArray + 1) && check(outerArray, innerArray - 1)) {
      // number is 5 or 8
      if (dialpad[outerArray][innerArray] === 8) {
        // number is 8
        returnedNumbers.push(dialpad[outerArray - 1][innerArray - 1]);
        returnedNumbers.push(dialpad[outerArray - 1][innerArray + 1]);
      } else {
        //number is 5
        returnedNumbers.push(dialpad[outerArray + 1][innerArray + 1]);
        returnedNumbers.push(dialpad[outerArray - 1][innerArray - 1]);
        returnedNumbers.push(dialpad[outerArray + 1][innerArray - 1]);
        returnedNumbers.push(dialpad[outerArray - 1][innerArray + 1]);
      }
    } else if (check(outerArray + 1, innerArray) && !check(outerArray - 1, innerArray) && check(outerArray, innerArray + 1) && !check(outerArray, innerArray - 1)) {
      // number is 1
      returnedNumbers.push(dialpad[outerArray + 1][innerArray + 1]);
    } else if (check(outerArray + 1, innerArray) && !check(outerArray - 1, innerArray) && check(outerArray, innerArray + 1) && check(outerArray, innerArray - 1)) {
      // number is 2
      returnedNumbers.push(dialpad[outerArray + 1][innerArray - 1]);
      returnedNumbers.push(dialpad[outerArray + 1][innerArray + 1]);
    } else if (check(outerArray + 1, innerArray) && !check(outerArray - 1, innerArray) && !check(outerArray, innerArray + 1) && check(outerArray, innerArray - 1)) {
      // number is 3
      returnedNumbers.push(dialpad[outerArray + 1][innerArray - 1]);
    } else if (check(outerArray + 1, innerArray) && check(outerArray - 1, innerArray) && check(outerArray, innerArray + 1) && !check(outerArray, innerArray - 1)) {
      // number is 4
      returnedNumbers.push(dialpad[outerArray - 1][innerArray + 1]);
      returnedNumbers.push(dialpad[outerArray + 1][innerArray + 1]);
    } else if (check(outerArray + 1, innerArray) && check(outerArray - 1, innerArray) && !check(outerArray, innerArray + 1) && check(outerArray, innerArray - 1)) {
      // number is 6
      returnedNumbers.push(dialpad[outerArray - 1][innerArray - 1]);
      returnedNumbers.push(dialpad[outerArray + 1][innerArray - 1]);
    } else if (!check(outerArray + 1, innerArray) && check(outerArray - 1, innerArray) && check(outerArray, innerArray + 1) && !check(outerArray, innerArray - 1)) {
      // number is 7
      returnedNumbers.push(dialpad[outerArray - 1][innerArray + 1]);
      returnedNumbers.push(dialpad[outerArray + 1][innerArray + 1]);
    } else if (!check(outerArray + 1, innerArray) && check(outerArray - 1, innerArray) && !check(outerArray, innerArray + 1) && check(outerArray, innerArray - 1)) {
      // number is 9
      returnedNumbers.push(dialpad[outerArray - 1][innerArray - 1]);
      returnedNumbers.push(dialpad[outerArray + 1][innerArray - 1]);
    } else if (!check(outerArray + 1, innerArray) && check(outerArray - 1, innerArray) && !check(outerArray, innerArray + 1) && !check(outerArray, innerArray - 1)) {
      // number is 0
      returnedNumbers.push(dialpad[outerArray - 1][innerArray - 1]);
      returnedNumbers.push(dialpad[outerArray - 1][innerArray + 1]);
    }
    // combine item and returnedNumbers
    results.push(combine(item, returnedNumbers));

  });

  if (output.length === 1 || !containsArray(results)) {
    return results;
  } else {
    results.forEach((arr) => {
      arr.forEach((item) => {
        sendResults.push(item);
      })
    })
  }

  return sendResults;
}

// Cycles through the TallL and the two ShortLs
function cycle(n) {
  let count = 1;
  let results;
  let updatedResults;
  while (count < n) {

    // Call Tall L
    output = tallL();

    //// increase count and check the inputed amount
    count++;
    if (n % 3 === 2 && count === n ) { break; }

    // Call First Short L
    output = shortL();
    // increase count and check the inputed amount
    count++;
    if (n % 3 === 0 && count === n) { break; }

    // Call Second Short L
    output = shortL();

    // increase count
    count++
  }
}

// Call the program with command line argument
cycle(Number(process.argv[2]));

// Output to console
console.log(`There are ${output.length} qualifying ${process.argv[2]}-digit numbers.`)
console.log(output);
console.log(output.length);
