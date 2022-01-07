const showWord = document.querySelector('.words');
const words = ['computer', 'keyboard', 'mouse', 'phone', 'laptop'];

let randomString = words[Math.floor(Math.random() * words.length)]
const wordArray = randomString.split('');
const stringInput = document.createElement('input');

for(let i = 0; wordArray[i]; i++){
    const appendString = document.createElement('div');
    appendString.classList.add('characters');
    document.body.appendChild(appendString);
    showWord.appendChild(appendString);
        
}
    stringInput.setAttribute('type' , 'text');
    stringInput.setAttribute('maxlength', '1');
    stringInput.setAttribute('placeholder' , 'Enter letter');
    stringInput.classList.add('string');
    document.body.appendChild(stringInput);
    showWord.appendChild(stringInput);
    
    stringInput.addEventListener('keyup' , (event) => {
        if(event.code === 'Enter'){                  
            const inputValue = document.querySelector('input').value;
            if(randomString.includes(inputValue)){
                document.querySelector('.characters').innerHTML = inputValue;
            }
            for(let i = 0; wordArray[i]; i++){
                const wordArraySplit = wordArray[i].split('');
                console.log(wordArraySplit)
                if(inputValue == wordArraySplit){
                    console.log('test');
                    document.querySelector('.characters').innerHTML = wordArraySplit;
                }
            }
        }

    })
    
    



