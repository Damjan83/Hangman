const showWord = document.querySelector('.words');
const input = document.querySelector('.input');
const randomWord = document.querySelector('.required__word')
const wrongLetters = document.querySelector('.letters');
const correctWordModal = document.querySelector('.correct__word-modal');
const gameOverModal = document.querySelector('.game__over-modal');
const livesLeft = document.querySelector('.lives__left');

const words = ['computer', 'keyboard', 'mouse', 'phone', 'laptop'];
let randomString;
let wordArray;
let missedLetters = '';
livesLeft.innerHTML = '5';

/*-stopwatch-*/
const timer = document.getElementById('.timer');
const appendMinutes = document.getElementById('minutes');
const appendSeconds = document.getElementById('seconds');
const appendTens = document.getElementById('tens');

const btnStart = document.getElementById('start');
const btnStop = document.getElementById('stop');
const btnReset = document.getElementById('reset');


let interval;
let minutes = 00;
let seconds = 00;
let tens = 00;

function startTimer() {
    tens++;
    if(tens < 9) {
        appendTens.innerHTML = '0' + tens;
    }
    if(tens > 9) {
        appendTens.innerHTML = tens;
    }
    if(tens > 99) {
        seconds++;
        appendSeconds.innerHTML = '0' + seconds;
        tens = 0;
        appendTens.innerHTML = '0' + 0;
    }
    if(seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
    if(seconds > 60) {
        minutes++;
        appendMinutes.innerHTML = '0' + minutes;
        seconds = 0;
        appendSeconds.innerHTML = '0' + 0;
    }
}





/*------Hangman------*/
createWordLine();

function test() {
    const lineElements = document.querySelectorAll('.characters');
    const inputValue = input.value;
    //const correctWord = document.querySelector('.correct__word');
    const correctString = document.querySelector('.correct__string');
    let countStr = 0;
    
    
    for(let i = 0; i < wordArray.length; i++){
        const word = wordArray[i];
        if(inputValue == word){
            lineElements[i].innerHTML = inputValue;
        }   
        if(lineElements[i].innerHTML != ''){
            countStr++;
        }      
    }

    
    if(wordArray.indexOf(inputValue) == -1) {  
        
        if(missedLetters.indexOf(inputValue) ==  -1) {
            missedLetters += inputValue + ', ';
            livesLeft.innerHTML -= 1 ;
            if(livesLeft.innerHTML <= 0) {
                gameOverModal.style.display = 'block';
            }
        }
    }
        
    
    if(countStr == wordArray.length) {       
        correctString.innerHTML += randomString + ', ' + '<br>';
        correctWordModal.style.display = 'block';
        missedLetters = '';
        wrongLetters.innerHTML = '';
        createWordLine();   
        
    }

    wrongLetters.innerHTML = missedLetters;
    
}


function clearInput() {
    document.getElementById('input-value').value = '';
}

  
function createWordLine() {
    randomString = words[Math.floor(Math.random() * words.length)]
    wordArray = randomString.split('');
    interval = setInterval(startTimer);
    randomWord.innerHTML = '';

    for(let i = 0; i < wordArray.length; i++){
        const appendString = document.createElement('div');
        appendString.classList.add('characters');  
        randomWord.appendChild(appendString);
    }
}
   

input.addEventListener('keydown', (event) => {    
                 
    if(event.keyCode == 13){                  
        test();
    }
    clearInput();
    clearInterval(interval);
    
})
 

/*------Stopwatch------*/


/*btnStart.addEventListener('click' , () => {
    interval = setInterval(startTimer);
});
btnStop.addEventListener('click' , () => {
    clearInterval(interval);
});
btnReset.addEventListener('click' , () => {
    clearInterval(interval);
    tens = '00';
    seconds = '00';
    minutes = '00';
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
});*/


