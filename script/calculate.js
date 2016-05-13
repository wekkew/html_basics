function initialize() {

  var n = document.getElementById('number-one');
  var goButtonElement = document.getElementById('go-button');
  var resultElement = document.getElementById('result');

  function convert() {
    var nElement = parseInt(n.value, 10);
    var binary = [];
    if (nElement===0) {
      binary.unshift(0);
    }
    else{
      for (; nElement > 0; nElement = Math.floor(nElement / 2)) {
        if (nElement % 2 === 0) {
          binary.unshift(0);
        }
        else {
          binary.unshift(1);
        }
      }
    }
    resultElement.textContent = binary.join('') ;
    //print(binary.join(''));
  }
  goButtonElement.addEventListener('click', convert, false);
}

document.addEventListener('DOMContentLoaded', initialize, false);
