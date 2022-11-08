const cube = document.getElementById("cube");
var r = document.querySelector(':root');
const turn = document.getElementById("turn");
const btns = document.querySelectorAll('.bkey');

const settingBtn = document.querySelector(".setting"); 

let index = 2;
let deg = 0;
let number = 2;


let turnDeg = 0;    
var thinking;

var currentNumber = 0;
var currentSum = 0;
var playerTurn = false;
var canGetInput = false;
var gameOver = true;

var maxNum = 24;
var maxRange = 9;
var flag = false;

var nextMaxNumber = 40; 
var nextMaxRange = 9 // 1 - 9
var nextStartingTrun = 0; // 0 => Randomly, 1 => Player, 2 => Computer

var remainder = maxNum % (maxRange + 1); 

let restartGame = false;
const restartBtn = document.querySelector(".restart");

let typingInInputBox = false; // checked if the user using input 



let playerInAnimationA, playerInAnimationB;
let computerInAnimationA,  computerInAnimationB, computerInAnimationC;
let turnAnimationA, turnAnimationB, turnAnimationC;
let SwitchAnimationA, SwitchAnimationB, SwitchAnimationC;


function playerInput(input){
    if (canGetInput)
    {
        canGetInput = false;
        currentNumber = parseInt(input);
        // ?enterdBtn.disabled = true;
        document.querySelector(".he2").style.opacity = "1";
        document.querySelector(".he2").innerHTML = "<h1>+"+currentNumber+"</h1>";
        document.querySelector(".he2").style.transform = "translateY(-30px)";
        playerInAnimationA =setTimeout(function() {	
            document.querySelector(".he2").style.opacity = "0";
            playerInAnimationB =setTimeout(function() {	
                document.querySelector(".he2").style.transform = "translateY(0px)";
            }, 2000);  
        }, 1200);  
        r.style.setProperty("--cube-color-player-side","#29ab3c");
        r.style.setProperty("--color1","#29c040");
        r.style.setProperty("--color2","#32ed4e");
        r.style.setProperty("--textColor","#333");
        calcNim();
    }
    
}
function calcTheNumber(){
    flag = true
    if (currentSum % 10 === remainder)  
    {
        currentNumber = Math.trunc(Math.random() * maxRange) + 1;

    
    }else if (currentSum === 0) { 

        currentNumber = remainder; 

    } else if (currentSum % 10 < remainder) { 

      currentNumber = remainder - (currentSum % 10);

    } else if (currentSum % 10 > remainder) { 

      currentNumber = remainder + (maxRange + 1) - currentSum;

    }
    return currentNumber;
  };

function compTurn(){


    if (flag === false) 
        currentNumber = calcTheNumber();
    else
    {
        currentNumber = (maxRange + 1) - ((currentSum - remainder) % (maxRange + 1))
        if (currentNumber > maxRange)
            currentNumber = Math.trunc(Math.random() * maxRange) + 1;

        
            
    }
        
    


    
    computerInAnimationA = setTimeout(function() {	
    
        document.querySelector(".he1").style.opacity = "1";
        document.querySelector(".he1").innerHTML = "<h1>+"+currentNumber+"</h1>";
        document.querySelector(".he1").style.transform = "translateY(-30px)";
        computerInAnimationB = setTimeout(function() {	
            document.querySelector(".he1").style.opacity = "0";
            computerInAnimationC = setTimeout(function() {	
                document.querySelector(".he1").style.transform = "translateY(0px)";
            }, 2000);  
        }, 1200);  
        r.style.setProperty("--cube-color-player-side","#ab2929");
        r.style.setProperty("--color1","#c02929");
        r.style.setProperty("--color2","#ed3232");
        r.style.setProperty("--textColor","#333");
        calcNim();

    }, Math.random() * (700 - 400) + 400);

}


function calcNim () {


    currentSum += currentNumber;
    if (currentSum > maxNum)
        currentSum = maxNum;
    
    if (index === 0)
        index = 3;
    else
        index --;

    deg+= 90
    cube.style.transform = "rotateX("+deg+"deg)";
    
    if (number === maxNum)
    {
        document.querySelectorAll(".N")[index].innerText = "🏆";
        number++;
    }
    else if (number -2 < currentSum)
    {
        ++number
        if (number <= maxNum)
            document.querySelectorAll(".N")[index].innerText = number;
        else
            document.querySelectorAll(".N")[index].innerText = "";
    }
        

        
    

    
    if (number - 2 >= currentSum)
    {

        
        if (currentSum === maxNum) {

            
            document.querySelector(".tbhet").style.opacity = "1";
            document.querySelector(".tbhet").style.transform = "translateY(-15px)";
                
            turnAnimationA =setTimeout(function() {	
                deg+= 90;
                cube.style.transform = "rotateX("+deg+"deg)";
                turnAnimationB =setTimeout(function() {
                            gameOver = true;
                }, 1000);
            }, 900);
        } else if (currentSum < maxNum) {
            playerTurn = !playerTurn;
            turnAnimationC = setTimeout(function() {	
                ChoosePlayer();
            }, 900);
            
        }
    }
    else
    {

    

        thinking = setInterval(() =>{
            if (index === 0)
                index = 3;
            else
                index --;

                deg+= 90;
                cube.style.transform = "rotateX("+deg+"deg)"
                
                
                if (number === maxNum)
                {

                    document.querySelectorAll(".N")[index].innerText = "🏆";
                    number++;
                }
                else if (number -2 < currentSum)
                {
                    ++number
                    if (number <= maxNum)
                        document.querySelectorAll(".N")[index].innerText = number;
                    else
                        document.querySelectorAll(".N")[index].innerText = "";
                }
                    
                

        
            if (number - 2 >= currentSum)
            {
                clearInterval(thinking);
                
                if (currentSum === maxNum) {

                    
                    document.querySelector(".tbhet").style.opacity = "1";
                    document.querySelector(".tbhet").style.transform = "translateY(-15px)";
                
                    turnAnimationA = setTimeout(function() {	
                        deg+= 90
                        cube.style.transform = "rotateX("+deg+"deg)";
                        turnAnimationB = setTimeout(function() {
                            gameOver = true;
                        }, 1000);
                        
                    }, 900);
                } else if (currentSum < maxNum) {
                    playerTurn = !playerTurn;
                    turnAnimationC = setTimeout(function() {	
                        ChoosePlayer();
                    }, 900);
                    
                }
            }
                
        },630)
    }




}



function ChoosePlayer() {


    if (playerTurn)
    {
        
        turnDeg -= 180;
        turn.style.transform = "rotateX("+turnDeg+"deg)";

        r.style.setProperty("--cube-color-player-side","#373737")
        r.style.setProperty("--color1","#434343")
        r.style.setProperty("--color2","#535353")
        r.style.setProperty("--textColor","#ffff")
        canGetInput = true;
        
        document.querySelector(".het1").style.opacity = "1";
        document.querySelector(".het1").style.transform = "translateY(-30px)";
        SwitchAnimationA = setTimeout(function() {	
            document.querySelector(".het1").style.opacity = "0";
            SwitchAnimationB = setTimeout(function() {	
                document.querySelector(".het1").style.transform = "translateY(0px)";
                
            }, 2000);  
        }, 1200);  
        
    }   
        
        
    else
    {
        turnDeg -= 180;
        turn.style.transform = "rotateX("+turnDeg+"deg)"
        r.style.setProperty("--cube-color-player-side","#373737")
        r.style.setProperty("--color1","#434343")
        r.style.setProperty("--color2","#535353")
        r.style.setProperty("--textColor","#ffff")
        document.querySelector(".het2").style.opacity = "1";
        document.querySelector(".het2").style.transform = "translateY(-30px)";
        
        SwitchAnimationA = setTimeout(function() {	
            document.querySelector(".het2").style.opacity = "0";
            SwitchAnimationB = setTimeout(function() {	
                document.querySelector(".het2").style.transform = "translateY(0px)";
            }, 2000);  
        }, 1200); 
        SwitchAnimationC = setTimeout(function() {	
            compTurn();
        }, 100);  
        
        
    }
    




}



function setupGame()
{
    canGetInput = false;
    maxNum = nextMaxNumber;
    maxRange = nextMaxRange;
    remainder = maxNum % (maxRange + 1); 
    flag = false;
    index = 2;
    number = 2;
    deg = 0;
    cube.style.transform = "rotateX(0deg)";
    document.querySelector(".tbhet").style.opacity = "0";
    document.querySelector(".tbhet").style.transform = "translateY(0px)";
    document.querySelectorAll(".N")[0].innerText = 0;
    document.querySelectorAll(".N")[3].innerText = 1;
    document.querySelectorAll(".N")[2].innerText = 2;
    document.querySelectorAll(".N")[1].innerText = 3;
    currentSum = 0;
    turnDeg = -180;
    fleg = false;


    // SETUP stats gui:

    document.querySelector(".maxRangeDiv").innerHTML = 'Range: <i>1 - '+ maxRange +'</i><br>';
    document.querySelector(".maxNumDiv").innerHTML = 'Max Number: <i>'+ maxNum +'</i><br>';


    playerTurn = Math.floor(Math.random()* 2);
    document.querySelector(".startingTurnDiv").innerHTML = 'First Turn: <i>Randomly</i>';
    if (nextStartingTrun === 1)
    {
        playerTurn = 1;
        document.querySelector(".startingTurnDiv").innerHTML = 'First Turn: <i>You</i>';
    }   
    else if (nextStartingTrun == 2)
    {
        playerTurn = 0;
        document.querySelector(".startingTurnDiv").innerHTML = 'First Turn: <i>Computer</i>';
    }
        


    if (playerTurn)
        turnDeg = 0;

    setTimeout(function() {	
        document.getElementById("comp").innerHTML = '<i class="fa-solid fa-display"></i>' 
        document.getElementById("player").innerHTML = '<i class="fa-solid fa-user"></i>' 
    }, 200);         

   	
    ChoosePlayer();
    
    
}





let inAninationShake = false;
document.addEventListener('keydown', (event) => {
    if (!typingInInputBox)
    {

    
        if (gameOver){
            gameOver = false;
            setupGame();
        }
        else
        {
            if (/^[1-9]+$/.test(event.key) && +event.key <= maxRange)
                playerInput(event.key)
            else
            {
                if (!inAninationShake)
                {
                    inAninationShake = true;
                    document.querySelector(".container").classList.add("apply-shake");
                    setTimeout(function() {	
                        document.querySelector(".container").classList.remove("apply-shake");
                        inAninationShake = false;
                    }, 2000); 
                }
                
            }
        }
    }
    

    
}, false);

let inAnination = false;
document.querySelector(".container").addEventListener("mouseover",()=>{
    
    if(gameOver)
    {
        
        if(!inAnination)
        {
            inAnination = true
            document.querySelector(".bhet").style.opacity = "1";
            document.querySelector(".bhet").style.transform = "translateY(-30px)";
            setTimeout(function() {	
                document.querySelector(".bhet").style.opacity = "0";
                setTimeout(function() {	
                    document.querySelector(".bhet").style.transform = "translateY(0px)";
                    setTimeout(function() {	
                        inAnination = false;
                    }, 2000); 
                }, 2000);  
            }, 1200);  
        }
        
    }
})

let settingCliced = false;
settingBtn.addEventListener("click",()=>{
    if (!settingCliced)
    {
        settingCliced = true;
        settingBtn.innerHTML = '<h1><i class="fa-solid fa-bars-staggered"></i></h1>';
        document.querySelector(".settingPage").style.opacity = 1;
    }
    else
    {
        settingCliced = false;
        settingBtn.innerHTML = '<h1><i class="fa-solid fa-bars"></i></h1>';
        document.querySelector(".settingPage").style.opacity = 0;
    }
    
})

restartBtn.addEventListener("click",()=>{
    // let playerInAnimationA, playerInAnimationB;
    // let computerInAnimationA,  computerInAnimationB, computerInAnimationC;
    // let turnAnimationA, turnAnimationB, turnAnimationC;
    // let SwitchAnimationA, SwitchAnimationB, SwitchAnimationC;

    clearTimeout(playerInAnimationA);
    clearTimeout(playerInAnimationB);

    clearTimeout(computerInAnimationA);
    clearTimeout(computerInAnimationB);
    clearTimeout(computerInAnimationC);

    clearTimeout(turnAnimationA);
    clearTimeout(turnAnimationB);
    clearTimeout(turnAnimationC);

    clearTimeout(SwitchAnimationA);
    clearTimeout(SwitchAnimationB);
    clearTimeout(SwitchAnimationC);

    clearInterval(thinking);

    document.querySelector(".he1").style.opacity = "0";
    document.querySelector(".he1").style.transform = "translateY(0px)";

    document.querySelector(".he2").style.opacity = "0";
    document.querySelector(".he2").style.transform = "translateY(0px)";

    document.querySelector(".het1").style.opacity = "0";
    document.querySelector(".het1").style.transform = "translateY(0px)";

    document.querySelector(".het2").style.opacity = "0";
    document.querySelector(".het2").style.transform = "translateY(0px)";

    cube.style.transform = "rotateX(0deg)";
    document.querySelector(".tbhet").style.opacity = "0";
    document.querySelector(".tbhet").style.transform = "translateY(0px)";
    document.querySelectorAll(".N")[0].innerText = 0;
    document.querySelectorAll(".N")[3].innerText = 1;
    document.querySelectorAll(".N")[2].innerText = 2;
    document.querySelectorAll(".N")[1].innerText = 3;


    turn.style.transform = "rotateX(0deg)";
    r.style.setProperty("--cube-color-player-side","#373737");
    r.style.setProperty("--color1","#434343");
    r.style.setProperty("--color2","#535353");
    r.style.setProperty("--textColor","#ffff");
    document.getElementById("comp").innerHTML = '<i style="color: #fff;" class="fa-solid fa-arrow-up-9-1"></i>';


    // SETUP stats gui:

    document.querySelector(".maxRangeDiv").innerHTML = 'Range: <i>1 - '+ nextMaxRange +'</i><br>';
    document.querySelector(".maxNumDiv").innerHTML = 'Max Number: <i>'+ nextMaxNumber +'</i><br>';

    document.querySelector(".startingTurnDiv").innerHTML = 'First Turn: <i>Randomly</i>';
    if (nextStartingTrun === 1)
        document.querySelector(".startingTurnDiv").innerHTML = 'First Turn: <i>You</i>';
    else if (nextStartingTrun == 2)
        document.querySelector(".startingTurnDiv").innerHTML = 'First Turn: <i>Computer</i>';
    

    gameOver = true;
})

function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
    
}

let inputMaxInput =  document.getElementById("maxNumberInput");
let LastMaxNumberInput = 40;
inputMaxInput.addEventListener("input",()=>{

    if(onlyNumbers(inputMaxInput.value) && inputMaxInput.value.length <= 3  && inputMaxInput.value[0] !== "0" || (inputMaxInput.value[0] === "0" && inputMaxInput.value.length === 1)) 
    {   
        if (+inputMaxInput.value > 9)
        {
            nextMaxNumber = +inputMaxInput.value;
            LastMaxNumberInput = nextMaxNumber;
            inputMaxInput.style.color = "#fff"
        }
        else{
            document.querySelector(".settingPage input").style.Color = "red"
            inputMaxInput.style.color = "red";
        }
            
    }
    else if(inputMaxInput.value === "")
    {
        nextMaxNumber = LastMaxNumberInput;
        inputMaxInput.value = "";
        inputMaxInput.style.color = "#fff"
        
    }
    else if(inputMaxInput.value[0] === "0"){
        inputMaxInput.value = 0;
        inputMaxInput.style.color = "red";
        
    }
    else
    {
        inputMaxInput.value = LastMaxNumberInput
        inputMaxInput.style.color = "#fff"
    }
});

inputMaxInput.addEventListener('focus', () => { 
    inputMaxInput.value = "";
    typingInInputBox = true;

});

inputMaxInput.addEventListener('focusout', () => { 
    inputMaxInput.value = LastMaxNumberInput;
    inputMaxInput.style.color = "#fff";
    typingInInputBox = false;
});

let inputRangeInput =  document.getElementById("RangeInput");
inputRangeInput.addEventListener('change', () => {

    nextMaxRange = +inputRangeInput.value;
    
});

let inputStartingTurnInput = document.getElementById("StartingTurnInput");
inputStartingTurnInput.addEventListener('change', () => {

    nextStartingTrun = +inputStartingTurnInput.value;
    
});


r.style.setProperty("--cube-color-player-side","#373737");
r.style.setProperty("--color1","#434343");
r.style.setProperty("--color2","#535353");
r.style.setProperty("--textColor","#ffff");





