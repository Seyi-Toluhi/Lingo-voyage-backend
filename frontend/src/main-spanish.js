const BACKEND_URL = "http://localhost:5000"
document.addEventListener("DOMContentLoaded", initialize);

//decide which of these need to be global variables
let answerDisplay,
  correctAnswer,
  score = 0,
  randomSaved = {};


  //required elements from spanish activities HTML page
const elements = {
  next_quiz: document.querySelector("#next_button"),
  check_answer: document.querySelector("#check_button"),
  quiz_options_labels: document.querySelectorAll(".answer"),
  radio_buttons: document.querySelectorAll("input[name='answer']"),
  quiz_ques: document.querySelector(".quiz_question"),
  quiz_answer_check: document.querySelector("#answer_check"),
  game_progress: document.querySelector("#game_progress"),
  quiz_div: document.querySelector("#quizes"),
  activity_selection_buttons: document.querySelectorAll("#select_activity"),
  activity_div: document.querySelector("#activity_selection_div"),
  quiz_content: document.querySelector("#quiz_content"),
  display_correct_answer: document.querySelector("#correct_answer"),
  grammar_exercise_container: document.querySelector(".grammar_exercise_container"),
  img_wrapper: document.querySelector(".img_wrapper"),
  img_name_wrapper: document.querySelector(".name_wrapper"),
  profile_display_container: document.querySelector("#profile_display"),
  matching_game_instruction: document.querySelector("#matching_game_instruction"),
  play_word_speech: document.querySelector(".play_word_speech"),
  select_speech_practice_div: document.querySelector("#select_speech_practice_div"),
  word_speech: document.querySelector("#word_speech"),
  speech_practice_answers: Array.from(document.querySelectorAll(".speech_practice_answers")),
  close_button: document.querySelector("#close-button"),
  next_speech: document.querySelector("#next_speech")
};

//initialize function to add all event listeners on web laod, check if a user is logged in and hide logout/delete account buttons on profile page if not.
function initialize() {
  attachEventListeners();
  checkUserLoggedIn()
  hideProfileButtons()
}

//function to add event listeners for spanish learning activities 
function attachEventListeners() {
  let selectionArr = [];
  if (elements.activity_div) {
      for (let i = 0; i < elements.activity_selection_buttons.length; i++) {
          selectionArr.push(elements.activity_selection_buttons[i]);
          selectionArr[i].addEventListener("click", loadActivity);
        }
  }
  if(elements.check_answer){
      elements.check_answer.addEventListener("click", checkQuizAnswer);}

  if(elements.next_quiz){
      elements.next_quiz.addEventListener("click", skipQuiz);}

  if (elements.speech_practice_answers){
    elements.speech_practice_answers.forEach(
      answer => answer.addEventListener("click", checkSelectedAnswer)
    );
  }

  if(elements.close_button){elements.close_button.addEventListener("click", hideActivities)}

  if(document.getElementById("closePopup")){document.getElementById("closePopup").addEventListener("click", closePopup);}
}

//function to hide logout/delete account buttons on profile page if no user is logged in
function hideProfileButtons(){
  document.getElementById("logout").classList.add("hide")
  document.getElementById("delete_account_button").classList.add("hide")
}

//function to check if a user token is on localStorage for JWT authentication
function isLoggedIn() {
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn
}

//function to load different learning activities based on user selection
function loadActivity(e) {
   elements.activity_div.classList.add("hide");
   document.getElementById("exit_link").classList.add("hide")
   document.getElementById("close-button").classList.remove("hide")
    if (e.target.classList.contains("select_quiz")) {
      elements.quiz_content.classList.remove("hide");
      fetchQuiz();
    } 
    if (e.target.classList.contains("select_grammar_exercises")) {
        elements.matching_game_instruction.remove("hide");
        elements.grammar_exercise_container.classList.remove("hide");
      wordMatch();
    } 
    if (e.target.classList.contains("select_speech_practice")) {
      elements.select_speech_practice_div.classList.remove("hide")
      speechPractice();
    }
  }

  function hideActivities() {
    location.reload();
  }

  //api call to fetct spanish quiz json file from github where ive hosted it 
  async function fetchQuiz() {
   try { const requestURL = "https://raw.githubusercontent.com/Seyi-Toluhi/language_learning_app/main/Language_learning/frontend/src/json_files/Spanish.json";
    const request = new Request(requestURL);
    const response = await fetch(request);
    const spanishQuiz = await response.json();
    displayQuiz(spanishQuiz);}
    catch (e) {
      console.log('Failed to fetch quiz questions', e.message)}
  }

  //generate a random number for random quiz question selection
  const generateRandom = (size) => {
    let randomIndex;
    if (Object.keys(randomSaved).length < size) {
    while (true) {
      randomIndex = Math.floor(Math.random() * size);
      if (!randomSaved[randomIndex]) {
        randomSaved[randomIndex] = true;
        return randomIndex;
      }
    }}
  else {
    displayQuizResult();
  
  }
  };
  
  
  //dispaying quiz questions
  function displayQuiz(response) {
    const optionsArr = ["a", "b", "c", "d"]; //this array gives me the keys to my quiz answers
    let rand = generateRandom(12);
    let obj = response;
    const quiz = obj[rand]["quiz"]; //gives a random question in obj
    correctAnswer = obj[rand]["correctAnswer"]; //stores the correct answer to above random question
    elements.quiz_ques.textContent = quiz;
  
    for (let i = 0; i < optionsArr.length; i++) {
      let answers = obj[rand].answers[`${optionsArr[i]}`]; //looping through options arr to access the keys to the answers
      elements.quiz_options_labels[i].innerHTML = `${answers}`; //attaching them as labels to radio buttons
      elements.radio_buttons[i].setAttribute("value", `${answers}`);
    }
  }

//function to check user's selected answer and respond if its correct or incorrect
function checkQuizAnswer() {
  let selectedAnswer;


  for (const radioButton of elements.radio_buttons) {
    if (radioButton.checked) {
      selectedAnswer = radioButton.value;   //check value of clicked button and update selectedAnswer  
      break;
    }
  }
  
  if (selectedAnswer) {
    if (selectedAnswer === correctAnswer) {// check that selected answer is correct and increment score. log score
      if (isLoggedIn()) // if a user is logged in and score is less than 12, increment score
      {
        localStorage.setItem("score", score)

        if (score < 12){
        score++
        let currentScore = parseInt(localStorage.getItem("score"))
        currentScore = currentScore + 1;
        localStorage.setItem("score", currentScore);
        if(score == 12)
         {updateScoreData()}
        }

     }
      correctAnswerDisplay();
    } 
    else 
    {
      wrongAnswerDisplay();
    }
  } else {
    alert("Please pick your answer");
  }
}

//function to show user the final quiz result
function displayQuizResult(){
  const questionsCount = 12;
  const score = localStorage.getItem("score")
  const resultContainer = document.createElement("div");
  resultContainer.className = "result-container";
  if(score == 12){
    resultContainer.innerHTML = `You're a gem. You got ${score} out of ${questionsCount} in Spanish and earned 20 XP`;
  } else{
    resultContainer.innerHTML = `Quiz Completed.You got ${score} out of ${questionsCount} in Spanish. To earn 20 XP, you need a score of 12`;
  }
  elements.quiz_content.appendChild(resultContainer);
  elements.game_progress.classList.add("hide")
  elements.quiz_div.classList.add("hide")
}

//function to update user table in the database with quiz XP if earned
async function updateScoreData(){
  let user_id = parseInt(localStorage.getItem("user_id"))
  let token = localStorage.getItem("token")
  

  const payload = {
    XP : 20,
    id : user_id
  }
  await fetch(`${BACKEND_URL}/update_user_score`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(payload),
  credentials: 'include'
}
  )
  if (response.status !== 200) {
    throw new Error("Unable to update score");
    }
}

//function for displaying feedback for quiz if user selection is correct
  function correctAnswerDisplay(){
    elements.quiz_answer_check.classList.add("hide_check");
    answerDisplay = document.createElement("div");
    const answerPara = document.createElement("p");
    const continueButton = document.createElement("button");
    answerDisplay.setAttribute("id", "answer_div");
    answerDisplay.style.backgroundColor = "green";
    answerPara.textContent = "That's Correct";
    continueButton.textContent = "Continue";
    answerDisplay.append(answerPara, continueButton);
    continueButton.addEventListener("click", nextQuiz);
    elements.game_progress.appendChild(answerDisplay);
  }

  //function for displaying feedback for quiz if user selection is incorrect
  function wrongAnswerDisplay(){
    elements.quiz_answer_check.classList.add("hide_check");
    answerDisplay = document.createElement("div");
    const answerPara = document.createElement("p");
    const continueButton = document.createElement("button");
    answerDisplay.setAttribute("id", "answer_div");
    answerDisplay.style.backgroundColor = "red";
    answerPara.textContent = `That's Wrong. The correct answer is ${correctAnswer}`;
    continueButton.textContent = "Continue";
    answerDisplay.append(answerPara, continueButton);
    continueButton.addEventListener("click", nextQuiz);
    elements.game_progress.appendChild(answerDisplay);
  }

  //function to display next quiz
  function nextQuiz() {
    fetchQuiz();
    elements.quiz_answer_check.classList.remove("hide_check");
    if(answerDisplay){
    elements.game_progress.removeChild(answerDisplay);}
  }

  //function to skip a quiz question
function skipQuiz(){
  fetchQuiz();
}

//image and matching name for word/iamge match
const imgMatch = [
  { name: "el agua", image: "water.jpg" },
  { name: "un hospital", image: "hospital.jpg" },
  { name: "un barco", image: "ship.png" },
  { name: "un coche", image: "car.png" },
  { name: "una bicicleta", image: "bicycle.png" },
];

const imageName = ["un barco", "el agua", "un hospital", "una bicicleta", "un coche"];

//function to display word and image matching activity and check if correctly matched
  function wordMatch() {
    let firstClicked = false;
    let firstValue, secondValue, firstElementClass, secondElementClass;
    
    //let secondClicked
    let tempArray = [...imageName], clickedItems = [];
    tempArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < imgMatch.length; i++) { //loop to display images and names
      elements.img_wrapper.innerHTML += `<div class="img-container" data-item-value="${imgMatch[i].name}">
    <div class="img-display">
    <img src="images/${imgMatch[i].image}" class="image"/></div>
    </div>`;
  
    elements.img_name_wrapper.innerHTML += `<div class="name-container" data-item-value="${tempArray[i]}"><span>${tempArray[i]}</span>
    </div>`;
    }
  
    let imgs = Array.from(document.querySelectorAll(".img-container"));
    let names = Array.from(document.querySelectorAll(".name-container"));
    clickedItems = [...imgs, ...names];
    let correctAnswerCount = 0;
    clickedItems.forEach((item) => {
      
      item.addEventListener("click", () => {
        
        if (!firstClicked) {
          firstClicked = item;
          firstClicked.style.backgroundColor = "rgba(112, 177, 212, 0.2)";
          firstValue = item.getAttribute("data-item-value");
          firstElementClass = item.getAttribute("class");
        } else {
          let secondClicked = item;
          secondValue = item.getAttribute("data-item-value");
          secondElementClass = item.getAttribute("class");
  
          if (firstValue === secondValue) {
            correctAnswerCount++;
            firstClicked.style.backgroundColor = "rgba(0,255,0,0.1)";
            secondClicked.style.backgroundColor = "rgba(0,255,0,0.1)";
            firstClicked.classList.remove("firstElementClass");
            secondClicked.classList.remove("secondElementClass");
            firstClicked.classList.add("disabled");
            secondClicked.classList.add("disabled");
            firstClicked = false;
          }
          else{
           const click1 = firstClicked;
           const click2 = secondClicked;
           firstClicked.style.backgroundColor ="";
            firstClicked.classList.add("red-background");
            secondClicked.classList.add("red-background");
            
            setTimeout(() => {
            click1.classList.remove("red-background");
            click2.classList.remove("red-background");
            }, 500);
            
              
          firstClicked = false;
          }
       
    }
  if(correctAnswerCount === 5){
    const result = document.querySelector("#result")
    const resultMsg = document.createElement("p")
    resultMsg.innerText="You must be proud of yourself! You've earned 20 XP";
    updateScoreData()
    elements.grammar_exercise_container.classList.add("hide")
    result.appendChild(resultMsg);
    //}
if(!localStorage.getItem("XP_earned")){
    let completedMatch = 100
    const XP = parseInt(localStorage.getItem("XP"))
    completedMatch = XP + completedMatch
    localStorage.setItem("XP", completedMatch);//}
    localStorage.setItem("XP_earned", "true");
  }}
  });
    });
  }

//speech practice data structure
const speechPracticeArray = [
    {
      word: "el agua",
      options: {
        a: "Cup",
        b: "Water",
        c: "Food",
      },
      correctAnswer: "Water"
    },
    {
      word: "una bicicleta",
      options: {
        a: "Vehicle",
        b: "Bicycle",
        c: "Table",
      },
      correctAnswer: "Bicycle"
    },
    {
      word: "un barco",
      options: {
        a: "Ship",
        b: "Car",
        c: "House",
      },
      correctAnswer: "Ship"
    },
    {
      word: "un coche",
      options: {
        a: "Bicycle",
        b: "Water",
        c: "Car",
      },
      correctAnswer: "Car"
    },
    {
      word: "un hospital",
      options: {
        a: "Church",
        b: "Hospital",
        c: "Telephone",
      },
      correctAnswer: "Hospital"
    }
  ];


//function to sa voice from the voice array and speak when user clicks on a word
function speak(e) {
responsiveVoice.speak(`${e.target.getAttribute("id")}`, "Spanish Female"); // This will speak the provided text

}

//correct speech answer set to 0
let speechAnswer
let correctSpeechAnswer = 0

function speechPractice() {
displaySpeechQuestion()

}

// function to display a speech practice exercise. max of 5. if all 5 answered correctly, user score in updated in database
function displaySpeechQuestion(){
  if (correctSpeechAnswer < 5){
  const rand_speech = generateRandom(5);
  elements.word_speech.innerHTML = speechPracticeArray[rand_speech].word;
  speechAnswer = speechPracticeArray[rand_speech].correctAnswer
  elements.play_word_speech.setAttribute("id", `${speechPracticeArray[rand_speech].word}`)
  elements.play_word_speech.addEventListener("click", speak);


  let speechPracticeOptions = Object.values(speechPracticeArray[rand_speech].options);
  for (let i = 0; i < speechPracticeOptions.length; i++){
    elements.speech_practice_answers[i].textContent = speechPracticeOptions[i]
  }
}

else{elements.select_speech_practice_div.classList.add("hide")
updateScoreData()
document.getElementById("speech_practice_completed").classList.remove("hide")}
}

//function to check selected answer and provide feeback in a popup
function checkSelectedAnswer(e){
 if(e.target.innerHTML === speechAnswer){
  correctSpeechAnswer++
  showPopup("Correct! Well done!");
  giveCorrectFeedback()
  setTimeout(closePopup, 1000);
  displaySpeechQuestion()
  }
  else{
    showPopup("Inorrect! Try again!");
    giveIncorrectFeedback()
    setTimeout(closePopup, 1000);}
}

//correct answer feedback
function giveCorrectFeedback(){
const utterance = new SpeechSynthesisUtterance("Well done");
utterance.voice = speechSynthesis.getVoices()[2];
speechSynthesis.speak(utterance); 
}

//wrong answer feedback
function giveIncorrectFeedback(){
  const utterance = new SpeechSynthesisUtterance("Please Try again");
  utterance.voice = speechSynthesis.getVoices()[2];
  speechSynthesis.speak(utterance); 
  }

// Function to show the popup with a custom message
function showPopup(message) {
  document.getElementById("feedbackMessage").textContent = message;
  document.getElementById("popupContainer").style.display = "flex";
}

// Function to close the popup
function closePopup() {
  document.getElementById("popupContainer").style.display = "none";
}

// Attach a click event to the close button



