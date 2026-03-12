let questions=[

{
question:"1. What is the probability that both coins are heads?",
answers:["1/2","1/3","1/4","1/6"],
correct:2
},

{
question:"2. What is the probability of rolling an even number on a die?",
answers:["1/6","1/2","2/3","3/4"],
correct:1
},

{
question:"3. What is the probability of drawing a heart from 52 cards?",
answers:["1/2","1/4","1/13","1/3"],
correct:1
},

{
question:"4. Two dice rolled. Probability sum is 7?",
answers:["1/6","1/12","1/8","1/4"],
correct:0
},

{
question:"5. Bag has 4 red, 3 blue, 3 green. Probability of blue?",
answers:["3/10","1/2","1/5","2/5"],
correct:0
},

{
question:"6. All cats are mammals. Milo is a cat. What is true?",
answers:["Milo is reptile","Milo is mammal","Milo is bird","Milo is fish"],
correct:1
},

{
question:"7. All students study. Lia is a student. What is true?",
answers:["Lia studies","Lia teaches","Lia sleeps","Lia travels"],
correct:0
},

{
question:"8. All teachers work at school. Mark is teacher. What is true?",
answers:["Hospital","School","Bank","Store"],
correct:1
},

{
question:"9. All even numbers divisible by 2. 8 is even. What is true?",
answers:["Divisible by 3","Divisible by 5","Divisible by 2","Divisible by 7"],
correct:2
},

{
question:"10. Alex, Bea, Carl jobs: Doctor, Chef, Pilot. Who is Doctor?",
answers:["Alex","Bea","Carl","None"],
correct:2
}

];

let currentQuestion=0;
let score=0;

function startGame(){
document.getElementById("startScreen").classList.add("hidden");
document.getElementById("descScreen").classList.remove("hidden");
}

function startLevel1(){
document.getElementById("descScreen").classList.add("hidden");
document.getElementById("quizScreen").classList.remove("hidden");
showQuestion();
}

function showQuestion(){

let q=questions[currentQuestion];

document.getElementById("question").innerText=q.question;

let answersDiv=document.getElementById("answers");
answersDiv.innerHTML="";

q.answers.forEach((answer,index)=>{

let btn=document.createElement("button");

btn.innerText=answer;
btn.classList.add("answerBtn");

btn.onclick=function(){
selectAnswer(btn,index);
};

answersDiv.appendChild(btn);

});

document.getElementById("progressText").innerText=
"Question "+(currentQuestion+1)+" / "+questions.length;

let progress=(currentQuestion/questions.length)*100;
document.getElementById("progressFill").style.width=progress+"%";
}

function selectAnswer(button,index){

let q=questions[currentQuestion];
let buttons=document.querySelectorAll(".answerBtn");

buttons.forEach(b=>b.disabled=true);

if(index===q.correct){
button.classList.add("correct");
score++;
document.getElementById("score").innerText=score;
}else{
button.classList.add("wrong");
buttons[q.correct].classList.add("correct");
}

document.getElementById("nextBtn").classList.remove("hidden");
}

function nextQuestion(){

currentQuestion++;

document.getElementById("nextBtn").classList.add("hidden");

if(currentQuestion<questions.length){

showQuestion();

}else{

showResult();

}

}

/* RESULT SYSTEM */

function showResult(){

document.getElementById("quizScreen").classList.add("hidden");
document.getElementById("resultScreen").classList.remove("hidden");

let percent=Math.round((score/questions.length)*100);

document.getElementById("resultScore").innerText=
"Your Score: "+percent+"%";

if(percent>=70){

document.getElementById("resultTitle").innerText="🎉 You're Passed!";
document.getElementById("continueBtn").classList.remove("hidden");

}else{

document.getElementById("resultTitle").innerText="❌ You Failed";
document.getElementById("retryBtn").classList.remove("hidden");

}

saveScore(percent);
loadScoreboard();

}

/* SAVE SCORE */

function saveScore(percent){

let name=document.getElementById("playerName").value;

let scores=JSON.parse(localStorage.getItem("scores"))||[];

scores.push({
name:name,
percent:percent
});

localStorage.setItem("scores",JSON.stringify(scores));

}

/* LOAD SCOREBOARD */

function loadScoreboard(){

let board=document.getElementById("scoreboard");

board.innerHTML="";

let scores=JSON.parse(localStorage.getItem("scores"))||[];

scores.forEach(s=>{

let row=document.createElement("div");

row.className="scoreRow";

row.innerHTML=
"<span>"+s.name+"</span>"+
"<span>"+s.percent+"%</span>";

board.appendChild(row);

});

}

/* RETRY GAME */

function retryGame(){

location.reload();

}
