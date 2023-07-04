import {animeData} from './data.js'
const animeGenere = document.getElementById("anime-genere")
const generateBtn = document.getElementById("get-anime-btn")
const isRatedCheckbox = document.getElementById("rated-18-option")
const animeModal = document.getElementById("anime-modal")
const animeModalIner = document.getElementById("anime-modal-inner")
const modalCloseBtn = document.getElementById("anime-modal-close-btn")

generateBtn.addEventListener('click', renderAnime)

let selectedGenre = null;

function getGenereArray(animes){
  const genereArray = []
  
  for (let anime of animes){
    for (let genere of anime.genereTags){
        if (!genereArray.includes(genere)){
      genereArray.push(genere)
      }
    }
  }
  return genereArray
}


function renderAnimeGenere(animes){
  let genereItems = ``
  const generes = getGenereArray(animes)
  for (let  genere of generes){
    genereItems += `<div class="content"
                    id = "${genere}">
                    ${genere}
                    </div>`
  }
   animeGenere.innerHTML = genereItems
}
renderAnimeGenere(animeData)

animeGenere.addEventListener('click', function(e){
    const genreId = e.target.id;

  if (selectedGenre !== null && selectedGenre !== genreId) {
    document.getElementById(selectedGenre).classList.remove('click');
  }

  document.getElementById(genreId).classList.toggle('click');
  selectedGenre = genreId === selectedGenre ? null : genreId;
})
    
    function getMatchingAnimesArray(){     
    if(document.querySelector('.click')){
        const getMatchingAnime = document.querySelector('.click').innerText.trim();
       const isRated18Check = isRatedCheckbox.checked
        
        const matchingAnimesArray = animeData.filter(function(anime){
            return anime.genereTags.includes(getMatchingAnime) && (isRated18Check ? anime.isRated18 : !anime.isRated18)
        })
        return matchingAnimesArray
        }
            }
            
           function getsingleAnimeObject(){
               
                const animeArray = getMatchingAnimesArray()
                
                if (animeArray.length === 1){
                    return animeArray[0]
                    
                }
                else {
                const randomIndex = Math.floor(Math.random() * animeArray.length);
                return animeArray[randomIndex];
                }
            }
            
            
        function renderAnime(){
            const animeObject = getsingleAnimeObject()
            
            animeModalIner.innerHTML = 
            `<img 
        class="inner-img" 
        src="./images/${animeObject.image}"
        title="${animeObject.title}"
        >`
        animeModal.style.display ="flex"
        }
        modalCloseBtn.addEventListener('click',function(){
            animeModal.style.display ="none"
        })