const dialpad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['*', 0, '#']
]

// get the position index given cursor
let getPosition = (cursor) => {
  for (let i = 0; i < dialpad.length; i++) {
    for (let j = 0; j < dialpad[i].length; j++) {
      if (dialpad[i][j] === cursor) {
        return [i, j];
      }
    }
  }
}

// helper to check whether moving in a certain direction exists on the dialpad
let check = (outer, inner) => {
  if (dialpad[outer]) {
    if (Number.isInteger(dialpad[outer][inner])){
      return true;
    } else if ((dialpad[outer][inner] === '*') || (dialpad[outer][inner] === '*')){
      return false;
    }
  }
  return false;
}

// combines two arrays by string elements
let combine = (item, secondArr) => {
  let newArr = [];
  secondArr.forEach((secondItem) => {
    newArr.push(item + secondItem.toString());

  });

  return newArr;
}

// combines two arrays by string elements
let combineMany = (firstArr, secondArr, thirdArr) => {
  let newArr = [];
  // grab first half of first Arr
  let split = firstArr.splice(0, firstArr.length / 2);
  // adds the second Arr to first half
  secondArr.forEach((secondItem) => {
    split.forEach((splitItem) => {
      newArr.push(splitItem + secondItem.toString());
    });
  });
  // adds third Arr to second half
  thirdArr.forEach((thirdItem) => {
    firstArr.forEach((firstItem) => {
      newArr.push(firstItem + thirdItem.toString());
    });
  });
  return newArr;
}

let containsArray = (array) => {
  return array.some(item => Array.isArray(item));
}

module.exports = {getPosition, check, combine, containsArray};
