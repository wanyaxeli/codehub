import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function SetQuiz() {
  const initialState={quiz:'',name:'',deadline:'',module:'',title:''}
  const [values,setValues]=useState(initialState)
  const [token,setToken]=useState('')
  const [notes,setNotes]=useState([])
  const [error,setError]=useState('')
  const [lesson,setLesson]=useState('')
  const handleChange=(e)=>{
   const {name,value}=e.target
   setValues({...values,[name]:value})
  }
  const handleSubmit =()=>{
    if(values.module && lesson && values.name && values.quiz && values.title){
      const url = 'https://api.codingscholar.com/Quizes/';
      const data={module:values.module,
      lessonId:lesson,name:values.name,
      quiz:values.quiz,title:values.title}
      axios.post(url,data,{headers:{
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
  function getNotes(){
    const url ='https://api.codingscholar.com/classNotes/'
    axios.get(url)
    .then(res=>{
        console.log('res notes',res.data)
        const data= res.data
        setNotes(data)
    })
    .catch(error=>console.log(error))
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
const handleCourseChange=(e)=>{
 console.log(e)
 setLesson(e)
}
useEffect(()=>{
getToken()
},[])
useEffect(()=>{
  getNotes()
 },[])
  return (
    <div className='SetQuizWrapper'>
        <h3>set quiz for students</h3>
        <div className='quizContainer'>
            <input onChange={handleChange} value={values.title} name='title' type='text' placeholder='Quiz name...'/><br/>
            <input onChange={handleChange} value={values.name} name='name' type='text' placeholder='Grade...'/><br/>
            <select
            value={lesson}
            onChange={(e) => handleCourseChange(e.target.value)}
            className="courseInput"
          >
            <option value="">Select Course</option>

                  {notes.map((note, i) =>
                    note.modules.map((item, j) =>
                      item.lessons.map((lesson, k) => (
                        <option
                          key={`${i}-${j}-${k}`}
                          value={lesson.lessonId}
                        >
                          Grade {note.grade} Notes {lesson.title}
                        </option>
                      ))
                    )
                  )}
              </select>
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
