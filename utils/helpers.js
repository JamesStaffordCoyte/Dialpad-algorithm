const dialpad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [null, 0, null]
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
    if (dialpad[outer][inner]){
      return true;
    }
  }
  return false;
}

// combines two arrays by string elements
let combine = (firstArr, secondArr) => {
  let newArr = [];
  secondArr.forEach((secondItem) => {
    firstArr.forEach((firstItem) => {
      newArr.push(firstItem + secondItem.toString());
    });
  });
  return newArr;
}

module.exports = {getPosition, check, combine};
