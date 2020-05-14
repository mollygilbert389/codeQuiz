let intro = document.querySelector(".intro");
let questionSpace = document.querySelector(".question");
let optionsSpace = document.querySelector('.options');
let playBtn = document.querySelector(".playBtn");
let scorePlace = document.querySelector("#score");
let timerPlace = document.querySelector('#timer');
let questionOverview = document.querySelector('.questionSpace')
let minusOne = document.querySelector(".timerMinusOne")
let highScorePlace = document.querySelector("#highScorePlace")
let lastWinner = JSON.parse(localStorage.getItem("highScore"))
let trueAnswer;
let score = 0;
let counter = 30;
let x = 0;
let userchoice;


function checkLocalScore () {
    if (lastWinner !== null) {
        highScorePlace.append("Initials: " + lastWinner.initials + " ")
        highScorePlace.append("Score: " + lastWinner.newHighScore)
    
    
    } if (lastWinner.highScore === null)  {
        let highScore = {
            initials:'',
            newHighScore:0
        }
    
        highScore.initials = ''
        highScore.newHighScore = 0
    }
}

checkLocalScore()



const questions = [
    {
        question: "Where is the best place to put your script tag for a JS file you created?",
        options: ["Before HTML", "After Closing Body", "Before Title", "Before Closing Body"],
        answer: "After Closing Body"
    },
    {
        question: "Why do we add a type to our script tags?",
        options: ["For the Browser", "Because Molly said So", "We don't have to", "What?"],
        answer: "For the Browser"
    },
    {
        question: "What can store a truthy or falsey value?",
        options: ["What?", "Number", "String", "Boolean"],
        answer: "Boolean"
    },
    {
        question: "How do you declare a function in JS?",
        options: ["function myfunc(){ }", "function = aFunction{}", "myFunction()", "Whut?"],
        answer: "function myfunc(){ }"
    },
    {
        question: "What is a string?",
        options: ["Numbers", "True & False", "Series of Characters", "Array"],
        answer: "Series of Characters"
    },
    {
        question: "How many days did it take to write JavaScript?",
        options: ["0", "10", "5", "6.7"],
        answer: "10"
    },
    {
        question: "How do you write something to the console?",
        options: ["You don't", "console()", "log.console", "console.log()"],
        answer: "console.log()"
    },
    {
        question: "When should you test your code?",
        options: ["Always", "When It Works", "Never", "Half Way"],
        answer: "Always"
    },
    {
        question: "What is the value of NaN?",
        options: ["0", "Undefined", "Not a Variable", "Not a Number"],
        answer: "Not a Number"
    },
    {
        question: "What does % mean in JS?",
        options: ["Percent of", "Divided by", "Mod of", "Doesn't Work in JS"],
        answer: "Mod of"
    }, {
        question: "In what element do we put the javaScript?",
        options: ["<html>", "<body>", "<script>", "<header>"],
        answer: "<script>"
    }, 

    
];

function playGame() {
    intro = intro.style.display = 'none'

    timer = setInterval(function(){
        counter--;
        timerPlace.innerHTML = `Time: ${counter} seconds left`
        if (counter > 0) {
        } else {
            gameOver()
        }
        },1000);

    questions.sort(function() {
        return .5 - Math.random();
    });
    nextQuestion()
    
};

function userChoice() {
    let userChoice = event.target.value
    if (x <= 10) { //when you add +1 here it solves the giving the final question away 
        if(trueAnswer === userChoice) {
            score++;
            scorePlace.innerText = "Your Score: " + score
            questionSpace.innerHTML = ''
            optionsSpace.innerHTML = ''
            minusOne.setAttribute('class', 'timerMinusOne' )
                nextQuestion()
        } else if (trueAnswer !== userChoice) {
            counter--;
            timerPlace.innerHTML = `Time: ${counter} seconds left`
            minusOne.setAttribute('class', 'show')
            setTimeout(function () {
                minusOne.setAttribute('class', 'timerMinusOne');
             }, 300);
        }
    } else {
        gameOver()
    }
}

function nextQuestion() {
    let index = x

    let selectedquestion = questions[index]
    let questionAnwser = selectedquestion.answer //but it breaks here

    trueAnswer = questionAnwser

    questionSpace.append(selectedquestion.question)

    let quesOptions = selectedquestion.options

    for (i=0; i < quesOptions.length; i++) {
    let newBtn = document.createElement('button')
    newBtn.className = 'quesButtons'
    newBtn.innerText = quesOptions[i]
    newBtn.value = quesOptions[i]
    newBtn.setAttribute('onClick', 'userChoice()')
    optionsSpace.append(newBtn)
    };
    x++
    console.log(x)

}

function gameOver (){
    clearInterval(timer)

    function compareScore (counter) {
        console.log(score)
        if (score > lastWinner.newHighScore) {

            let initialsPrompt = prompt("Your final score was: " + score + " Enter your initials for High Score!")

        let highScore = {
            initials:'',
            newHighScore: 0
        }

            highScore.initials = initialsPrompt
            highScore.newHighScore = score
            localStorage.setItem("highScore", JSON.stringify(highScore));

            highScorePlace.innerText = ''
            location.reload()
            
        } if (score < lastWinner.newHighScore) {
            questionOverview.innerHTML = ''
            questionOverview.innerHTML = "<div> Game Over! </div> <div>You're time bonus was: " + counter + "</div> <div> Your score is: " + score + "</div> <button onclick='playNewGame()' class='playBtn'> Play Again? </button>"
        }
    }

    if (counter > 0) {
        scorePlace.innerText = "Your Score: " + score
        counter = counter*.5
        score = counter + score
        compareScore(counter)

    } else {
        counter = 0
        scorePlace.innerText = "Your Score: " + score
        compareScore(counter)
        }
    }

function playNewGame() {
    location.reload()
}



