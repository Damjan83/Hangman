const showWord = document.querySelector('.words');
const input = document.querySelector('.input');
const randomWord = document.querySelector('.required__word')
const wrongLetters = document.querySelector('.letters');
const correctString = document.querySelector('.correct__string');
const correctWordModal = document.querySelector('.correct__word-modal');
const gameOverModal = document.querySelector('.game__over-modal');
const livesLeft = document.querySelector('.lives__left');
const wordsNumLeft = document.querySelector('.words__number-left')

const words = ['computer', 'keyboard', 'mouse', 'phone', 'laptop'];
let randomString;
let wordArray;
let missedLetters = '';
livesLeft.innerHTML = '5';
wordsNumLeft.innerHTML = '5';

/*-stopwatch-*/
let startTime;
let elapsedTime = 0;
let timerInterval;


const timer = document.getElementById('.timer');
const appendMinutes = document.getElementById('time');

//const btnStart = document.getElementById('start');
//const btnStop = document.getElementById('stop');
//const btnReset = document.getElementById('reset');

let interval;
let minutes = 00;
let seconds = 00;
let tens = 00;
let saveTime;

/*------Hangman------*/
createWordLine();

function test() {
    const lineElements = document.querySelectorAll('.characters');
    const inputValue = input.value;
    let countStr = 0;
    
    for(let i = 0; i < wordArray.length; i++){
        const word = wordArray[i];
        if(inputValue.toLowerCase() == word.toLowerCase()) {
            lineElements[i].innerHTML = inputValue.toLowerCase();
        }   
        if(lineElements[i].innerHTML != '') {
            countStr++;
        }      
    }

    
    if(wordArray.indexOf(inputValue) == -1) {  

        if(missedLetters.indexOf(inputValue) ==  -1) {
            missedLetters += inputValue + ', ';
            livesLeft.innerHTML -= 1 ;
            if(livesLeft.innerHTML <= 0) {
                gameOverModal.style.display = 'block';
                reset();
            }
        }
    }
        
    
    if(countStr == wordArray.length) {       
        correctString.innerHTML += randomString + ' (' + saveTime + ')' + '<br>'; 
        wordsNumLeft.innerHTML -= 1;
        missedLetters = '';
        wrongLetters.innerHTML = '';
        createWordLine();
        reset();

        setTimeout (function() {
            correctWordModal.style.display = 'none'; 

        }, 2000)
    }

    if(wordsNumLeft.innerHTML <= 0) {
        correctWordModal.style.display = 'block';
        document.getElementById('input-value').disabled = true;
    }

    wrongLetters.innerHTML = missedLetters;
    
}



function clearInput() {
    document.getElementById('input-value').value = '';
}

function createWordLine() {
    randomString = words[Math.floor(Math.random() * words.length)]
    wordArray = randomString.split('');         
    randomWord.innerHTML = '';

    for(let i = 0; i < wordArray.length; i++){
        const appendString = document.createElement('div');
        appendString.classList.add('characters');  
        randomWord.appendChild(appendString);
    }
}

/*------Stopwatch------*/
function startTimer(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
  
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
  
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
  
    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);
  
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");
  
    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      appendMinutes.innerHTML = startTimer(elapsedTime)
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
   
input.addEventListener('keydown', (event) => {                    
    if(event.keyCode == 13){      
        test();
        start();
    }
    clearInput();
    
})


// Reci da se pokazuju samo jednom
// Da se prikaze broj reci koji se smanjuje kada se pogodi rec
// Modal da se pokazuje na kraju (finish) 
// Kada se zavrsi igra, treba da se zaustavi vreme i da se iskljuci input