import React,{useEffect,useState}from 'react'
import { useNavigate,Outlet } from 'react-router-dom'
import axios from 'axios'
export default function Questions() {
    const [mathlessonactive,setMathLessonActive]=useState(false)
    const [codinglessonactive,setCodingLessonActive]=useState(true)
    const[token,setToken]=useState('')
    const[error,setError]=useState('')
    const[questions,setQuestions]=useState([])
    const[Attemptedquestions,setAttemptedQuestions]=useState([])
    const[fullQuestions,setFullQuestions]=useState([])
    const navigate = useNavigate()
    const handlecodingLessons =()=>{
        setCodingLessonActive(true)
        setMathLessonActive(false)
        navigate('questionPage')
      }
      const handleMathLessons=()=>{
        setCodingLessonActive(false)
        setMathLessonActive(true)
        navigate('attempted-questions')
      }
     
      function getAttemptedQuiz(){
       if(token){
        const url ='https://api.codingscholar.com/getAttemptedQuizzes/'
        axios.get(url,{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        .then(res=>{
         
          setAttemptedQuestions(res.data)

        })
        .catch(error=>console.log(error))
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
    function getStudentQuestions(){
        if(token){
          const url ='https://api.codingscholar.com/studentQuestions/'
        axios.get(url,{headers:{
          'Authorization':`Bearer ${token}`
        }})
        .then(res=>{
          const data=res.data 
         
          if (Array.isArray(data) && data.length > 0) {
            console.log('sss',data)
            setQuestions(data) 
          }
          else {
      
            setError('No questions found')
          }
        })
        .catch(error=>{
          console.log(error)
        })
        }
      }
      useEffect(() => {
        if (questions.length >0 && Attemptedquestions.length >0){
          const attemptedKeys = new Set(
            Attemptedquestions.map(item => {
              const date = item.questions?.[0]?.dateforquestionset;
              if (!date) return null;
        
              return `${item.quiz_name.trim()}_${date}`;
            }).filter(Boolean)
          );
        
        
          const filteredData = questions.filter(q => {
            const key = `${q.quiz_name.trim()}_${q.dateforquestionset}`;
            return !attemptedKeys.has(key);
          });
        
          const grouped = filteredData.reduce((acc, item) => {
            const key = `${item.quiz_name}_${item.dateforquestionset}`;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
          }, {});
        
          const groupedArray = Object.entries(grouped).map(([key, questions]) => {
            const last = key.lastIndexOf('_');
            return {
              quiz_name: key.slice(0, last),
              dateforquestionset: key.slice(last + 1),
              questions,
            };
          });
        
          setFullQuestions(groupedArray);
        }else{
          const grouped = questions.reduce((acc, item) => {
            const key = `${item.quiz_name}_${item.dateforquestionset}`;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
          }, {});
        
          const groupedArray = Object.entries(grouped).map(([key, questions]) => {
            const last = key.lastIndexOf('_');
            return {
              quiz_name: key.slice(0, last),
              dateforquestionset: key.slice(last + 1),
              questions,
            };
          });
        
          setFullQuestions(groupedArray);
        }
      }, [questions, Attemptedquestions]);
      
      useEffect(()=>{
        getStudentQuestions()
        getAttemptedQuiz()
      },[token])
      
      useEffect(()=>{
       getToken()
      },[])
  return (
    <div style={{padding:10}} className='AllquestionsWrapper'>
     <div className='classtypenavWrapper'>
        {/* {fullData && fullData.some(item => item.lessonType === 'coding') && fullData.some(item => item.lessonType === 'math') && ( */}
        <ul>
            <li onClick={handlecodingLessons} className={codinglessonactive ? 'activelesson' : ''}>questions</li>
            <li onClick={handleMathLessons} className={mathlessonactive ? 'activelesson' : ''}>Attempted questions</li>
        </ul>
            {/* )} */}
      </div>
      <Outlet context={{fullQuestions,Attemptedquestions}}/>
    </div>
  )
}
