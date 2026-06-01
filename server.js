const express = require('express')
const app = express()
const port = 3000

let questions = [
    {
        title: 'age?',
        description: 'whats 1*100',
        answer: 100,
        answered: false,
        lastAttempt: null
    },
    {
        title: 'gender?',
        description: 'whats 2*100',
        answer: 200,
        answered: false,
        lastAttempt: null
    },
    {
        title: 'status?',
        description: 'whats 3*100',
        answer: 300,
        answered: false,
        lastAttempt: null
    }

]
console.log(questions[1])

app.use(express.static('public'))

app.get('/' , (req , res)=> {
    res.send('hello world')
})
app.get('/abc' , (req , res)=> {
    res.send('123')
})
app.get('/checkAnswer' , (req , res)=> {
    const questionIndex = req.query.id
    if(questionIndex<0 || questionIndex> questions.length-1){
        res.json({
            success:false,
            lastQuestionIndex: questions.length-1 
        })
        return
    }
    const answer = req.query.answer
    questions[questionIndex].lastAttempt = answer
    if(answer ==questions[questionIndex].answer){
        questions[questionIndex].answered = true
    }
    let response = {
        isAnswerCorrect: answer ==questions[questionIndex].answer
    }
    res.json(response)
})

app.get('/question' , (req , res)=> {
    const questionIndex = req.query.questionIndex
    if(questionIndex<0 || questionIndex> questions.length-1){
        res.json({
            success:false,
            lastQuestionIndex: questions.length-1 
        })
        return
    }
        
    let response = {
        success:true,
        title: questions[questionIndex].title,
        description: questions[questionIndex].description,
        answered: questions[questionIndex].answered,
        lastAttempt: questions[questionIndex].lastAttempt
    }
    res.json(response)

})

app.listen(port, () => {
    console.log('listening on port ${port}')
})