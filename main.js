const showWord = document.querySelector('.words');
const words = ['computer', 'keyboard', 'mouse', 'phone', 'laptop'];


let randomString = words[Math.floor(Math.random() * words.length)]
const wordArray = randomString.split('');
console.log(wordArray)
//const charUnderscore = randomString.replace(/[a-z]/g , '_').split('').join(' ');
//showWord.innerHTML = charUnderscore;
for(let i = 0; wordArray[i]; i++){
    const arrayString = wordArray[i].toString([i]);
    const appendString = document.createElement('div') ;
    document.body.appendChild(appendString);
    appendString.innerHTML = arrayString; 
    showWord.appendChild(appendString);

    console.log(appendString)
}




// Da prodjes kroz petlju i da ispises svako slovo u konsol logu
// Da za svako slovo napravis div u words elementu
//umesto diva da bude input 
//i staviti classu na input