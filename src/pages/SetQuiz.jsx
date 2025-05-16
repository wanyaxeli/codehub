import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function SetQuiz() {
  const initialState={quiz:'',name:'',deadline:'',module:'',title:''}
  const [values,setValues]=useState(initialState)
  const [token,setToken]=useState('')
  const [error,setError]=useState('')
  const handleChange=(e)=>{
   const {name,value}=e.target
   setValues({...values,[name]:value})
  }
  const handleSubmit =()=>{
    if(values.module && values.name && values.quiz && values.title){
      const url = 'http://api.codingscholar.com/Quizes/';
      axios.post(url,values,{headers:{
        'Authorization':`Bearer ${token}`
      }})
      .then(res=>{
        console.log(res.data)
        setValues(initialState)
      })
      .catch(error=>{console.log(error)})
    }else{
      setError('Please fill all inputs')
    }
  }
  async function getToken(){
    try{
        const token= localStorage.getItem('token') // No need to await
        if (token){
            setToken(token);
        }
    } catch(error) {
        console.log(error);
}
} 
useEffect(()=>{
getToken()
},[])
  return (
    <div className='SetQuizWrapper'>
        <h3>set quiz for students</h3>
        <div className='quizContainer'>
            <input onChange={handleChange} value={values.title} name='title' type='text' placeholder='Quiz name...'/><br/>
            <input onChange={handleChange} value={values.name} name='name' type='text' placeholder='Grade...'/><br/>
            <input onChange={handleChange} value={values.module} name='module' type='text' placeholder='Module...'/><br/>
            <input onChange={handleChange} value={values.deadline} name='deadline' type='date'/><br/>
            <textarea onChange={handleChange} value={values.quiz} name='quiz' placeholder='Quiz...'/>
            <div className='QuizBtnWrapper'>
                <button onClick={handleSubmit}>submit</button>
            </div>
        </div>
    </div>
  )
}
