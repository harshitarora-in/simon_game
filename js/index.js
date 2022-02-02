// button classes
var btnClasses=["green","red","yellow","blue"];
var gameMemory=[];
var tempMemory=[];
var levelNumber=0;
var position=0;

// Press any button to start game
$(document).on("keypress",function(){
    $("body").removeClass("game-over");
    $("h1").text("Level 1");
    // calling randomgenerator to blink first btn
    if(position==levelNumber){
        randomGenerator();
    }

});

// random number generator and blinking resp. btn
function randomGenerator(){
    position=0;
    var num=Math.floor(Math.random()*4);
    blink(btnClasses[num]);
    // adding the class generated randomly in memory
    gameMemory.push(btnClasses[num]);
    levelNumber++;
    $("h1").text("Level "+levelNumber);
}

// Clcik event listener -> flashing -> checkingSequence
$(".btn").on("click",function(event){
   var pressedId=$(this).attr("id"); 
   flash(pressedId);
   tempMemory.push(pressedId);
   checkSequence();
});

function checkSequence(){
    var gameEnded=0;    
    if(gameMemory[position]==tempMemory[position])
    {
        position++;
    }
    else
    {
        gameEnded=1;
        resetGame();
    }
    //if loop does not break then it will proceed to create new Num
    if((position===levelNumber)&&(gameEnded==0)){
        console.log("calling random");
        tempMemory=[];
        randomGenerator();
    }    
}

// reset game
function resetGame()
{
    tempMemory=[];
    gameMemory=[];
    position=0;
    levelNumber=0;
    $("body").addClass("game-over");
    $("h1").text("Game Over press any key to restart");
}

// blink animation function
function blink(className){
        $("."+className).fadeOut();
        setTimeout(() => {
            $("."+className).fadeIn();
        }, 80);
}

// flash animation function
function flash(className){
        $("#"+className).addClass("pressed")
        setTimeout(() => {
            $("#"+className).removeClass("pressed")
        }, 120);
}