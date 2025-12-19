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
          console.log('sada',res.data)
          if (Array.isArray(data) && data.length > 0) {
           
            setQuestions(data)
            // const grouped = data.reduce((acc, item) => {
            //   // combine both fields to form a unique key
            //   const key = `${item.quiz_name}_${item.dateforquestionset}`;
            //   if (!acc[key]) acc[key] = [];
            //   acc[key].push(item);
            //   return acc;
            // }, {});
          
            // // convert grouped object into array
            // const groupedArray = Object.entries(grouped).map(([key, questions]) => {
            //   // extract quiz_name and datefrom key
            //   const [quiz_name, dateforquestionset] = key.split('_');
            //   return {
            //     quiz_name,
            //     dateforquestionset,
            //     questions,
            //   };
            // });
          
            // setFullQuestions(groupedArray);
           
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
      useEffect(()=>{
      if(questions.length > 0 && Attemptedquestions.length > 0){
        const attemptedNames = new Set(
          Attemptedquestions.map(item => item.quiz_name)
        );
      
        const filteredData = questions.filter(
          q => !attemptedNames.has(q.quiz_name)
        );
        console.log('filer',filteredData)
        const grouped = filteredData.reduce((acc, item) => {
          // combine both fields to form a unique key
          const key = `${item.quiz_name}_${item.dateforquestionset}`;
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        }, {});
      
        // convert grouped object into array
        const groupedArray = Object.entries(grouped).map(([key, questions]) => {
          // extract quiz_name and datefrom key
          const [quiz_name, dateforquestionset] = key.split('_');
          return {
            quiz_name,
            dateforquestionset,
            questions,
          };
        });
      
        setFullQuestions(groupedArray);
      }else{
        const grouped = questions.reduce((acc, item) => {
          // combine both fields to form a unique key
          const key = `${item.quiz_name}_${item.dateforquestionset}`;
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        }, {});
        console.log('ggg',grouped)
        // convert grouped object into array
        const groupedArray = Object.entries(grouped).map(([key, questions]) => {
          // extract quiz_name and datefrom key
          const [quiz_name, dateforquestionset] = key.split('_');
          return {
            quiz_name,
            dateforquestionset,
            questions,
          };
        });
       
        setFullQuestions(groupedArray);
      }
      },[questions,Attemptedquestions])
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
