var timerEl     = document.getElementById("countdown");
var titleContent= document.getElementById("title-content");
var displayContent  = document.getElementById("display-content");
var messageText     = document.getElementById("message");


var scoreUser       = 0;
var timeLeft        = 0;
var questionIndex   = 0;

var localData = [];


var questions = [
    {questionId:0,
    question:"Dentro del documento HTML ¿donde coloca su código JavaScript?",
    answers:[
        {answerId:0, answer:" Dentro del elemento <script> ", answerValue:true},
        {answerId:1, answer:" Dentro del elemento <link> ", answerValue:false},
        {answerId:2, answer:" En el elemento <footer> ", answerValue:false},
        {answerId:3, answer:" Dentro del elemento <head> ", answerValue:false}
    
    ]},
    {questionId:1,
    question:"¿Que operador se utiliza para asignar un valor a una variable declarada?",
    answers:[
        {answerId:0, answer:" Signo de interrogación (?) ", answerValue:false},
        {answerId:1, answer:" Doble igual (==) ", answerValue:false},
        {answerId:2, answer:" Dos puntos (:) ", answerValue:false},
        {answerId:3, answer:" Signo igual (=) ", answerValue:true}
    ]},
    {questionId:2,
        question:"¿Como declaramos una instrucción condicional en JavaScript?",
        answers:[
            {answerId:0, answer:" if ... else ", answerValue:true},
            {answerId:1, answer:" bucle for ", answerValue:false},
            {answerId:2, answer:" bucle while ", answerValue:false},
            {answerId:3, answer:" diferencia... entre ", answerValue:false}
        ]},    
        {questionId:3,
            question:"De la matriz dada, ¿ en que indice se encuentra la letra 'b' ? ['a','b','c'] ",
            answers:[
                {answerId:0, answer:" 3 ", answerValue:false},
                {answerId:1, answer:" 2 ", answerValue:false},
                {answerId:2, answer:" 0 ", answerValue:false},
                {answerId:3, answer:" 1 ", answerValue:true}
            ]},    
    {questionId:4,
            question:"¿Qué es un método de objeto?",
            answers:[
                {answerId:0, answer:" Una función asociada a un objeto ", answerValue:true},
                {answerId:1, answer:" Una matriz guardada dentro de un objeto ", answerValue:false},
                {answerId:2, answer:" Ingresa un objeto que tiene un número asignado ", answerValue:false},
                {answerId:3, answer:" Una función que toma un objeto para un argumento ", answerValue:false}
            ]},
];


/*Registro de Score crud*/
function dataCRUD( actionType, localUser, localScore ){
    if( actionType === "R"){
        var getLocalStorage = JSON.parse(localStorage.getItem("ScoreDataTest"));
        if (getLocalStorage !== null ){
            localData = getLocalStorage;
        }
    }
    else if(actionType === "C"){

        var idx = localData.findIndex(element => element.user === localUser);

        if (idx >=0){
            localData.splice(idx, 1);
        }        

        localData. push( {user:localUser,score:localScore});
        localStorage.setItem("ScoreDataTest", JSON.stringify(localData));
    }
    
    return;
}

/**Pagina de registro */
function registerPage(){
    clearPages();
    /*
    var element = document.getElementById("divQuestion");
    if (element!= null){
        removeElement (element);
    }
    */

    titleContent.textContent = "¡Terminado!";
    
    var divRegister = document.createElement("div")
    divRegister.id =  "divRegister";
    divRegister.setAttribute("style"," display:table; position: relative; left: 50%; transform: translateX(-50%);")

    var pText = document.createElement("p");
    pText.innerHTML= "<p> Tu puntaje final :"+ scoreUser +"</p>";

    var labelName =document.createElement("label"); 
    labelName.textContent = "Capture sus iniciales:";
    labelName.id="labelName";
    labelName.setAttribute("style","")

    var textName =document.createElement("input"); 
    textName.id="textName";
    textName.setAttribute( "autocomplete", "off" );

    var registerBtn = document.createElement("button"); 
    registerBtn.textContent ="Registrar";
    registerBtn.id = "registerBtn";
    registerBtn.setAttribute("style","registerBtn")
    
    registerBtn.addEventListener("click",addUser)

    divRegister.appendChild(pText);
    divRegister.appendChild(labelName);
    divRegister.appendChild(textName);
    divRegister.appendChild(registerBtn);
    displayContent.appendChild (divRegister);
    
    return;    
}


function addUser(){

    var textName = document.getElementById("textName").value;
    if (textName != null && textName.length > 0){
        dataCRUD("C",textName,scoreUser)
        scorePage();
    }
    else{
        messageText.textContent ="Debe capturar sus iniciales.";
    }
    return;
}

function scorePage (){
    messageText.textContent ="";

    var element = document.getElementById("divHome");
    if (element!= null){
        removeElement (element);
    }

    var element = document.getElementById("divRegister");
    if (element!= null){
        removeElement (element);
    }

    var element = document.getElementById("divScore");
    if (element!= null){
        removeElement (element);
    }

    titleContent.textContent = "Puntuaciones";
    
    var divScore = document.createElement("div")
    divScore.id =  "divScore";
    divScore.setAttribute("style"," display:table; position: relative; left: 50%; transform: translateX(-50%);")
    
    var backBtn = document.createElement("button"); 
    backBtn.textContent ="Regresar";
    backBtn.id = "backBtn";
    backBtn.setAttribute("style","")

    var resetBtn = document.createElement("button"); 
    resetBtn.textContent ="Borrar Puntuacion";
    resetBtn.id = "resetBtn";
    resetBtn.setAttribute("style","")

    dataCRUD("R"); 

    var listScore = document.createElement("ol"); 
    listScore.id ="listScore"

    if (localData != null && localData.length > 0 ){
        
        for (i=0; i< localData.length; i++){
            var li = document.createElement("li");
            li.textContent = (i+1)+" .- " + localData[i].user +" - " + localData[i].score ;
            listScore.appendChild(li);
        }
    }
    else{
        var li = document.createElement("li");
        li.textContent = "Sin datos registrados.";
        listScore.appendChild(li);        
    }

    backBtn.addEventListener("click",home);
    resetBtn.addEventListener("click",resetStorage);
    
    divScore.appendChild(listScore);
    divScore.appendChild(backBtn);
    divScore.appendChild(resetBtn);
    displayContent.appendChild(divScore);

    return;
}


/*pagina inicio */
function home(){

    messageText.textContent ="";

    dataCRUD("R");

    /*
    var element = document.getElementById("divScore");
    if (element!= null){
        removeElement (element);
    } 
    */
   
    clearPages();
    
    titleContent.textContent = "Desafío de prueba de codificación";

    var divHome = document.createElement("div");
    divHome.id =  "divHome";
    divHome.setAttribute("style"," display:table; position: relative; left: 50%; transform: translateX(-50%);")

    var pText = document.createElement("p");
    pText.innerHTML= "<p>Intente responder las siguientes preguntas relacionadas con el código dentro del límite de tiempo. <br> ¡Tenga en cuenta que la respuesta incorrecta penalizará su puntuación/tiempo en <b>diez segundos</b>!</p>";

    var startBtn = document.createElement("button");
    startBtn.id= "startBtn"
    startBtn.textContent="Iniciar";
    startBtn.addEventListener("click",startTest);

    divHome.appendChild(pText);
    divHome.appendChild(startBtn);
    displayContent.appendChild (divHome);

    return;
}

function resetStorage(){
    localStorage.removeItem("ScoreDataTest");
    localData = [];

    scorePage();

    return;
}

function removeElement(elemento){
    while ( (elemento.firstChild != null) && elemento.firstChild){
        elemento.removeChild(elemento.firstChild);
    }

    var parent = elemento.parentElement;
    parent.removeChild(elemento);    

    return;
}

/*cronometro */
function countdown(){

    var timeInterval = setInterval( function (){
        if (timeLeft >=0){
            timerEl.textContent="Tiempo : " + timeLeft;
        }
        else{
            clearInterval(timeInterval);
            timerEl.textContent="Tiempo : Finalizado.";

            registerPage();
            
        }
        timeLeft --;
    }, 1000 );

    return;
}


function createQuestion(){
    /*
    var TagElement = document.getElementById("divQuestion");
    if (TagElement!= null){
        removeElement (TagElement);
    }
    */
    clearPages();

    var divQuestion = document.createElement("div")
    divQuestion.id =  "divQuestion";
    divQuestion.setAttribute("style"," display:table; position: relative; left: 50%; transform: translateX(-50%);")

    var answerList =document.createElement("ol"); 
    answerList.id="answerList";
    

    var index = questions.findIndex(element => element.questionId===questionIndex );
    titleContent.textContent = questions[index].question.trim();
    answerList.setAttribute("data-id", index );

    var list = questions[index].answers;
    var idx = 0;
    for (var ans of list){
        idx ++;
        var li = document.createElement("li");
        li.textContent = idx + ".-" + ans.answer;
        li.setAttribute("data-id", ans.answerId);
        answerList.appendChild(li);
    }

    answerList.addEventListener("click", function(event){
    
        var element = event.target;
    
        if (element.matches("li") === true){
            var questionIndex   = element.parentElement.getAttribute("data-id");
            var answerIndex     = element.getAttribute("data-id");   
    
            scoreCard(questionIndex,answerIndex);   
    
            nextQuestion();
        }
        return;
    });   

    divQuestion.appendChild(answerList);
    displayContent.appendChild (divQuestion);

    return;
}

/*
function postEvent(){
    answerList.addEventListener("click", function(event){
    
        var element = event.target;
    
        if (element.matches("li") === true){
            var questionIndex   = element.parentElement.getAttribute("data-id");
            var answerIndex     = element.getAttribute("data-id");   
    
            scoreCard(questionIndex,answerIndex);   
    
            nextQuestion();
        }
        return;
    });
}
 */

function scoreCard(questionIndex, answerIndex){
    var list = questions[questionIndex].answers;


    if ( list[answerIndex].answerValue === true){
        scoreUser += 10;
        messageText.textContent = "Correcto!";
    }
    else{
        timeLeft -=10;
        messageText.textContent = "Incorrecto!";
    }

    return;
}

/*Limpiar Elementos*/
function clearPages(){

    var element = document.getElementById("divHome");
    if (element!= null){
        removeElement (element);
    }

    var element = document.getElementById("divRegister");
    if (element!= null){
        removeElement (element);
    }

    var element = document.getElementById("divScore");
    if (element!= null){
        removeElement (element);
    }

    var element = document.getElementById("divScore");
    if (element!= null){
        removeElement (element);
    }

    var element = document.getElementById("divQuestion");
    if (element!= null){
        removeElement (element);
    }
    
    return;
}


/*boton inicio */
function startTest(){

    var element = document.getElementById("divHome");
    if (element!= null){
        removeElement (element);
    }
    
    timerEl.textContent="";
    timeLeft = 30; 
    questionIndex = 0;
    scoreUser = 0;

    countdown();
    createQuestion();
    
}

function nextQuestion (){    
    questionIndex ++
    
    if (questionIndex < questions.length){        
        createQuestion();
    }
    else{        
        registerPage();
    }
    
    return;
}

function init(){    
    home();    
    return;
}

init();