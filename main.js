const showWord = document.querySelector('.words');
const words = ['computer', 'keyboard', 'mouse', 'phone', 'laptop'];


let randomString = words[Math.floor(Math.random() * words.length)]
const wordArray = randomString.split('');
console.log(wordArray)
//const charUnderscore = randomString.replace(/[a-z]/g , '_').split('').join(' ');
//showWord.innerHTML = charUnderscore;
for(let i = 0; wordArray[i]; i++){
    const arrayString = wordArray[i].toString([i]);
    const appendString = document.createElement('input');
    appendString.setAttribute('type' , 'text');
    appendString.setAttribute('maxlength' , '1');
    appendString.classList.add('character');
    document.body.appendChild(appendString);

    //appendString.innerHTML = arrayString.replace(/[a-z]/g , '_'); 
    showWord.appendChild(appendString);

    console.log(appendString)
}




//da se srede stilovi 
//da se namesti samo jedno slovo
