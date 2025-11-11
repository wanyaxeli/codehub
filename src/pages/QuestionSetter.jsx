import axios from 'axios'
import React,{useState,useEffect} from 'react'

export default function QuestionSetter() {
  const [options,setOptions]=useState([])
  const [questions,setQuestions]=useState([])
  const [optionsValue,setOptionsValue]=useState('')
  const [error,setError]=useState('')
  const initialState={question:'',quiztype:'',date:'',name:'',grade:'',module:'',answer:''}
  const [Value,setValue]=useState(initialState)
  const handleAddOptions =()=>{
   if(optionsValue){
    setOptions(pre=>[...pre,optionsValue])
    setOptionsValue('')
   }else{
    setError('Please options input is empty')
   }
  }
  const handleOptions =(e)=>{
    setError('')
    setOptionsValue(e.target.value)
  }
  const handleChange =(e)=>{
    setError('')
   const {value,name}=e.target
   setValue({...Value,[name]:value})
  }
  const handleNextQuiz =()=>{
   if(Value.quiztype &&Value.name && Value.date && Value.grade&&Value.module &&Value.question && options.length ===4 && Value.answer){
    const data={quiztype:Value.quiztype,name:Value.name,date:Value.date,grade:Value.grade,module:Value.module,question:Value.question,options:options,answer:Value.answer}
    console.log(data)
    setQuestions(pre=>[...pre,data])
    setValue(initialState)
    setOptions([])
   }else{
    setError('Please fill all fields')
   }
  }
  const handleSubmitQuiz = () => {
    if (questions.length === 5) {
      const url = 'https://api.codingscholar.com/questionSetter/';
  
      // create an array of promises
      const promises = questions.map((question) => {
        const data = {
          quiztype: question.quiztype,
          grade: question.grade,
          module: question.module,
          quiz: question.question,
          answer: question.answer,
          options: question.options,
          date:question.date,
          name:question.name
        };
        return axios.post(url,data);
      });
  
      // wait for all promises to finish
      Promise.all(promises)
        .then((responses) => {
          // console.log(responses.map((res) => res.data));
          alert("All questions submitted successfully!");
          setQuestions([]);
        })
        .catch((error) => {
  
          alert("Something went wrong while submitting the quiz.");
        });
  
    } else {
      setError("Please make sure you have five questions");
    }
  };
  
  return (
    <div className='QuestionSetterWrapper'>
         <h2>Create daily questions for students</h2>
          <div className='optionsWrapper'>
          {options.length >0 ?
         options.map((option,i)=>{
          return(
            <ol key={i}>
              <li>{option}</li>
            </ol>
          )
         }):'' 
        }
          </div>
         <div className='questionsInputContainer'>
            {error &&  <p style={{color:'red',paddingBottom:10}}> {error}</p>}
            <input type='text' value={Value.name} name='name' onChange={handleChange} placeholder='Enter quiz name'/><br/>
            <input type='text' value={Value.quiztype} name='quiztype' onChange={handleChange} placeholder='Enter Question type coding/math'/><br/>
            <input type='text' value={Value.grade} name='grade' onChange={handleChange} placeholder='Enter grade'/><br/>
            <input type='text' value={Value.module} name='module' onChange={handleChange} placeholder='Enter module'/><br/>
            <textarea value={Value.question} name='question' onChange={handleChange} placeholder='Enter question'/><br/>
            <input type='text' value={Value.answer} name='answer' onChange={handleChange} placeholder='Enter answer'/><br/>
            <input type='date' value={Value.date} name='date' onChange={handleChange} placeholder='Enter answer'/><br/>
            <div className='optionsInputWrapper'>
            <input type='text' value={optionsValue} onChange={handleOptions} placeholder='Enter four answer options including answer'/>   
            <button onClick={handleAddOptions}>add</button>
            </div>  
            <div className='nextquizBtnWrapper'>
              {questions.length===5?<button onClick={handleSubmitQuiz}>submit</button>:<button onClick={handleNextQuiz}>next</button>}
            </div>

         </div>
    </div>
  )
}
