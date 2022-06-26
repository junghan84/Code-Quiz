
debugger;
//DECLARE 'question'
var questions = [
    {
        //question
        question : "Which of the following is an advantage of using JavaScript? " ,
        //answer
        choices: [" Less server interaction ", " Immediate feedback to the visitors ",  " Increased interactivity ", " All of the above "],  
       //correct answer
       answers: "All of the above."
    },
    {
        //question
        question : "Which of the following is a valid type of function javascript supports?",
        choices : [" named function ", " anonymous function ", " Both of the above "," None of the above"],
        answers : " Both of the above "        
    },

    {
      question : "Which of the following type of variable is visible only within a function where it is defined? ",
      choices : [" global variable ", " local variable ", " Both of the above ", " None of the above"],
      answers : " local variable "    
  },
  {
    question : " Which built-in method returns the calling string value converted to lower case? ",
    choices : [" toLowerCase()", " toLower() ", " changeCase(case)",  "None of above" ],
    answers : " toLowerCase()"   
  }, 
  {
  question : " Which of the following function of String object executes the search for a match between a regular expression and a specified string?",
  choices : [" concat()", " match()", " replace()", " search()"],
  answers : " search()"
  }
];

//DECLARE 'question'
var questionPosition = 0; //Index
var score = 0;

//DECLARE 'COUNTDOWN' number
var secondsLeft = 75;
//Holds time
var holdInterval = 0;
//Penalty time
var penalty = 10;
//create element
var ulCreate = document.createElement("ul");

//var currentQuestion = questions[questionPosition]; 
//DECALRE the 'timeEl'
var timeEl = document.querySelector ("#timer");
//DECALRE the Start
var StartEl = document.querySelector("#startTimer");
var quizHome = document.querySelector("#quizHome");

//Function 'startGame' 
StartEl.addEventListener("click", function () {
  //Set interval in variable
  if (holdInterval === 0) {
      holdInterval = setInterval(function () {
          secondsLeft--;
          timer.textContent = "Time: " + secondsLeft;
         // console.log(timer);

        //Stops execution of action at set interval
          if (secondsLeft <= 0) {
              clearInterval(holdInterval);
              endGame();
              timer.textContent = "Time's up!";
          }
      }, 1000);
  }
   //Calls function   
  render(questionPosition);   
});

function render(questionPosition){
  quizHome.innerHTML ="";
  ulCreate.innerHTML = "";
  
  //Through for loop to loop all question 
  //Display the  question

  for(var i = 0; i < questions.length; i++){
    var currentQuestion = questions[questionPosition].question;
    var currentChoice = questions[questionPosition].choices;
    quizHome.textContent = currentQuestion;
    console.log(questions [0]);
  }
  

currentChoice.forEach(function (newItem) {
  var listItem = document.createElement("li");
  listItem.textContent = newItem;
  quizHome.appendChild(ulCreate);
  ulCreate.appendChild(listItem);
  listItem.addEventListener("click", (compare));
})
}

function compare(event) {
  var element = event.target;

 //Check if the selected answer is correct
  if (element.matches("li")) {

      var createDiv = document.createElement("div");
      createDiv.setAttribute("id", "createDiv");
      // Correct condition 
      if (element.textContent == questions[questionPosition].answers) {
          score++;
          createDiv.textContent = "Correct! The answer is:  " + questions[questionPosition].answers;
          // Correct condition 
      } else {
          secondsLeft = secondsLeft - penalty;
          createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionPosition].answers;
      }

  }
   questionPosition++;

   if(questionPosition >= questions.length){
     endGame();
     createDiv = "End Game! " + "" + "You got " + score + "/" + questions.length + " Correct!";
   } else{
     render(questionPosition);
   }
    quizHome.appendChild(createDiv);
}

//display last page
function endGame(){
   quizHome.innerHTML="";
   timer.innerHTML="";

   var createH2 = document.createElement("h2");
   createH2.setAttribute("id", "createH2");
   createH2.textContent = "All Done";

   quizHome.appendChild(createH2);

   var createP = document.createElement("p");
   createP.setAttribute("id", "createP");

   quizHome.appendChild(createP);

   if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    quizHome.appendChild(createP2);

}
 //Lasts page label
 var createLabel = document.createElement("label");
 createLabel.setAttribute("id", "createLabel");
 createLabel.textContent = "Your initials: ";

  quizHome.appendChild(createLabel);

//create Label Input
var createInput = document.createElement("input");
createInput.setAttribute("type","text");
createInput.setAttribute("id","initials");
createInput.textContent ="";

quizHome.appendChild(createInput);

//create submit
var createSubmit = document.createElement("button");
createSubmit.setAttribute("type", "submit");
createSubmit.setAttribute("id","submit");
createSubmit.textContent="Submit";

quizHome.appendChild(createSubmit);

 //create submit function
  createSubmit.addEventListener("click", function(){
  var initials = createInput.value;
  if(initials == null){
    console.log("please enter your initial!!");
  } else {
    var finalScore ={
      initials: initials,
      socre: timeRemaining
    }
    console.log(finalScore);
    var allScores = localStorage.getItem("allScores");
    if(allScores == null){
      allScores =[];
    } else{
      allScores = JSON.parse(allScores);
    }
    allScores.push(finalScore);
    var newScore = JSON.stringify(allScores);
    localStorage.setItem("allScores", newScore);
    window.location.replace("./highScore.html");
    console.log("jo");
  }

 } );
}



