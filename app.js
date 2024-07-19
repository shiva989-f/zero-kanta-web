let boxesEl = document.querySelectorAll(".box")
let resetBtnEl = document.querySelector(".reset-btn")
let popupEl = document.querySelector(".popup")
let closeEl = document.querySelector(".close")
let winnerEl = document.querySelector(".winner")

// turnX true is player1 turn else player2 turn
let turnX = true;

let x = "X";
let o = "O";

const winPositions = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
]

let gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];


boxesEl.forEach((box, index)=>{
    box.addEventListener("click", ()=>{
        // If box is empty then player can use that box
        if(gameState[index] === 0){
            if (turnX) {
              box.innerText = x;
              gameState[index] = 1;
              turnX = false;
            } else {
              box.innerText = o;
              gameState[index] = 2;
              turnX = true;
            }
            let clickSound = new Audio("/assets/click.mp3")
            clickSound.play()
            // to disable button after one time click but we are using div so this will not work
            // box.disabled = true;
            checkWinner(box);
        }
    })
})

resetBtnEl.addEventListener("click", ()=> {
  resetGame();
})

const checkWinner = ()=> {
    for (let pattern of winPositions) {
        // Explain:- For loop at 4th iteration
        // boxesElEl[pattern[2]] = 6, so 6th box of grid will be selected, Because in winPositions[4][2] = 6

        let box1 = boxesEl[pattern[0]];
        let box2 = boxesEl[pattern[1]];
        let box3 = boxesEl[pattern[2]];
        let border = "5px solid #00fc0d";
        
        if (
          box1.innerText !== "" &&
          box2.innerText !== "" &&
          box3.innerText !== ""
        ) {
          if (
            box1.innerText === box2.innerText && box2.innerText === box3.innerText && box3.innerText === x ) {
            console.log(`X is winner`);
            showPopup("X")
            box1.style.border = border;
            box2.style.border = border;
            box3.style.border = border;
          } else if (
            box1.innerText === box2.innerText && box2.innerText === box3.innerText && box3.innerText === o 
          ) {
            console.log(`O is winner`);
            showPopup("O");
            box1.style.border = border;
            box2.style.border = border;
            box3.style.border = border;
          }
        
        }
    }
}

// On click of Close btn the popup will be closed
closeEl.addEventListener("click", ()=>{
  closePopup()
})

// Reset Game
const resetGame = ()=>{
  boxesEl.forEach((box)=>{
    box.innerHTML = "";
    box.style.border = "";
    turnX = true;
    gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    // Enable all pointer events again on the div boxes
    enableBoxes()
  })
}

// ShowPopup shows the winner
const showPopup = (winner)=>{
  popupEl.style.display = "block"
  winnerEl.innerText = `${winner} is the winner.`
  // Disable boxes : any pointer event on div like mouse click, touch and any pointer event is disabled
  disableBoxes()
}

// Close the popup window
const closePopup = ()=>{
  popupEl.style.display = "none"
}

const disableBoxes = ()=> {
  boxesEl.forEach((box) => {
    box.style.pointerEvents = "none";
  });
}

const enableBoxes = ()=> {
  boxesEl.forEach((box) => {
    box.style.pointerEvents = "auto";
  });
}