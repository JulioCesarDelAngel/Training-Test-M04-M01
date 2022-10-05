var timerEl     = document.getElementById("countdown");
var startBtn    = document.getElementById("startBtn");
var wrongBtn    = document.getElementById("wrongBtn");
var answerList  = document.getElementById("answerList")
var titleContent= document.getElementById("title-content");
var displayContent  = document.getElementById("display-content");
var textCont     = document.getElementById("text-cont");
var initBtn         = document.getElementById("initBtn");




var nextBtn     = document.getElementById("nextBtn");

var scoreUser       = 0;
var timeLeft        = 0; //time in seconds
var questionIndex   = 0;

//debugger;

var questions = [
    {questionId:0,
    question:"pregunta 1",
    answers:[
        {answerId:0, answer:"respuesta 1 - P1", answerValue:false},
        {answerId:1, answer:"respuesta 2 - ------------P1", answerValue:false},
        {answerId:2, answer:"respuesta 3 - -------P1", answerValue:true},
        {answerId:3, answer:"respuesta 4 - P1", answerValue:false}
    
    ]},
    {questionId:1,
    question:"pregunta 2",
    answers:[
        {answerId:0, answer:"respuesta 1 - P2", answerValue:true},
        {answerId:1, answer:"respuesta 2 - P2", answerValue:false},
        {answerId:2, answer:"respuesta 3 - P2", answerValue:false},
        {answerId:3, answer:"respuesta 4 - P2", answerValue:false}
    ]}
];

/*
for (var question of questions){
    console.log("---------------");
    console.log(question.questionId);
    console.log(question.question);
    console.log("======");

    var list = question.answers;

    for (var ans of list){
        console.log(ans.answerId);
        console.log(ans.answer);
        console.log (ans.answerValue);
    }
    console.log("---------------");
}
*/

//questions.forEach(element => console.log(element));


//var index = questions.findIndex(element => element.questionId===1 );
//console.log(questions);



/*cronometro */
function countdown(){

    var timeInterval = setInterval( function (){
        if (timeLeft >=0){
            timerEl.textContent=timeLeft;
        }
        else{
            clearInterval(timeInterval);
            timerEl.textContent="";

            console.log("fin del tiempo mover register score page")
        }
        timeLeft --;
    }, 1000 );

    return;
}


function createQuestion(){
    var index = questions.findIndex(element => element.questionId===questionIndex );

    titleContent.textContent = questions[index].question.trim();
    /*
    if (answerList === null) {
        var ol  = document.createElement("ol");
        ol.setAttribute("id","answerList");        
        displayContent.appendChild(ol);
        answerList  = document.getElementById("answerList");
    }
    */
    answerList.innerHTML = ""; 

    answerList.setAttribute("data-id", index );

    var list = questions[index].answers;

    for (var ans of list){
        var li = document.createElement("li");
        li.textContent = ans.answer;
        li.setAttribute("data-id", ans.answerId);
        answerList.appendChild(li);
    }

    return;
}


function scoreCard(questionIndex, answerIndex){
    var list = questions[questionIndex].answers;


    if ( list[answerIndex].answerValue === true){
        scoreUser += 10;
    }
    else{
        timeLeft -=10;
    }

    return;
}

answerList.addEventListener("click", function(event){
    var element = event.target;

    if (element.matches("li") === true){
        var questionIndex   = element.parentElement.getAttribute("data-id");
        var answerIndex     = element.getAttribute("data-id");   

        scoreCard(questionIndex,answerIndex);   

        nextQuestion();
        //questionIndex
    }
    return;
});

/*boton inicio */
function startTest(){
    
    textCont.style.display= "none";
    timerEl.textContent="";
    timeLeft = 30; 
    questionIndex = 0;
    countdown();
    createQuestion();
    
}

/*Boton pregunta erronea */
function wrongAnswer(){
    timeLeft -=2;
    return;
}


function nextQuestion (){    
    questionIndex ++
    
    if (questionIndex < questions.length){        
        createQuestion();
    }
    else{
        //page registerScore();
        console.log("fin de las preguntas register score page")
    }
    
    return;

}

//startTest();
/*añadir Eventos a objetos */
startBtn.addEventListener("click",startTest);
wrongBtn.addEventListener("click", wrongAnswer);

initBtn.addEventListener("click", init)
nextBtn.addEventListener("click",nextQuestion);

function init(){

    answerList.innerHTML = ""; 

    titleContent.textContent = "Desafío de prueba de codificación";
    //textCont.textContent = "Intente responder las siguientes preguntas relacionadas con el código dentro del límite de tiempo. /n ¡Tenga en cuenta que la respuesta incorrecta penalizará su puntuación/tiempo en diez segundos!"
    textCont.innerHTML= "<p>Intente responder las siguientes preguntas relacionadas con el código dentro del límite de tiempo. <br> ¡Tenga en cuenta que la respuesta incorrecta penalizará su puntuación/tiempo en diez segundos!</p>"
    textCont.style.display= "initial";
    startBtn.style.visibility = "visible";
    
    
    /*
    var btn  = document.createElement("ol");
    ol.setAttribute("id","answerList");        
    displayContent.appendChild(ol);
    answerList  = document.getElementById("answerList");
    */
    return;
}

init();