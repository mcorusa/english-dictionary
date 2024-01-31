const unesenaRijec = document.getElementById("input-box");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl= document.getElementById("audio");

//kad koristimo fetch trebamo koristiti try-catch

async function fetchAPI(word){

    try{
        infoTextEl.display="block";
        meaningContainerEl.style.display = "none";
        infoTextEl.innerText = `Searching for a meaning of "${word}"`;
        console.log(word);
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res)=>res.json());
        //await ce cekati da se ta linija izvrsi pa tek onda nastaviti dalje
        console.log(result);

        if(result.title){
            meaningContainerEl.style.display="block";
            titleEl.innerText=word;
            meaningEl.innerText="N/A";
            audioEl.style.display="none";
        }   else{
            infoTextEl.style.display="none";
            meaningContainerEl.style.display = "block";
            audioEl.style.display="inline-flex";
            titleEl.innerText=result[0].word;
            meaningEl.innerText=result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio;
        }
    }   catch(error){
        console.log(error);
        infoTextEl.innerText = "An error occured. Try again later!";

    }
}


unesenaRijec.addEventListener("keyup",(e)=>{
    if(e.target.value && e.key=="Enter"){
        fetchAPI(e.target.value)
    }

});