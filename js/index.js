
/******************************variables************************************/ 
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

/******************************************************************************/ 

initializeGame();//start game
/***************************************************************************/ 

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked)),//when cell is clicked then run cellClicked
    restartBtn.addEventListener("click", restartGame)// restart game when restartBtn clicked
    
    statusText.textContent = `${currentPlayer}'s turn`;// write the current player X
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");//get cellIndex from html

    if(options [cellIndex] !=""|| !running){//if cells are empty
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

/**************************update cells when they're clicked*********************************************************/ 
function updateCell(cell, index){
    options[index] =currentPlayer;
    cell.textContent = currentPlayer;
}

/*****************************************alternate between player X and player O*************************************/
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";// alternate between X and O 
    statusText.textContent = `${currentPlayer}'s turn`;// write the current player
}

/***********************check winner if conditions are checked************************************************************************/ 
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
            $("#cell").click(function(){
            $(".cell").fadeIn("slow");
            });
            break;
        } 
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;// write who won
        running=false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running=false;
    }
    else{
        changePlayer();
    }
}

/********************************restart game when restartBtn clicked***********************************************************/ 
function restartGame(){
    currentPlayer = "X" ;
    let options =["" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
/*********************************jquery animation********************************************************/ 

$(document).ready(function(){

    $("#restartBtn").click(function(){//when restartBtn clicked
        $("#restartBtn").animate({
            width:'100px',
            height: '100px'
        },"slow");
    })

    //reset to default
    $("#restartBtn").click(function(){//when restartBtn clicked
        $("#restartBtn").animate({
            width:'110px',
            height: '30px'
       });
    })
    
});

/**********************************************************************************************/ 
 


