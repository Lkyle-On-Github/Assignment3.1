
//Gets the first number that appears next to the button

//#region Initialization functions
function initializeGame() {
    //sets up the top number which is only randomised once
    number1 = Math.floor(Math.random() * 5);
    document.getElementById("startingNumber").innerHTML = number1;

    //sets the second random number to avoid a softlock
    number2 = Math.floor(Math.random() * 5);
    document.getElementById("randomNumber").innerHTML = number2;

    //keeps track of whether or not the button has been pressed
    buttonPressed = 0;

    //makes the second number change constantly
//if it looks like its changing at a random speed it is just because it is rolling the same number multiple times in a row
//moved this into InitializeGame
    setInterval(randomizeNumber, 500)
}

function initializeStrings() {
    //the current input from the user, current word or sentence.
    currString = "";
    //filtered for palindrome check
    currStringFiltered = ""
    //total output, current sentence or paragraph.
    fullString = "";
    //filtered for palindrome check
    fullStringFiltered = "";
    //tracks whether the user finished typing with a period or underscore after that value is removed from their text.
    //I don't think escape character is the right term for this but I'm using it anyways because it feels cool
    escapeType = "";
    
    //I interpreted the lesson prompt to be asking me to make an output log where the user will be prompted to keep going after each output.
    //this variable accomplishes this, it is a concatination of all past outputs that is put into a paragraph.
    fullOutput = "";

    //counter for the while loops, could be for loops but I don't want it to increment every time and subtracting from a for loop variable feels yucky to me.
    counter = 0;

    //the reversed strings for Palindrome check
    reverseString = "";
    reverseFullString = "";

    //I used numbers instead of Bools because I checked the documentation and found out that JS doesn't have chars so I just assumed it wouldn't have bools too for some reason
    isPalendrome = 0;
    isFullPalendrome = 0;

    // whether the user is inputting their string or Y/N
    confirmation = false;

    //Ensures that the user can't input until the orb has finished calculating
    onCooldown = false;
}
//#endregion

//#region Game Code
//this number changes randomly, the player must press the button at the right time
function randomizeNumber() {
    if(buttonPressed == 0) {
        number2 = Math.floor(Math.random() * 5);
        document.getElementById("randomNumber").innerHTML = number2;
    }
}

//checks if the number was correct and declares that the player has won
function gameButton() {
    //makes the number stop randomizing once the button is pressed
    buttonPressed = 1;

    //the button disappears once it has been pressed
    //document.getElementById("buttonP").innerHTML = number1;
    
    //numbers are stored in variables to do this easier
    if(number1 == number2) {
        //text and gif for winning
        document.getElementById("result").innerHTML = "You Win!!!";
        document.getElementById("winImage").src = "KAngel Pose.gif";
        document.getElementById("resultText").style = "font-family: Zpix; font-weight: 900";
        document.getElementById("resultText").innerHTML = "Incredible! You did it!!!";
    } else {
        //text and image for losing
        document.getElementById("result").innerHTML = "You LOSE!!!";
        document.getElementById("loseImage").src = "Giovanna Thumbnail 8.png";
        document.getElementById("resultText").innerHTML = "The shame of this will haunt you forever...";
    }
    return "Press this button when the number below equals";
}
//#endregion

//#region Strings Code
function checkInput() {
if(!onCooldown) {
    //reset palendrome variables for this iteration


    //put output into a string because I might delete it later idk this has gone through a lot of iterations in my head ok
    currString = document.getElementById("GGOrbInterface").value;
    //document.getElementById("DELETEIMMEDIATELY").innerHTML = currString;
if(!confirmation) {
    isPalendrome = 0;
    isFullPalendrome = 0;
    //check for a period or underscore, this is how the user will finish typing.
    if(currString.charAt(currString.length - 1) == "." || currString.charAt(currString.length - 1) == "_") {
        
    //pre filter
        //Ensures that the user cant construct their input out of nothing but escape characters and spaces
        for( let i = 0; i < currString.length + 1; i++) {
            //looks at every character in the string and stops if it sees something that isnt a   or a .
            if(i == currString.length) {
                //kills the function with a return statement
                document.getElementById("Bocchi2ndMessage").innerHTML = "Um... Please dont try to give the orb an empty string. it doesn't like that very much.";
                document.getElementById("GGOrbInterface").value = "";
                return;
            }
            if(currString.charAt(i) != "." && currString.charAt(i) != "_" && currString.charAt(i) != " ") {
                document.getElementById("Bocchi2ndMessage").innerHTML = "";
                //leaves the for loop with a break
                break;
            }
        }
        //just a little easter egg because my priorities are fucked
        if(currString.includes("<") || currString.includes(">")) {
            document.getElementById("BocchiBonusMessage").innerHTML = "also please dont try and pass code into the orb it might get angry...";
        } else {
            document.getElementById("BocchiBonusMessage").innerHTML = "";
        }
        //removes the _ from output so that the output is ready for .innerHTMLing
        if(currString.charAt(currString.length - 1) == "_") {
            //I feel like slice would be more elegant but it broke for some reason when I tried it.
            //its because I wasnt using it properly I know how slice works now :)
            currString =  currString.substr(0,currString.length - 1) + " ";
            //I know there is technically a space at the end of full output but its literally invisible so no one will notice
        }
        //empties the text entry box
        document.getElementById("GGOrbInterface").value = "";
        
    //filters the current string
        //starts by converting to upper
        currStringFiltered = currString.toUpperCase();

        //then it removes the escape character
        currStringFiltered = currStringFiltered.substr(0,currStringFiltered.length - 1);
        counter = 0;
        //finally it filters out all of the spaces;
        //the prompt said something about entering a loop so here you go
        while(counter < currStringFiltered.length) {
            if(currStringFiltered.charAt(counter) == " ") {
                currStringFiltered = currStringFiltered.slice(0, counter) + currStringFiltered.slice(counter + 1, currStringFiltered.length);
            } else {
                counter += 1;
            }
        }

        //document.getElementById("filteredDELETEIMMEDIATELY").innerHTML = currStringFiltered;
    //adds to the filtered and non filtered fullstrings
        fullString = fullString + currString;
        //document.getElementById("fullDELETEIMMEDIATELY").innerHTML = fullString;
        
        fullStringFiltered = fullStringFiltered + currStringFiltered;
        //ocument.getElementById("filteredFullDELETEIMMEDIATELY").innerHTML = fullStringFiltered;

    //palindrome check
        //I would like to just check the characters in the strings themselves instead of printing an extra string but I'm too sleepy for that right now
        reverseString = "";
        for(let i = currStringFiltered.length - 1; i >  -1; i--) {
            reverseString = reverseString + currStringFiltered.charAt(i);
            //document.getElementById("reverseDELETEIMMEDIATELY").innerHTML = reverseString;
        }
        if (currStringFiltered == reverseString) {
            isPalendrome = 1;
        } 
        

        
        //for(let i = currStringFiltered.length - 1; i >  -1; i--) {
            reverseFullString = reverseString + reverseFullString;
        //}
        if (fullStringFiltered == reverseFullString) {
            isFullPalendrome = 1;
        } 
        //document.getElementById("reverseFullDELETEIMMEDIATELY").innerHTML = reverseFullString;

        onCooldown = true;
        document.body.style = "background-image: url('Bocchi the Glitter Calculating.gif');";
        setTimeout(runOutput, 4500)
        //runOutput();
    }
} else {
    document.getElementById("GGOrbInterface").value = "";
    currString = currString.toUpperCase();
    if(currString == "Y") {
        document.getElementById("Bocchi2ndMessage").innerHTML = " Well then, um just make sure you type in your next message the same way you typed this one. I hope I'm not being a bother..."
        confirmation = false;
    }
    if(currString == "N") {
        //onCooldown = true;
        document.getElementById("Bocchi2ndMessage").innerHTML = "Alright Im gonna go back to pondering my orb then.";
        document.getElementById("BocchiGreeting").innerHTML = "";
    }
}
} else {
    document.getElementById("GGOrbInterface").value = "";
}
}

function runOutput() {
    onCooldown = false;
    //Im like 96% sure you cant see the word calculating reappear at the end of the gif and I dont really feel like figuring out the length of my gifs in frames and converting that into seconds to convert that into ms just for this.
    //also the only resetImage is a seperate timer is so that the user should be able to type Y/N without waiting for the calc anim to completely finish.
    setTimeout(resetImage, 1750);
    //the first output will just say input instead of last input and total input    
    if(fullString != currString) {
    fullOutput = fullOutput + "<br><b>Last Input:</b><br>" + currString;
    //fullOutput = fullOutput + "<br><b>THIS INPUT WAS "; -- looks kinda silly
    if(isPalendrome == 1) {
        fullOutput = fullOutput + "<br> <b>A PALENDROME</b><br>";
        } else {
            fullOutput = fullOutput + "<br> <b>NOT A PALENDROME</b><br>"
        }
        
        fullOutput = fullOutput + "<b>Total Input:</b><br>" + fullString;
        if(isFullPalendrome == 1) {
            fullOutput = fullOutput + "<br> <b>A PALENDROME</b><br>";
        } else {
            fullOutput = fullOutput + "<br> <b>NOT A PALENDROME</b><br>"
        }
    } else {
        fullOutput = fullOutput + "<b>Input:</b><br>" + currString;
        if(isPalendrome == 1) {
            fullOutput = fullOutput + "<br> <b>A PALENDROME</b><br>";
            } else {
                fullOutput = fullOutput + "<br> <b>NOT A PALENDROME</b><br>"
            }
    }


    document.getElementById("fulloutput").innerHTML = fullOutput;
    confirmation = true;
    document.getElementById("Bocchi2ndMessage").innerHTML = "Alright well thats all you asked for but dont worry you can go againt if you want. Just type Y for yes, and if you are totally done type N so I can let the orb know."
        
}

function resetImage() {
    document.body.style = "background-image: url('Bocchi the Glitter Pondering her orb.gif');";
}
