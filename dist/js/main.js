(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var showWord = document.querySelector('.words');
var input = document.querySelector('.input');
var randomWord = document.querySelector('.required__word');
var wrongLetters = document.querySelector('.letters');
var correctString = document.querySelector('.correct__string');
var correctWordModal = document.querySelector('.correct__word-modal');
var gameOverModal = document.querySelector('.game__over-modal');
var livesLeft = document.querySelector('.lives__left');
var wordsNumLeft = document.querySelector('.words__number-left');
var timer = document.getElementById('.timer');
var appendMinutes = document.getElementById('time');
var hangmanBodyparts = document.querySelectorAll('.hangman__body');
var startContainer = document.querySelector('.start');
var startBtn = document.querySelector('.start__container-btn');
var words = ['computer', 'keyboard', 'mouse', 'phone', 'laptop', 'processor', 'memory', 'power', 'speakers', 'graphics'];
var randomString;
var wordArray;
var missedLetters = '';
livesLeft.innerHTML = '6';
wordsNumLeft.innerHTML = '5';
/*-stopwatch-*/

var startTime;
var elapsedTime = 0;
var timerInterval;
var isActiveTime = false;
var interval;
var saveTime;
var newRandomStrArray = [];
var missedLettersArray = [];
startBtn.addEventListener('click', function () {
  startContainer.style.display = 'none';
});
/*------Hangman------*/

createWordLine();

function test() {
  var lineElements = document.querySelectorAll('.characters');
  var inputValue = input.value;
  var countStr = 0;

  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];

    if (inputValue.toLowerCase() == word.toLowerCase()) {
      lineElements[i].innerHTML = inputValue.toLowerCase();
    }

    if (lineElements[i].innerHTML != '') {
      countStr++;
    }
  }

  if (wordArray.indexOf(inputValue) == -1) {
    if (missedLetters.indexOf(inputValue) == -1) {
      missedLetters += inputValue + ', ';
      livesLeft.innerHTML -= 1;
      missedLettersArray.push(inputValue);

      if (missedLettersArray.length == 1) {
        hangmanBodyparts[0].style.display = 'block';
      } else if (missedLettersArray.length == 2) {
        hangmanBodyparts[1].style.display = 'block';
      } else if (missedLettersArray.length == 3) {
        hangmanBodyparts[2].style.display = 'block';
      } else if (missedLettersArray.length == 4) {
        hangmanBodyparts[3].style.display = 'block';
      } else if (missedLettersArray.length == 5) {
        hangmanBodyparts[4].style.display = 'block';
      } else if (missedLettersArray.length == 6) {
        hangmanBodyparts[5].style.display = 'block';
      }

      if (livesLeft.innerHTML <= 0) {
        gameOverModal.style.display = 'block';
        document.getElementById('input-value').disabled = true;
        reset();
      }
    }
  }

  if (countStr == wordArray.length) {
    correctString.innerHTML += randomString + ' (' + saveTime + ')' + '<br>';
    wordsNumLeft.innerHTML -= 1;
    missedLetters = '';
    wrongLetters.innerHTML = '';
    createWordLine();
    reset();
    isActiveTime = false;
    setTimeout(function () {
      correctWordModal.style.display = 'none';
    }, 2000);
  }

  if (wordsNumLeft.innerHTML <= 0) {
    correctWordModal.style.display = 'block';
    isActiveTime = true;
    reset();
  }

  wrongLetters.innerHTML = missedLetters;
}

function clearInput() {
  document.getElementById('input-value').value = '';
}

function createWordLine() {
  var shuffledArray = words.sort(function (a, b) {
    return 0.5 - Math.random();
  });

  for (var i = 0; i < shuffledArray.length; i++) {
    if (newRandomStrArray.indexOf(words[i]) == -1) {
      newRandomStrArray.push(words[i]);
      randomString = words[i];
      break;
    }
  }

  wordArray = randomString.split('');
  randomWord.innerHTML = '';

  for (var _i = 0; _i < wordArray.length; _i++) {
    var appendString = document.createElement('div');
    appendString.classList.add('characters');
    randomWord.appendChild(appendString);
  }
}
/*------Stopwatch------*/


function startTimer(time) {
  var diffInHrs = time / 3600000;
  var hh = Math.floor(diffInHrs);
  var diffInMin = (diffInHrs - hh) * 60;
  var mm = Math.floor(diffInMin);
  var diffInSec = (diffInMin - mm) * 60;
  var ss = Math.floor(diffInSec);
  var diffInMs = (diffInSec - ss) * 100;
  var ms = Math.floor(diffInMs);
  var formattedMM = mm.toString().padStart(2, "0");
  var formattedSS = ss.toString().padStart(2, "0");
  var formattedMS = ms.toString().padStart(2, "0");
  return "".concat(formattedMM, ":").concat(formattedSS, ":").concat(formattedMS);
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    appendMinutes.innerHTML = startTimer(elapsedTime);
    saveTime = startTimer(elapsedTime);
  }, 10);
}

function reset() {
  clearInterval(timerInterval);
  appendMinutes.innerHTML = "00:00:00";
  elapsedTime = 0;
}

function stop() {
  clearInterval(timerInterval);
}

input.addEventListener('keydown', function (event) {
  if (event.keyCode == 13) {
    test();
    if (!isActiveTime) start();
    isActiveTime = true;
  }

  clearInput();
});

},{}]},{},[1]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzaG93V29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JkcycpO1xudmFyIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0Jyk7XG52YXIgcmFuZG9tV29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXF1aXJlZF9fd29yZCcpO1xudmFyIHdyb25nTGV0dGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZXR0ZXJzJyk7XG52YXIgY29ycmVjdFN0cmluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3JyZWN0X19zdHJpbmcnKTtcbnZhciBjb3JyZWN0V29yZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvcnJlY3RfX3dvcmQtbW9kYWwnKTtcbnZhciBnYW1lT3Zlck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVfX292ZXItbW9kYWwnKTtcbnZhciBsaXZlc0xlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGl2ZXNfX2xlZnQnKTtcbnZhciB3b3Jkc051bUxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yZHNfX251bWJlci1sZWZ0Jyk7XG52YXIgdGltZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnLnRpbWVyJyk7XG52YXIgYXBwZW5kTWludXRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lJyk7XG52YXIgaGFuZ21hbkJvZHlwYXJ0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oYW5nbWFuX19ib2R5Jyk7XG52YXIgc3RhcnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQnKTtcbnZhciBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydF9fY29udGFpbmVyLWJ0bicpO1xudmFyIHdvcmRzID0gWydjb21wdXRlcicsICdrZXlib2FyZCcsICdtb3VzZScsICdwaG9uZScsICdsYXB0b3AnLCAncHJvY2Vzc29yJywgJ21lbW9yeScsICdwb3dlcicsICdzcGVha2VycycsICdncmFwaGljcyddO1xudmFyIHJhbmRvbVN0cmluZztcbnZhciB3b3JkQXJyYXk7XG52YXIgbWlzc2VkTGV0dGVycyA9ICcnO1xubGl2ZXNMZWZ0LmlubmVySFRNTCA9ICc2JztcbndvcmRzTnVtTGVmdC5pbm5lckhUTUwgPSAnNSc7XG4vKi1zdG9wd2F0Y2gtKi9cblxudmFyIHN0YXJ0VGltZTtcbnZhciBlbGFwc2VkVGltZSA9IDA7XG52YXIgdGltZXJJbnRlcnZhbDtcbnZhciBpc0FjdGl2ZVRpbWUgPSBmYWxzZTtcbnZhciBpbnRlcnZhbDtcbnZhciBzYXZlVGltZTtcbnZhciBuZXdSYW5kb21TdHJBcnJheSA9IFtdO1xudmFyIG1pc3NlZExldHRlcnNBcnJheSA9IFtdO1xuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIHN0YXJ0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcbi8qLS0tLS0tSGFuZ21hbi0tLS0tLSovXG5cbmNyZWF0ZVdvcmRMaW5lKCk7XG5cbmZ1bmN0aW9uIHRlc3QoKSB7XG4gIHZhciBsaW5lRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hhcmFjdGVycycpO1xuICB2YXIgaW5wdXRWYWx1ZSA9IGlucHV0LnZhbHVlO1xuICB2YXIgY291bnRTdHIgPSAwO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHdvcmQgPSB3b3JkQXJyYXlbaV07XG5cbiAgICBpZiAoaW5wdXRWYWx1ZS50b0xvd2VyQ2FzZSgpID09IHdvcmQudG9Mb3dlckNhc2UoKSkge1xuICAgICAgbGluZUVsZW1lbnRzW2ldLmlubmVySFRNTCA9IGlucHV0VmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBpZiAobGluZUVsZW1lbnRzW2ldLmlubmVySFRNTCAhPSAnJykge1xuICAgICAgY291bnRTdHIrKztcbiAgICB9XG4gIH1cblxuICBpZiAod29yZEFycmF5LmluZGV4T2YoaW5wdXRWYWx1ZSkgPT0gLTEpIHtcbiAgICBpZiAobWlzc2VkTGV0dGVycy5pbmRleE9mKGlucHV0VmFsdWUpID09IC0xKSB7XG4gICAgICBtaXNzZWRMZXR0ZXJzICs9IGlucHV0VmFsdWUgKyAnLCAnO1xuICAgICAgbGl2ZXNMZWZ0LmlubmVySFRNTCAtPSAxO1xuICAgICAgbWlzc2VkTGV0dGVyc0FycmF5LnB1c2goaW5wdXRWYWx1ZSk7XG5cbiAgICAgIGlmIChtaXNzZWRMZXR0ZXJzQXJyYXkubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaGFuZ21hbkJvZHlwYXJ0c1swXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH0gZWxzZSBpZiAobWlzc2VkTGV0dGVyc0FycmF5Lmxlbmd0aCA9PSAyKSB7XG4gICAgICAgIGhhbmdtYW5Cb2R5cGFydHNbMV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9IGVsc2UgaWYgKG1pc3NlZExldHRlcnNBcnJheS5sZW5ndGggPT0gMykge1xuICAgICAgICBoYW5nbWFuQm9keXBhcnRzWzJdLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfSBlbHNlIGlmIChtaXNzZWRMZXR0ZXJzQXJyYXkubGVuZ3RoID09IDQpIHtcbiAgICAgICAgaGFuZ21hbkJvZHlwYXJ0c1szXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH0gZWxzZSBpZiAobWlzc2VkTGV0dGVyc0FycmF5Lmxlbmd0aCA9PSA1KSB7XG4gICAgICAgIGhhbmdtYW5Cb2R5cGFydHNbNF0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9IGVsc2UgaWYgKG1pc3NlZExldHRlcnNBcnJheS5sZW5ndGggPT0gNikge1xuICAgICAgICBoYW5nbWFuQm9keXBhcnRzWzVdLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfVxuXG4gICAgICBpZiAobGl2ZXNMZWZ0LmlubmVySFRNTCA8PSAwKSB7XG4gICAgICAgIGdhbWVPdmVyTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC12YWx1ZScpLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgcmVzZXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoY291bnRTdHIgPT0gd29yZEFycmF5Lmxlbmd0aCkge1xuICAgIGNvcnJlY3RTdHJpbmcuaW5uZXJIVE1MICs9IHJhbmRvbVN0cmluZyArICcgKCcgKyBzYXZlVGltZSArICcpJyArICc8YnI+JztcbiAgICB3b3Jkc051bUxlZnQuaW5uZXJIVE1MIC09IDE7XG4gICAgbWlzc2VkTGV0dGVycyA9ICcnO1xuICAgIHdyb25nTGV0dGVycy5pbm5lckhUTUwgPSAnJztcbiAgICBjcmVhdGVXb3JkTGluZSgpO1xuICAgIHJlc2V0KCk7XG4gICAgaXNBY3RpdmVUaW1lID0gZmFsc2U7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBjb3JyZWN0V29yZE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSwgMjAwMCk7XG4gIH1cblxuICBpZiAod29yZHNOdW1MZWZ0LmlubmVySFRNTCA8PSAwKSB7XG4gICAgY29ycmVjdFdvcmRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBpc0FjdGl2ZVRpbWUgPSB0cnVlO1xuICAgIHJlc2V0KCk7XG4gIH1cblxuICB3cm9uZ0xldHRlcnMuaW5uZXJIVE1MID0gbWlzc2VkTGV0dGVycztcbn1cblxuZnVuY3Rpb24gY2xlYXJJbnB1dCgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXZhbHVlJykudmFsdWUgPSAnJztcbn1cblxuZnVuY3Rpb24gY3JlYXRlV29yZExpbmUoKSB7XG4gIHZhciBzaHVmZmxlZEFycmF5ID0gd29yZHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiAwLjUgLSBNYXRoLnJhbmRvbSgpO1xuICB9KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNodWZmbGVkQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobmV3UmFuZG9tU3RyQXJyYXkuaW5kZXhPZih3b3Jkc1tpXSkgPT0gLTEpIHtcbiAgICAgIG5ld1JhbmRvbVN0ckFycmF5LnB1c2god29yZHNbaV0pO1xuICAgICAgcmFuZG9tU3RyaW5nID0gd29yZHNbaV07XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB3b3JkQXJyYXkgPSByYW5kb21TdHJpbmcuc3BsaXQoJycpO1xuICByYW5kb21Xb3JkLmlubmVySFRNTCA9ICcnO1xuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCB3b3JkQXJyYXkubGVuZ3RoOyBfaSsrKSB7XG4gICAgdmFyIGFwcGVuZFN0cmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGFwcGVuZFN0cmluZy5jbGFzc0xpc3QuYWRkKCdjaGFyYWN0ZXJzJyk7XG4gICAgcmFuZG9tV29yZC5hcHBlbmRDaGlsZChhcHBlbmRTdHJpbmcpO1xuICB9XG59XG4vKi0tLS0tLVN0b3B3YXRjaC0tLS0tLSovXG5cblxuZnVuY3Rpb24gc3RhcnRUaW1lcih0aW1lKSB7XG4gIHZhciBkaWZmSW5IcnMgPSB0aW1lIC8gMzYwMDAwMDtcbiAgdmFyIGhoID0gTWF0aC5mbG9vcihkaWZmSW5IcnMpO1xuICB2YXIgZGlmZkluTWluID0gKGRpZmZJbkhycyAtIGhoKSAqIDYwO1xuICB2YXIgbW0gPSBNYXRoLmZsb29yKGRpZmZJbk1pbik7XG4gIHZhciBkaWZmSW5TZWMgPSAoZGlmZkluTWluIC0gbW0pICogNjA7XG4gIHZhciBzcyA9IE1hdGguZmxvb3IoZGlmZkluU2VjKTtcbiAgdmFyIGRpZmZJbk1zID0gKGRpZmZJblNlYyAtIHNzKSAqIDEwMDtcbiAgdmFyIG1zID0gTWF0aC5mbG9vcihkaWZmSW5Ncyk7XG4gIHZhciBmb3JtYXR0ZWRNTSA9IG1tLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICB2YXIgZm9ybWF0dGVkU1MgPSBzcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgdmFyIGZvcm1hdHRlZE1TID0gbXMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIHJldHVybiBcIlwiLmNvbmNhdChmb3JtYXR0ZWRNTSwgXCI6XCIpLmNvbmNhdChmb3JtYXR0ZWRTUywgXCI6XCIpLmNvbmNhdChmb3JtYXR0ZWRNUyk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICBzdGFydFRpbWUgPSBEYXRlLm5vdygpIC0gZWxhcHNlZFRpbWU7XG4gIHRpbWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiBwcmludFRpbWUoKSB7XG4gICAgZWxhcHNlZFRpbWUgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgIGFwcGVuZE1pbnV0ZXMuaW5uZXJIVE1MID0gc3RhcnRUaW1lcihlbGFwc2VkVGltZSk7XG4gICAgc2F2ZVRpbWUgPSBzdGFydFRpbWVyKGVsYXBzZWRUaW1lKTtcbiAgfSwgMTApO1xufVxuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcbiAgYXBwZW5kTWludXRlcy5pbm5lckhUTUwgPSBcIjAwOjAwOjAwXCI7XG4gIGVsYXBzZWRUaW1lID0gMDtcbn1cblxuZnVuY3Rpb24gc3RvcCgpIHtcbiAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcbn1cblxuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAoZXZlbnQua2V5Q29kZSA9PSAxMykge1xuICAgIHRlc3QoKTtcbiAgICBpZiAoIWlzQWN0aXZlVGltZSkgc3RhcnQoKTtcbiAgICBpc0FjdGl2ZVRpbWUgPSB0cnVlO1xuICB9XG5cbiAgY2xlYXJJbnB1dCgpO1xufSk7XG5cbn0se31dfSx7fSxbMV0pO1xuIl0sImZpbGUiOiJtYWluLmpzIn0=
