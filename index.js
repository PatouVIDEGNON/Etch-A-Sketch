console.log("jesus")

const couleur_defaut = "#003333"
const mode_defaut = "couleur";
const default_size = 16;

let couleurActuelle = couleur_defaut;
let modeActuelle = mode_defaut;
let tailleActuelle = default_size;

function setCouleurActuelle(nouvelleCouleur){
    couleurActuelle = nouvelleCouleur;
    return console.log(nouvelleCouleur)
}

function setModeActuelle(nouvelleMode) {
    modeActuelle = nouvelleMode;
    return console.log(nouvelleMode)

}

function setTailleActuelle(nouvelleTaille) {
    tailleActuelle = nouvelleTaille;

}


const pickerCouleur = document.querySelector("#colorPicker");
const couleurBtn = document.querySelector('#colorBtn');
const arcEnCielBtn = document.querySelector("#rainbowBtn");
const effaceurBtn = document.querySelector("#eraserBtn ");
const valeurTaille = document.querySelector("#size-value");
const glisseurBtn = document.querySelector("#sizeSlider");
const MettreAJour = document.getElementById('clearBtn')
const grid = document.querySelector("#grid");

pickerCouleur.oninput = (e) => setCouleurActuelle(e.target.value);

couleurBtn.onclick = () => setModeActuelle("couleur");
arcEnCielBtn.onclick = () => setModeActuelle('arEnCiel');
effaceurBtn.onclick = () => setModeActuelle('effacer');
MettreAJour.onclick = () => reloadGrid();
glisseurBtn.onmousemove = (e) => updateValueDeLaTaille(e.target.value);
glisseurBtn.onchange = (e) => changeLesDimensions(e.target.value);

 let mouseDown = false;
 document.body.onmousedown = () => (mouseDown = true);
 document.body.onmouseup = () => (mouseDown = false);

 function changeLesDimensions(value) {
     reloadGrid();
     setTailleActuelle(value)
     updateValueDeLaTaille(value);

 }

 function updateValueDeLaTaille(value) {
valeurTaille.innerHTML = `${value} x ${value}`;
 }


 function reloadGrid() {
     clearGrid()
     setupGrid(tailleActuelle)
 }
 
function clearGrid() {
    grid.innerHTML= " ";
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size*size; i++ ){
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener("mouseover", changeColor);
        // gridElement.addEventListener("mousedown", changeColor);
        grid.appendChild(gridElement);
    }
}

function changeColor(e) {
            if(e.type === 'mouseover' && !mouseDown) return
    if(modeActuelle === "arcEnCiel"){
        const randomR = Math.floor(Math.random()*256);
        const randomG = Math.floor(Math.random()*256);
        const randomB = Math.floor(Math.random()*256);
        e.target.style.backgroundColor =  `rgb(${randomR}, ${randomG}, ${randomB}) `
    } else if (modeActuelle === 'couleur') {
        e.target.style.backgroundColor = couleurActuelle;
    }else if (modeActuelle === "effacer") {
        e.target.style.backgroundColor = '#fefefe';
    }

}


function activeButton(nouvelleMode) {
    if(modeActuelle === "arcEnCiel"){
        arcEnCielBtn.classList.remove('active');
    } else if (modeActuelle === "couleur") {
        couleurBtn.classList.remove('active');
    } else if(modeActuelle === 'effacer'){
        effaceurBtn.classList.remove('active');
    }
}

window.onload = () => {
    setupGrid(default_size);
     activeButton(mode_defaut)

}


//Voir et s'inspirer de resutat de Tarek Visch
//https://github.com/TarekVisch/etch-a-sketch/blob/master/app.js
// https://tarekvisch.github.io/etch-a-sketch/