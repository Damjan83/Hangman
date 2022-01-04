const showWord = document.querySelector('.words');
const words = ['computer', 'keyboard', 'mouse', 'phone', 'laptop'];

let randomString = words[Math.floor(Math.random() * words.length)]
const wordArray = randomString.split('');

for(let i = 0; wordArray[i]; i++){
    const appendString = document.createElement('div');
    appendString.classList.add('characters');
    document.body.appendChild(appendString);
    showWord.appendChild(appendString);
    console.log(appendString)
}
const stringInput = document.createElement('input');
    stringInput.setAttribute('type' , 'text');
    stringInput.setAttribute('maxlength', '1');
    stringInput.setAttribute('placeholder' , 'Enter letter')
    stringInput.classList.add('string');
    document.body.appendChild(stringInput);
    showWord.appendChild(stringInput);
    stringInput.addEventListener('keyup' , (event) => {
        if(event.code === 'Enter'){
            const inputValue = document.querySelector('input').value;
            console.log(inputValue)
        }
    })
    



