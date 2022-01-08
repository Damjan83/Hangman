const showWord = document.querySelector('.words');
const input = document.querySelector('.input');
const randomWord = document.querySelector('.random__characters')

const words = ['computer', 'keyboard', 'mouse', 'phone', 'laptop'];
let randomString = words[Math.floor(Math.random() * words.length)]
const wordArray = randomString.split('');

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
            lineElements[i].innerHTML = inputValue
        }
    }
}
    
input.addEventListener('keydown', (event) => {                 
    if(event.code === 'Enter'){                  
        test();
    }
})

// Treba da se obrise iz inputa vrednost na enter
// Ne postojeca slova da se ispisu u divu sa strane