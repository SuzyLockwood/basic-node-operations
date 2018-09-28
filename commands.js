const fs = require('fs');

//write out data
function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
  const userInputArray = userInput.split(' ');
  const command = userInputArray[0];

  switch (command) {
    case 'echo':
      //we will add the functionality of echo next within the object commandLibrary
      commandLibrary.echo(userInputArray.slice(1).join(' '));
      break;
    case 'cat':
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case 'head':
      commandLibrary.head(userInputArray.slice(1));
      break;
    case 'tail':
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      console.log('Invalid command.');
  }
}

//where we will store the logic of our commands
const commandLibrary = {
  //the echo command
  echo: function(userInput) {
    done(userInput);
  },
  //the cat command
  cat: function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  //the head command
  head: function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      const arr = data.toString().split('\n');
      let arrTemp = [];
      for (var i = 0; i <= 10; i++) {
        arr[i] = arr[i].replace(',', i + 1) + '\n';
        arrTemp.push(arr[i]);
      }
      done(arrTemp.join(''));
    });
  },
  //the tail command
  tail: function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      const arr = data.toString().split('\n');
      const length = arr.length;
      let arrTemp = [];
      for (var i = length - 1; i >= length - 10; i--) {
        arr[i] = arr[i].replace(',', i + 1) + '\n';
        arrTemp.push(arr[i]);
      }
      done(arrTemp.join(''));
    });
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
