//1) Leeres Array zum Speichern der aufgedeckten Karten (openedCards)
//2) Karten richtig erzeugen (type)[1,1,2,2,3,3,4,4.........8,8]
//3) Karten mischen (shuffle)
//4) Karten zum Deck hinzufügen
//5) Klick Eventhandler

const cardContainer = document.querySelector("#card-container");
const button = document.querySelector("button");

const resetGame = () => {
  window.location.reload(true);
};
button.addEventListener("click", resetGame);




//                2                //
let Zahlen= [];

for(let i = 1; i <= 10; i++){
  Zahlen.push(i) + Zahlen.push(i)
  
}



//               3                //

const shuffleArray = (arr) => {
  let tempArr = [...arr];
  const shuffledArr = [];
  while (tempArr.length > 0) {
    let idx = Math.floor(Math.random() * tempArr.length);
    shuffledArr.push(tempArr[idx]); //idx ist ne Property
    tempArr.splice(idx, 1); 
  }
  return shuffledArr;
};
//Function  in variable speichern
const shuffledCards = shuffleArray(Zahlen);

//" "
const scenes = [];
let comparison = [];


//                     5                 //
const resetComparison = () => {
  comparison.length = 0;
};


//Hier beginnt FUNCTION! In der Function geht es darum, damit sich die Karten schließen, nachdem 2 ungleiche Zahlen vorkommen. 
//(Nachdem 2 Karten sich öffnen, wird ein setTimeout aktiviert, damit sich andere Karten nicht öffnen während 2 geöffnete Karten gibt)
const runComparison =  () => {
  let a = comparison[0];
  let b = comparison[1];

  scenes.forEach((el) => {
    el.removeEventListener("click", handleClick);
  });

  if (a.Zahl === b.Zahl) {
    setTimeout(() => {
      scenes.filter((el) => {
        if (el.id !== a.id && el.id !== b.id) {
          el.addEventListener("click", handleClick);
        }
      });

      let overlayA = document.getElementById(`overlay-${a.id}`);
      overlayA.classList.remove("hidden");

      let overlayB = document.getElementById(`overlay-${b.id}`);
      overlayB.classList.remove("hidden");

      resetComparison();
    }, 1000);
  } else {
    setTimeout(() => {
      scenes[a.id].children[0].classList.toggle("is-flipped");
      scenes[b.id].children[0].classList.toggle("is-flipped");

      scenes.forEach((el) => el.addEventListener("click", handleClick));

      resetComparison();
    }, 1000);
  }
};
//HIER ENDET


const addToComparison = (id) => {
  if (comparison.length < 2) {
    comparison.push({ id: id, Zahl: shuffledCards[id] });
  }
  if (comparison.length === 2) {
    runComparison();
  }
};


//Damit sich die Karten umdrehen
const flipCard = (id) => {
  let target = document.getElementById(id).children[0];
  target.classList.toggle("is-flipped");
  if (!comparison.length) {
    addToComparison(id);
  } else if (id !== comparison[0].id) {
    addToComparison(id);
  } else {
    resetComparison();
  }
};

//Karten werden erstellt
const handleClick = (e) => {
  flipCard(e.currentTarget.id);
};

//Hier haben wir die Karten erstellt
const createCard = (el, idx) => {
  let scene = document.createElement("div");
  scene.classList.add("scene");
  scene.id = idx;

  let card = document.createElement("div");
  card.classList.add("card");
  scene.appendChild(card);

  let cardFront = document.createElement("div");
  cardFront.classList.add("card-face");
  cardFront.classList.add("front");
  card.appendChild(cardFront);

  let cardBack = document.createElement("div");
  cardBack.classList.add("card-face");
  cardBack.classList.add("back");
  cardBack.innerHTML = `<p>${el}</p>`;
  card.appendChild(cardBack);

  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.classList.add("hidden");
  overlay.id = `overlay-${idx}`;
  scene.appendChild(overlay);

  scene.addEventListener("click", handleClick);
  cardContainer.appendChild(scene);
};



const createScenesArray = () => {
  Array.from(cardContainer.children).forEach((el) => {
    scenes.push(el);
  });
};

//Damit Karten angezeigt werden
const displayGame = (arr) => {
  arr.forEach((el, idx) => {
    createCard(el, idx);
  });
};

displayGame(shuffledCards);
createScenesArray();