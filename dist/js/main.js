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
    document.getElementById('input-value').disabled = true;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzaG93V29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JkcycpO1xudmFyIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0Jyk7XG52YXIgcmFuZG9tV29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXF1aXJlZF9fd29yZCcpO1xudmFyIHdyb25nTGV0dGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZXR0ZXJzJyk7XG52YXIgY29ycmVjdFN0cmluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3JyZWN0X19zdHJpbmcnKTtcbnZhciBjb3JyZWN0V29yZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvcnJlY3RfX3dvcmQtbW9kYWwnKTtcbnZhciBnYW1lT3Zlck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVfX292ZXItbW9kYWwnKTtcbnZhciBsaXZlc0xlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGl2ZXNfX2xlZnQnKTtcbnZhciB3b3Jkc051bUxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yZHNfX251bWJlci1sZWZ0Jyk7XG52YXIgdGltZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnLnRpbWVyJyk7XG52YXIgYXBwZW5kTWludXRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lJyk7XG52YXIgaGFuZ21hbkJvZHlwYXJ0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oYW5nbWFuX19ib2R5Jyk7XG52YXIgc3RhcnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQnKTtcbnZhciBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydF9fY29udGFpbmVyLWJ0bicpO1xudmFyIHdvcmRzID0gWydjb21wdXRlcicsICdrZXlib2FyZCcsICdtb3VzZScsICdwaG9uZScsICdsYXB0b3AnLCAncHJvY2Vzc29yJywgJ21lbW9yeScsICdwb3dlcicsICdzcGVha2VycycsICdncmFwaGljcyddO1xudmFyIHJhbmRvbVN0cmluZztcbnZhciB3b3JkQXJyYXk7XG52YXIgbWlzc2VkTGV0dGVycyA9ICcnO1xubGl2ZXNMZWZ0LmlubmVySFRNTCA9ICc2JztcbndvcmRzTnVtTGVmdC5pbm5lckhUTUwgPSAnNSc7XG4vKi1zdG9wd2F0Y2gtKi9cblxudmFyIHN0YXJ0VGltZTtcbnZhciBlbGFwc2VkVGltZSA9IDA7XG52YXIgdGltZXJJbnRlcnZhbDtcbnZhciBpc0FjdGl2ZVRpbWUgPSBmYWxzZTtcbnZhciBpbnRlcnZhbDtcbnZhciBzYXZlVGltZTtcbnZhciBuZXdSYW5kb21TdHJBcnJheSA9IFtdO1xudmFyIG1pc3NlZExldHRlcnNBcnJheSA9IFtdO1xuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIHN0YXJ0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcbi8qLS0tLS0tSGFuZ21hbi0tLS0tLSovXG5cbmNyZWF0ZVdvcmRMaW5lKCk7XG5cbmZ1bmN0aW9uIHRlc3QoKSB7XG4gIHZhciBsaW5lRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hhcmFjdGVycycpO1xuICB2YXIgaW5wdXRWYWx1ZSA9IGlucHV0LnZhbHVlO1xuICB2YXIgY291bnRTdHIgPSAwO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHdvcmQgPSB3b3JkQXJyYXlbaV07XG5cbiAgICBpZiAoaW5wdXRWYWx1ZS50b0xvd2VyQ2FzZSgpID09IHdvcmQudG9Mb3dlckNhc2UoKSkge1xuICAgICAgbGluZUVsZW1lbnRzW2ldLmlubmVySFRNTCA9IGlucHV0VmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBpZiAobGluZUVsZW1lbnRzW2ldLmlubmVySFRNTCAhPSAnJykge1xuICAgICAgY291bnRTdHIrKztcbiAgICB9XG4gIH1cblxuICBpZiAod29yZEFycmF5LmluZGV4T2YoaW5wdXRWYWx1ZSkgPT0gLTEpIHtcbiAgICBpZiAobWlzc2VkTGV0dGVycy5pbmRleE9mKGlucHV0VmFsdWUpID09IC0xKSB7XG4gICAgICBtaXNzZWRMZXR0ZXJzICs9IGlucHV0VmFsdWUgKyAnLCAnO1xuICAgICAgbGl2ZXNMZWZ0LmlubmVySFRNTCAtPSAxO1xuICAgICAgbWlzc2VkTGV0dGVyc0FycmF5LnB1c2goaW5wdXRWYWx1ZSk7XG5cbiAgICAgIGlmIChtaXNzZWRMZXR0ZXJzQXJyYXkubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaGFuZ21hbkJvZHlwYXJ0c1swXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH0gZWxzZSBpZiAobWlzc2VkTGV0dGVyc0FycmF5Lmxlbmd0aCA9PSAyKSB7XG4gICAgICAgIGhhbmdtYW5Cb2R5cGFydHNbMV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9IGVsc2UgaWYgKG1pc3NlZExldHRlcnNBcnJheS5sZW5ndGggPT0gMykge1xuICAgICAgICBoYW5nbWFuQm9keXBhcnRzWzJdLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfSBlbHNlIGlmIChtaXNzZWRMZXR0ZXJzQXJyYXkubGVuZ3RoID09IDQpIHtcbiAgICAgICAgaGFuZ21hbkJvZHlwYXJ0c1szXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH0gZWxzZSBpZiAobWlzc2VkTGV0dGVyc0FycmF5Lmxlbmd0aCA9PSA1KSB7XG4gICAgICAgIGhhbmdtYW5Cb2R5cGFydHNbNF0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9IGVsc2UgaWYgKG1pc3NlZExldHRlcnNBcnJheS5sZW5ndGggPT0gNikge1xuICAgICAgICBoYW5nbWFuQm9keXBhcnRzWzVdLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfVxuXG4gICAgICBpZiAobGl2ZXNMZWZ0LmlubmVySFRNTCA8PSAwKSB7XG4gICAgICAgIGdhbWVPdmVyTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHJlc2V0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGNvdW50U3RyID09IHdvcmRBcnJheS5sZW5ndGgpIHtcbiAgICBjb3JyZWN0U3RyaW5nLmlubmVySFRNTCArPSByYW5kb21TdHJpbmcgKyAnICgnICsgc2F2ZVRpbWUgKyAnKScgKyAnPGJyPic7XG4gICAgd29yZHNOdW1MZWZ0LmlubmVySFRNTCAtPSAxO1xuICAgIG1pc3NlZExldHRlcnMgPSAnJztcbiAgICB3cm9uZ0xldHRlcnMuaW5uZXJIVE1MID0gJyc7XG4gICAgY3JlYXRlV29yZExpbmUoKTtcbiAgICByZXNldCgpO1xuICAgIGlzQWN0aXZlVGltZSA9IGZhbHNlO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgY29ycmVjdFdvcmRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0sIDIwMDApO1xuICB9XG5cbiAgaWYgKHdvcmRzTnVtTGVmdC5pbm5lckhUTUwgPD0gMCkge1xuICAgIGNvcnJlY3RXb3JkTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXZhbHVlJykuZGlzYWJsZWQgPSB0cnVlO1xuICAgIGlzQWN0aXZlVGltZSA9IHRydWU7XG4gICAgcmVzZXQoKTtcbiAgfVxuXG4gIHdyb25nTGV0dGVycy5pbm5lckhUTUwgPSBtaXNzZWRMZXR0ZXJzO1xufVxuXG5mdW5jdGlvbiBjbGVhcklucHV0KCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdmFsdWUnKS52YWx1ZSA9ICcnO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVXb3JkTGluZSgpIHtcbiAgdmFyIHNodWZmbGVkQXJyYXkgPSB3b3Jkcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIDAuNSAtIE1hdGgucmFuZG9tKCk7XG4gIH0pO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2h1ZmZsZWRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChuZXdSYW5kb21TdHJBcnJheS5pbmRleE9mKHdvcmRzW2ldKSA9PSAtMSkge1xuICAgICAgbmV3UmFuZG9tU3RyQXJyYXkucHVzaCh3b3Jkc1tpXSk7XG4gICAgICByYW5kb21TdHJpbmcgPSB3b3Jkc1tpXTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHdvcmRBcnJheSA9IHJhbmRvbVN0cmluZy5zcGxpdCgnJyk7XG4gIHJhbmRvbVdvcmQuaW5uZXJIVE1MID0gJyc7XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHdvcmRBcnJheS5sZW5ndGg7IF9pKyspIHtcbiAgICB2YXIgYXBwZW5kU3RyaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYXBwZW5kU3RyaW5nLmNsYXNzTGlzdC5hZGQoJ2NoYXJhY3RlcnMnKTtcbiAgICByYW5kb21Xb3JkLmFwcGVuZENoaWxkKGFwcGVuZFN0cmluZyk7XG4gIH1cbn1cbi8qLS0tLS0tU3RvcHdhdGNoLS0tLS0tKi9cblxuXG5mdW5jdGlvbiBzdGFydFRpbWVyKHRpbWUpIHtcbiAgdmFyIGRpZmZJbkhycyA9IHRpbWUgLyAzNjAwMDAwO1xuICB2YXIgaGggPSBNYXRoLmZsb29yKGRpZmZJbkhycyk7XG4gIHZhciBkaWZmSW5NaW4gPSAoZGlmZkluSHJzIC0gaGgpICogNjA7XG4gIHZhciBtbSA9IE1hdGguZmxvb3IoZGlmZkluTWluKTtcbiAgdmFyIGRpZmZJblNlYyA9IChkaWZmSW5NaW4gLSBtbSkgKiA2MDtcbiAgdmFyIHNzID0gTWF0aC5mbG9vcihkaWZmSW5TZWMpO1xuICB2YXIgZGlmZkluTXMgPSAoZGlmZkluU2VjIC0gc3MpICogMTAwO1xuICB2YXIgbXMgPSBNYXRoLmZsb29yKGRpZmZJbk1zKTtcbiAgdmFyIGZvcm1hdHRlZE1NID0gbW0udG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIHZhciBmb3JtYXR0ZWRTUyA9IHNzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICB2YXIgZm9ybWF0dGVkTVMgPSBtcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgcmV0dXJuIFwiXCIuY29uY2F0KGZvcm1hdHRlZE1NLCBcIjpcIikuY29uY2F0KGZvcm1hdHRlZFNTLCBcIjpcIikuY29uY2F0KGZvcm1hdHRlZE1TKTtcbn1cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gIHN0YXJ0VGltZSA9IERhdGUubm93KCkgLSBlbGFwc2VkVGltZTtcbiAgdGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uIHByaW50VGltZSgpIHtcbiAgICBlbGFwc2VkVGltZSA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XG4gICAgYXBwZW5kTWludXRlcy5pbm5lckhUTUwgPSBzdGFydFRpbWVyKGVsYXBzZWRUaW1lKTtcbiAgICBzYXZlVGltZSA9IHN0YXJ0VGltZXIoZWxhcHNlZFRpbWUpO1xuICB9LCAxMCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xuICBhcHBlbmRNaW51dGVzLmlubmVySFRNTCA9IFwiMDA6MDA6MDBcIjtcbiAgZWxhcHNlZFRpbWUgPSAwO1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xufVxuXG5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmIChldmVudC5rZXlDb2RlID09IDEzKSB7XG4gICAgdGVzdCgpO1xuICAgIGlmICghaXNBY3RpdmVUaW1lKSBzdGFydCgpO1xuICAgIGlzQWN0aXZlVGltZSA9IHRydWU7XG4gIH1cblxuICBjbGVhcklucHV0KCk7XG59KTtcblxufSx7fV19LHt9LFsxXSk7XG4iXSwiZmlsZSI6Im1haW4uanMifQ==
