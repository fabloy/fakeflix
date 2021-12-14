
    let titlesuggestion=document.getElementById("titleSuggestion")
    let containerFilms=document.getElementById("containerFilms")
    let closeSuggestion = document.getElementById("closeSuggestion")
    
// Funzione principale che esegue una chiamata asincrona di tipo get ad un endpoint 
// che restituisce titoli e locandine di film
    function searchFilm(){
    let filmCercato=document.getElementById("myInput").value //valore inserito dall'utente nell'input
    const url = "http://www.omdbapi.com/?apikey=141d687&s="+filmCercato //api esterna
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
       data.Search.map((el)=>{ //map sull'array contente gli oggetti Film
        let title = el.Title;
        let image = el.Poster;
        
         titleSuggestion.innerHTML+=
          `<li class="filmItem" onclick="selectFilm('${title}')"> ${title} </li>`
         containerFilms.innerHTML+=
          `<div>
           <p> 
             ${title}
            </p>
            <li class="filmInContainer" style="background-image: url(${image})">
            </li>
           </div>
           `
        })
        
        document.querySelector("#myInput").addEventListener("click",function(){
            if(titleSuggestion.style.maxHeight==="0px"){
                titleSuggestion.style.maxHeight="25vh"
            }else if(titleSuggestion.style.maxHeight==="25vh"){
                titleSuggestion.style.maxHeight="0px"
                
            }
        })
    })
    }
    
    const myInput = document.getElementById("myInput")
    //dichiarazione funzione che dissolve la startpage iniziale
    function dissolveStartpage(){ 
     let startPage = document.getElementsByClassName("startpage")
     if(myInput.value.length>=3){
        startPage[0].style.opacity="0"
        closeSuggestion.style.opacity="1"
        setTimeout(()=>{
         startPage[0].style.maxHeight="0vh";
         startPage[0].style.paddingTop="0px"
        },500)
     }else{
        startPage[0].style.opacity="1"
        closeSuggestion.style.opacity="0"
        setTimeout(()=>{
         startPage[0].style.maxHeight="100vh";
         startPage[0].style.paddingTop="40vh"
        },500)
       }
     }

    //snippet di codice che esegue un controllo sul campo di input, se il campo di input ha più di 3 caratteri
    //grazie all'evento "input" modifico il dom eseguendo la funzione searchFilm() precedentemente dichiarata
     myInput.addEventListener("input", function(){
        dissolveStartpage()
        if(this.value.length>=3){
            titleSuggestion.innerHTML=""
            containerFilms.innerHTML=""
            searchFilm()
            titleSuggestion.style.opacity="1"
            closeSuggestion.style.maxHeight="3rem"
         
        }
        else{
            titleSuggestion.innerHTML=""
            titleSuggestion.style.opacity="0"
        }
    })
    

    //funzione che al click su uno dei titoli presenti nell'autocomplete 
    //modifica il dom , ovvero il contenitore delle locandine mostrando solo la scelta selezionata rieseguendo la chiamata asincrona.
    function selectFilm(titleClicked){
     document.getElementById("myInput").value=titleClicked
     const url = "http://www.omdbapi.com/?apikey=141d687&s="+titleClicked
     fetch(url)
      .then(response=>response.json())
      .then(data=>{
        data.Search.map((el)=>{
         containerFilms.innerHTML=
             `<div>
               <p> 
                ${el.Title}
               </p>
               <li class="filmInContainer" style="background-image: url(${el.Poster})">
               </li>
               </div>
             `
        })
         
             
          
          document.getElementsByClassName("filmInContainer")[0].style.padding="12rem"
          

    })
    }


    //funzione che fa scomprarire l'autocomplete
    closeSuggestion.addEventListener("click",function(){
        titleSuggestion.innerHTML=""
        this.style.maxHeight="0rem"
        titleSuggestion.style.opacity="0"
    })

