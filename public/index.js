let currentQuestionIndex = 0



addEventListener('submit' , async event =>{

    const formData = new FormData(event.target);
    const answer = formData.get('answer')
    

    const url = "http://192.168.2.19:3000/checkAnswer?id="+currentQuestionIndex+"&answer="+answer;
    event.preventDefault()
    
   

    const response = await fetch(url);
    const result = await response.json();
    getQuestionDescription();
})
const navButtonPrev = document.getElementById("navigationButtonPrevious")
const navButtonNext = document.getElementById("navigationButtonNext")
const navButtonList = document.getElementById("navigationButtonList")
navButtonPrev.addEventListener("click", ()=>{
    if(currentQuestionIndex==0)
        return
    currentQuestionIndex--
    getQuestionDescription()
    
})
navButtonNext.addEventListener("click", ()=>{
    currentQuestionIndex++
    getQuestionDescription()
})
async function getQuestionDescription(){
    const url = "http://192.168.2.19:3000/question?questionIndex="+currentQuestionIndex;
    
    const response = await fetch(url);
    const result = await response.json();
    console.log(result)
    // bound check
    const checkSuccess = result.success;
    if (checkSuccess==false){
        currentQuestionIndex = result.lastQuestionIndex;
        getQuestionDescription();
        return
    }
    const titleText = result.title;
    const exerciseAnswerInput = document.getElementById("exerciseAnswerInput")
    if(result.lastAttempt == null){
        exerciseAnswerInput.value = "";
    }
    else{
        exerciseAnswerInput.value = result.lastAttempt;
    }
     
    const exerciseSubmitButton = document.getElementById("exerciseSubmitButton")
    if(result.lastAttempt == null){
        exerciseSubmitButton.style.backgroundColor = "blue";
        exerciseSubmitButton.disabled = false;
    }
    else if(result.answered == true){
        exerciseSubmitButton.style.backgroundColor = "green";
        exerciseSubmitButton.disabled = true;
    }
    else{
        exerciseSubmitButton.style.backgroundColor = "red";
        exerciseSubmitButton.disabled = false;
    }
        
    const descriptionText = result.description;
    const exerciseTitle = document.getElementById("exerciseTitle");
    const exerciseDescription = document.getElementById("exerciseDescription");
    exerciseTitle.innerHTML = titleText;
    exerciseDescription.innerHTML = descriptionText;

}
getQuestionDescription();