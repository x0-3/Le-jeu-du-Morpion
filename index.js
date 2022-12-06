const cells =document.querySelectorAll(".cell");
const statusText =document.querySelector("#statusText");
const restartBtn =document.querySelector("#restartBtn");
const winConditions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
let options =["" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,""];
let currentPlayer = "X";
let running = false;

let points=0;

const highScores = JSON.parse (localStorage.getItem("highScores")) || [];

const maxHighScores = 3;

const highScoresList=document.getElementById("highScoresList");
console.log(highScores);//remove when done



initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked)),
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options [cellIndex] !=""|| !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();

}

function updateCell(cell, index){
    options[index] =currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++){
        const condition =winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC ==""){
            continue;
        }
        if (cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        } 
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running=false;
        points+=5;// if game won then add 5
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running=false;
    }
    else{
        changePlayer();
    }
}

function saveHighScore(){
    const score = {
        name: currentPlayer,
        score:points,
    };
    highScores.push(score);
    highScores.sort( (a,b)=> b.score -a.score)//sort the score from higest to lowest
    highScores.splice(3);//only the top 5 highest score 

    localStorage.setItem("highScores", JSON.stringify(highScores));//stores the data in localStorage

    //localStorage.clear(); //remove later
    console.log(highScores);//remove later

    //get the data stored in localStorage to show on the scoreboard
    highScoresList.innerHTML =highScores
    .map((score) => `<li>${score.name}   :      ${score.score} pts`)
    .join("");
}



