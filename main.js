const showWord = document.querySelector('.words');
const input = document.querySelector('.input');
const randomWord = document.querySelector('.random__characters')
const wrongLetters = document.querySelector('.letters');

const words = ['computerc', 'keyboardk', 'mousem', 'phonep', 'laptopl'];
let randomString = words[Math.floor(Math.random() * words.length)]
const wordArray = randomString.split('');
let missedLetters= '';

for(let i = 0; i < wordArray.length; i++){
    const appendString = document.createElement('div');
    appendString.classList.add('characters');  
    randomWord.appendChild(appendString);
}

function test() {
    const lineElements = document.querySelectorAll('.characters');
    const inputValue = input.value;

    for(let i = 0; i < wordArray.length; i++){
        const word = wordArray[i];

        if(inputValue == word){
            lineElements[i].innerHTML = inputValue;
        }      
    }

    if(wordArray.indexOf(inputValue) == -1) {  
        missedLetters = missedLetters + inputValue;
    }
    wrongLetters.innerHTML = missedLetters;

}

function clearInput() {
    document.getElementById('input-value').value = '';
}
    
input.addEventListener('keydown', (event) => {                 
    if(event.code === 'Enter'){                  
        test();
    }
    clearInput();
})
 

