var tds         = Array.from(document.querySelectorAll('td'));
var row_1       = Array.from(document.querySelectorAll(".row01 "));
var row_2       = Array.from(document.querySelectorAll(".row02 "));
var row_3       = Array.from(document.querySelectorAll(".row03 "));
var column_1    = Array.from(document.querySelectorAll(".column1 "));
var column_2    = Array.from(document.querySelectorAll(".column2 "));
var column_3    = Array.from(document.querySelectorAll(".column3 "));
var diagonal_1  = Array.from(document.querySelectorAll(".diagonal1"));
var diagonal_2  = Array.from(document.querySelectorAll(".diagonal2"));
var tb          = Array.from(document.getElementById('tb'));

var p1_score     = document.querySelector(".p1_score");
var p2_score     = document.querySelector(".p2_score");
var replay       = document.querySelector(".replay");
var reset        = document.querySelector(".reset");
var draw_matches = document.querySelector(".draw_matches");
var undo         = document.querySelector(".undo_Btn");
var test         = document.querySelector(".test_Btn");
var test2        = document.querySelector(".test2_Btn");


var yourMoveX   =[];
var yourMoveY   =[];
let state       = {grid: [[],[],[]]};
var gridPreview =[[],[],[]];
var newState =[];
var turn = 1;
var index = 0;
var r = 2;
var c = 2;
/*Debug Jquery*/
$(document).ready(function(){
             if (jQuery) {  
               // jQuery is loaded  
               console.log("Yeah, jquery is working !");
             } else {
               // jQuery is not loaded
               alert("Doesn't Work");
             }
          });

/*Initialize Board Array */
/*var grid= [
    [],
    [],
    []];*/

   

// Initialize the grid
for (var i=0; i<=r; i++) { for (var j=0; j<=c; j++) { state.grid[i][j] =0; } }

for (var i=0; i<=r; i++) { for (var j=0; j<=c; j++) { gridPreview[i][j]=0; } }
 



/*
function saveState(){
    
}
test2.addEventListener("click", function(){
    saveState();
});
*/



/*Popup DOM */
$ = function (id) {
    return document.getElementById(id);
};
var show = function (id) {
    $(id).style.display = 'block';
};
var hide = function (id) {
    $(id).style.display = 'none';
};
var disableClick = function(id){
    $(id).attr('disabled');
}
var enableClick = function(id){
    $(id).prop("disabled",false);
}
disableClick('statisticList')
show('popup4');
/*RESET LOGIC*/

function previewGame(id){
  //DEBUG FUNTION
 /*gridPreview= [
    [1,0,1],
    [0,1,0],
    [0,1,0]];*/
 gridPreview = newState[id].slice();
    console.log(gridPreview)
    state.grid=gridPreview.slice();
    for (var x=0; x<=r; x++) {
        for (var y=0; y<=c; y++) {
                if (state.grid[x][y]==1) {
       document.getElementById("cell_"+x+"_"+y).textContent="X";
        }      
        else if (state.grid[x][y]==2) {
       document.getElementById("cell_"+x+"_"+y).textContent="O";
        }         
        else if (state.grid[x][y]==0) {
       document.getElementById("cell_"+x+"_"+y).textContent="";
        } else{
            return alert("error");
            console.log(state.grid);
        }
        }
    }
 
}
                     
function resetHelper() {
    clearList();
    for (i = 0; i < tds.length; i++) {
        tds[i].textContent = "";
        tds[i].classList.remove("win");

    }
    for (var i=0; i<=r; i++) {
        for (var j=0; j<=c; j++) {
        state.grid[i][j]=0;
        }
    }
    yourMoveX =[];
    yourMoveY =[];
    console.log(yourMoveX +yourMoveY);
    //replay.style.background = "#c8d06d6";
    turn = 1;
    newState=[];
    show('pTimer');
}
/*replay.addEventListener("click", function () {
    resetHelper();
    stopwatch.restart();
    console.log(grid);
})*/
reset.addEventListener("click", function () {
    resetHelper();
    p1_score.textContent = 0;
    p2_score.textContent = 0;

    p1_score.classList.remove("font-size");
    p2_score.classList.remove("font-size");
    console.log(state.grid);
    clearMatchTimer();
    endMatchTimer();
    endThinkTimer();
    show("popup4");
});



function undoFunction(){
    
    var iX = parseInt(yourMoveX[yourMoveX.length-1]);
    var jY = parseInt(yourMoveY[yourMoveY.length-1]);
      var x = document.createElement("LI");
    x.className ='li_statistic';
    if(isNaN(yourMoveX[yourMoveX.length-1]) && isNaN(yourMoveY[yourMoveY.length-1])){
    var t = alert("game not started");
     
} else {
        var t = document.createTextNode("Player"+turn+" undo move X"+parseInt(yourMoveX[yourMoveX.length-1])+"Y"+parseInt(yourMoveY[yourMoveY.length-1]));
        x.appendChild(t);
}
    document.getElementById("statisticList").appendChild(x);
    console.log(state.grid[iX][jY]);
            if (turn == 1) {
            if (state.grid[iX][jY]==2) {
                
                document.getElementById("cell_"+iX+"_"+jY).textContent="";
                state.grid[iX][jY]=0;
                yourMoveX.pop();
                yourMoveY.pop();
/*                yourOldMoveX.pop();
                yourOldMoveY.pop();*/
                turn = 2;
                 
            }
        }
            if (turn == 2) {             
            if (state.grid[iX][jY]==1) {
               document.getElementById("cell_"+iX+"_"+jY).textContent="";
               state.grid[iX][jY]=0;
               yourMoveX.pop();
               yourMoveY.pop();
               turn=1;

            }
        }
 
}
undo.addEventListener("click" ,function(){
    if ( turn ==1 || turn==2){
    undoFunction();} else {
        alert("match ended")
    }
});
 
/*Movement + Timer List */
function gameStatistic() {
  //if(   state.grid[yourMoveX][yourMoveY] ==0   ){
  var i = newState.length;
  var x = document.createElement("LI");
  x.className ='li_statistic';
    
  var t = document.createElement('button');
  t.textContent =((i)+" Player"+turn+" moved to cell X"+parseInt(yourMoveX[yourMoveX.length-1])+"Y"+parseInt(yourMoveY[yourMoveY.length-1]));
  x.appendChild(t);
  x.addEventListener("click",function(){
      previewGame(i-1);
       
  })
  document.getElementById("statisticList").appendChild(x);


}


function clearList() {
    var ol_list = document.getElementById("statisticList");
    //ol_list.removeChild(ol_list.childNodes[0]);
    while (ol_list.hasChildNodes()) {
    ol_list.removeChild(ol_list.firstChild);
  }
}
function clearMatchTimer(){
     
    var mTimer = document.getElementById("matchEndAt");
    while (mTimer.hasChildNodes()) {
    mTimer.removeChild(mTimer.lastChild);}
 
}

 
function startGameTimer(){
    stopwatch.start();
    stopwatch2.start();
}
function endMatchTimer (){
    stopwatch2.reset();
    stopwatch2.stop();

}
function endThinkTimer (){
    stopwatch.reset();
    stopwatch.stop();
}
function restartMatchTimer (){
    stopwatch.reset();
    stopwatch2.start();

}
 


/*Check XO Logic */

function textExtractor(arr) {
    var textContentArray =[];
    for (i = 0; i < arr.length; i++) {
        textContentArray.push(arr[i].textContent);
    } 
    return textContentArray;
}
 

function history1() {
    let obj = JSON.parse(JSON.stringify(state.grid)); // copy of object
    newState.push(obj);
    console.log(newState);
}

function allSame(arr, x) {
    if (arr[0] !== x) {
        return false;
    } else {
        first = arr[0];
    }
    var same = true;
    for (i = 1; i < arr.length; i++) {
        if (arr[i] !== first) {
            return false;
        }
    }
    
    return same;
}

function allFilled(td) {
    var filled = true;
    for (i = 0; i < td.length; i++) {
        if ((td[i].textContent !== "X") && (td[i].textContent !== "O")) {
            return false;
        }
    }
    return filled;

}


function checkWin(element) {
    
    if (allSame(textExtractor(row_1), element)) {
        return (row_1);
    } else if (allSame(textExtractor(row_2), element)) {
        return (row_2);
    } else if (allSame(textExtractor(row_3), element)) {
        return (row_3);
    } else if (allSame(textExtractor(column_1), element)) {
        return (column_1);
    } else if (allSame(textExtractor(column_2), element)) {
        return (column_2);
    } else if (allSame(textExtractor(column_3), element)) {
        return (column_3);
    } else if (allSame(textExtractor(diagonal_1), element)) {
        return (diagonal_1);
    } else if (allSame(textExtractor(diagonal_2), element)) {
        return (diagonal_2);
    } else {
        
        return false;
    }

}

function winningTheme(array) {
    for (i = 0; i < array.length; i++) {
        array[i].classList.add("win");
    }
    
}
function comboFunction(){
    history1();
    gameStatistic();
    stopwatch.lap();
    stopwatch2.lap3();
    stopwatch.restart();
}
function comboFunction2(){
    stopwatch2.lap2();
    endMatchTimer();
    endThinkTimer();
    hide('pTimer');
}
 
function clickCell(x,y) { 
     
    
    if (turn === 1) {
        if (state.grid[x][y]==0) {
            document.getElementById("cell_"+x+"_"+y).textContent="X";
            state.grid[x][y]=1;
            yourMoveX.push(x);
            yourMoveY.push(y);
            turn = 2;
            comboFunction()
            
        }
        winArray = checkWin("X");
        if (winArray) {
                winningTheme(winArray);
                p1_score.textContent = Number(p1_score.textContent) + 1;
                p1_score.classList.add("font-size");
                turn=0;
                comboFunction2();
                show('popup1');

                 
        } 
        if (allFilled(tds) && (!winArray)) {
            stopwatch2.lap2();
               
            show('popup2');
            console.log(state.grid);
             endMatchTimer(); 
            }
    }
    if (turn === 2) {
        if (state.grid[x][y]==0) {
       document.getElementById("cell_"+x+"_"+y).textContent="O";
       state.grid[x][y]=2;
            yourMoveX.push(x);
            yourMoveY.push(y);
            comboFunction()
            turn=1;
 
             
        }
        winArray = checkWin("O");
        if (winArray) {
                winningTheme(winArray);
                p2_score.textContent = Number(p2_score.textContent) + 1;
                p2_score.classList.add("font-size");
                turn = 0;
                comboFunction2();
                show('popup3');

            
        }
  
     }
    
        
    console.log(yourMoveX);
    console.log(yourMoveY);
}
 