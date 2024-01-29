const input = document.querySelector('input')
const btn = document.querySelector('button')
const dictionary = document.querySelector('.dictionary-app')


// https://api.dictionaryapi.dev/api/v2/entries/en/<word>


async function dictionaryfun(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json())

   return res[0] 
}

btn.addEventListener('click', fetchandCreateCard)


async function fetchandCreateCard() {
    const data = await dictionaryfun(input.value)
    
    
    let partOfSpeechArray = []
    
    
    for(let i=0;i<data.meanings.length-1 ;i++){
        partOfSpeechArray.push(data.meanings[i].partOfSpeech)
    }
    dictionary.innerHTML = `
    <div class="card">
    <div class="property">
    <span>Word : </span>
    <span>${data.word}</span>
    </div>
    
    <div class="property">
    <span>Phonetics : </span>
    <span>${data.phonetic}</span>
    </div>
    
    <div class="property">
    <span>Definition : </span>
    <span>${data.meanings[0].definitions[0].definition} </span>
    </div>
    
    <div class="property">
    <span>Examples : </span>
    <span>${data.meanings[1].definitions[0].example} </span>
    </div>
    
    <div class="property">
    <span>Part of Speech : </span>
    <span>${partOfSpeechArray.map(e=> e).join(', ')}</span>
    </div>`
}