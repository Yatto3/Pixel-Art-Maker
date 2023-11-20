"use strict";

const widthRangeElement = document.querySelector("[data-width]");
const heightRangeElement = document.querySelector("[data-height]");
const createGridButton = document.querySelector("[data-createGrid]");
const gridDisplayElement = document.querySelector("[data-grid]");
const colorInputElement = document.querySelector("[data-color]");
const eraseButton = document.querySelector("[data-erase]");
const paintButton = document.querySelector("[data-paint]");
const clearGridButton = document.querySelector("[data-clearGrid]");

let draw = false;
            
widthRangeElement.oninput = function(){
    displayRangeValue(this);
}

heightRangeElement.oninput = function(){
    displayRangeValue(this);
}

createGridButton.addEventListener("click", () => {
    createGrid();
    createGridButton.style.pointerEvents = "none";
    gridDisplayElement.focus();
});

clearGridButton.addEventListener("click", clearGrid);
paintButton.addEventListener("click", paint);
eraseButton.addEventListener("click", erase);

function clearGrid(){
    gridDisplayElement.querySelectorAll("div").forEach(div => {

        div.style.backgroundColor = "white";
        createGridButton.style.pointerEvents = "auto";
    });
    
}

function erase(){

    eraseButton.isEraseSelected = true ; 
    paintButton.isPaintSelected = false;
    colorInputElement.value = "#FFFFFF";
    eraseButton.style.border = "2px solid black";

    if (!paintButton.isPaintSelected){
        paintButton.style.border = "none";  
    }
    
}

function paint(){

    paintButton.style.border = "2px solid black";
    paintButton.isPaintSelected = true ; 

    eraseButton.isEraseSelected = false ; 

    if (!eraseButton.isPaintSelected){
        eraseButton.style.border = "none";  
    }
    
}

function createGrid(){

    let width = getWidth();
    let height = getHeight();
    
    gridDisplayElement.style.gridTemplateColumns = `repeat(${width},auto)`;
    gridDisplayElement.style.gridTemplateRows = `repeat(${height},auto)`;

    for ( let i = 0 ; i < (width * height) ; i++){

        let div = document.createElement("div");

        div.addEventListener("mouseover", () => {
            let COLOR = colorInputElement.value;
            if ( !draw ){return};
            div.style.backgroundColor = COLOR

        })
        div.addEventListener("mousedown" , () => {
            let COLOR = colorInputElement.value;
            draw = true;
            div.style.backgroundColor = COLOR
        })
        div.addEventListener("mouseup", () => {
            draw = false;
        })
        
        gridDisplayElement.appendChild(div);
    }
}

function getWidth(){

    return widthRangeElement.value;
}
function getHeight(){
    
    return heightRangeElement.value;
}

function displayRangeValue(prop){

   const parent = prop.parentNode;
   parent.querySelector("span").innerHTML = prop.value;
}