const {getPosition, check, combine, combineMany} = require('./utils/helpers.js');

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
  let returnedNumbers = [];
  let corner = false;
  let movedVertically = false;

  output.forEach(item => {
    // get the location of the cursor
    outerArray = getPosition(Number(item[item.length - 1]))[0];
    innerArray = getPosition(Number(item[item.length - 1]))[1];

    // Figure out which direction to move, checking all possibilities for corners, or moving vertically or horizontally
    if (check(outerArray + 2, innerArray) && check(outerArray, innerArray + 2)){
      // cursor is 1
      returnedNumbers.push(dialpad[outerArray + 2][innerArray + 1]);
      returnedNumbers.push(dialpad[outerArray + 1][innerArray + 2]);
      corner = true;
    } else if (check(outerArray + 2, innerArray) && check(outerArray, innerArray - 2)) {
      // cursor is at 3
      returnedNumbers.push(dialpad[outerArray + 1][innerArray - 2]);
      returnedNumbers.push(dialpad[outerArray + 2][innerArray - 1]);
      corner = true;
    } else if (check(outerArray - 2, innerArray) && check(outerArray, innerArray + 2)) {
      // cursor is at 7
      returnedNumbers.push(dialpad[outerArray - 1][innerArray + 2]);
      returnedNumbers.push(dialpad[outerArray - 2][innerArray + 1]);
      corner = true;
    } else if (check(outerArray - 2, innerArray) && check(outerArray, innerArray - 2)) {
      // cursor is at 9
      returnedNumbers.push(dialpad[outerArray - 1][innerArray - 2]);
      returnedNumbers.push(dialpad[outerArray - 2][innerArray - 1]);
      corner = true;
    } else if (check(outerArray, innerArray + 2)) {
      // move right 2
      innerArray += 2;
    } else if( check(outerArray, innerArray-1)) {
      // move left 2
      innerArray -= 2;
    } else if (check(outerArray, innerArray + 2)) {
      // move down 2
      outerArray += 2;
      movedVertically = true;
    } else if (check(outerArray - 2, innerArray)) {
      // move up 2
      outerArray -= 2;
      movedVertically = true;
    }

    // Make sure it is not a corner number since those have been added to returnedNumbers
    if (!corner) {
      // check whether the cursor moved vertically or horizontally and then push the appropiate values
      if (movedVertically) {
        if (check(outerArray, innerArray + 1) && check(outerArray, innerArray - 1)) {
          returnedNumbers.push(dialpad[outerArray][innerArray + 1]);
          returnedNumbers.push(dialpad[outerArray][innerArray - 1]);
        }
        else if (check(outerArray, innerArray + 1) ) {
          returnedNumbers.push(dialpad[outerArray][innerArray + 1]);
        } else if (check(outerArray, innerArray -1)) {
          returnedNumbers.push(dialpad[outerArray][innerArray - 1]);
        }
      } else {
        if (check(outerArray + 1, innerArray) && check(outerArray - 1, innerArray)) {
          returnedNumbers.push(dialpad[outerArray + 1][innerArray]);
          returnedNumbers.push(dialpad[outerArray - 1][innerArray]);
        }
        else if (check(outerArray + 1, innerArray) ) {
          returnedNumbers.push(dialpad[outerArray + 1][innerArray]);
        } else if (check(outerArray - 1, innerArray)) {
          returnedNumbers.push(dialpad[outerArray - 1][innerArray]);
        }
      }

    }
  });

  return returnedNumbers;
}


function shortL() {
  let returnedNumbers = [];
  // to check when the cursor splits
  let split = false;

  output.forEach(item => {
    // Get the location of the number on the dialpad
    outerArray = getPosition(Number(item[item.length - 1]))[0];
    innerArray = getPosition(Number(item[item.length -1]))[1];

    // series of test to see which direction the cursor can move
    if (check(outerArray + 1, innerArray) && check(outerArray - 1, innerArray)) {
      split = true;
    } else if (check(outerArray + 1, innerArray)) {
      outerArray ++;
    } else if (check(outerArray - 1, innerArray)) {
      outerArray --;
    }
    if (check(outerArray, innerArray + 1) && check(outerArray, innerArray - 1)) {
      if (split) {
        returnedNumbers.push(dialpad[outerArray + 1][innerArray + 1]);
        returnedNumbers.push(dialpad[outerArray + 1][innerArray - 1]);
        returnedNumbers.push(dialpad[outerArray - 1][innerArray + 1]);
        returnedNumbers.push(dialpad[outerArray - 1][innerArray - 1]);
      } else {
        returnedNumbers.push(dialpad[outerArray][innerArray + 1]);
        returnedNumbers.push(dialpad[outerArray][innerArray - 1]);
      }
    } else if (check(outerArray, innerArray + 1)) {
      if (split) {
        returnedNumbers.push(dialpad[outerArray + 1][innerArray + 1]);
        returnedNumbers.push(dialpad[outerArray - 1][innerArray + 1]);
      } else {
        returnedNumbers.push(dialpad[outerArray][innerArray + 1]);
      }
    } else if (check(outerArray, innerArray -1)) {
      if (split) {
        returnedNumbers.push(dialpad[outerArray + 1][innerArray - 1]);
        returnedNumbers.push(dialpad[outerArray - 1][innerArray - 1]);
      } else {
        returnedNumbers.push(dialpad[outerArray][innerArray - 1]);
      }
    }
  });

  return returnedNumbers;
}

// Cycles through the TallL and the two ShortLs
function cycle(n) {
  let count = 0;
  let results;
  let updatedResults;
  while (count < n) {

    // Call Tall L
    results = tallL();

    // Remove duplicates
    updatedResults = results.filter((item, index) => {
      return results.indexOf(item) === index;
    });


    if (updatedResults.length === 4) {
      results = updatedResults.splice(0, 2);


      output = combineMany(output, results, updatedResults);
    } else {
      // Add the result to each element in output
      output = combine(output, updatedResults);
    }
    //// increase count and check the inputed amount
    count++;
    if (n % 3 === 1 && count === n ) { break; }

    // drop the bottom row of 2d array to avoid extraneous checks for 0
    if (count === 1) {
      dialpad.pop();
    }

    // Call First Short L
    results = shortL();
    // Remove duplicates
    updatedResults = results.filter((item, index) => {
      return results.indexOf(item) === index;
    });
    // Add the result to each element in output
    output = combine(output, updatedResults);
    // increase count and check the inputed amount
    count++;
    if (n % 3 === 2 && count === n) { break; }

    // Call Second Short L
    results = shortL();
    // Remove duplicates
    updatedResults = results.filter((item, index) => {
      return results.indexOf(item) === index;
    });
    // Add the result to each element in output
    output = combine(output, updatedResults);
    // increase count
    count++
  }
}

// Call the program with command line argument
cycle(Number(process.argv[2]));

// Output to console
console.log(`There are ${output.length} qualifying ${process.argv[2]}-digit numbers.`)
console.log(output.length);
console.log(output);
