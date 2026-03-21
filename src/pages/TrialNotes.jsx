import React ,{useState,useEffect}from 'react'
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function TrialNotes() {
    const initialState={
        grade:"",
        title:'',
        pdf_notes:'',
        projectlink:'',
        trial_type:''
    }
    const navigate= useNavigate()
    const [inputs,setInputs]=useState(initialState)
    const [openDeletePop,setOpenDeletePop]=useState(false)
    const [notes,setNotes]=useState([])
    const [lesson,setLesson]=useState('')
    const [error,setError]=useState('')
    const [token,setToken]=useState('')
    const [loading,setLoading]=useState(false)
    const handleChange=(e)=>{
     const { name, value, type, files } = e.target;
     if(type==='file'){
        setInputs({...inputs,[name]:e.target.files[0] })
        // setInputs((prev) => ({
        //     ...prev,
        //     [name]: files[0] //  This stores the actual File object
        //   }));
     }else{
        setInputs({...inputs,[name]:value})
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
    function getTrialNotes(){
       if(token){
        const url ='https://api.codingscholar.com/trial_notes/'
        axios.get(url,{headers:{
          'Authorization':`Bearer ${token}`
        }})
        .then(res=>{
          
            const data= res.data
            setNotes(data)
            // data.forEach(item=>{
            //     console.log('ada',item)
            //     const {pdf_notes}= item
            //     const splitNotes=pdf_notes.split('\\')[2]
            //     const data={notesOnly:splitNotes}
            //     console.log('sfs',splitNotes)
            //     setNotes([{...item,...{notesOnly:splitNotes}}])
            //     setNotes(prev => {
            //         const exists = prev.some(existingItem => existingItem.id === item.id);
            //         return exists ? prev : [...prev, { ...item, ...{notesOnly:splitNotes} }];
            //     });

            // })
            // setNotes(data)
        })
        .catch(error=>console.log(error))
       }
    }
    const handleCreateClass = () => {
        setLoading(true);
        const uniqueId = uuidv4();
        const classId = `${inputs.classname}${uniqueId}`; // Corrected from inputs.name
    
        // Create FormData
        if(inputs.grade && inputs.pdf_notes && inputs.title &&  inputs.projectlink &&inputs.trial_type){
            const formData = new FormData();
            formData.append("grade", inputs.grade);
            formData.append("title", inputs.title);
            formData.append("projectlink", inputs.projectlink);
            formData.append("pdf_notes", inputs.pdf_notes)
            formData.append("trial_type", inputs.trial_type)
            // Append file if available
            // if (inputs.notes) {
            //     formData.append("notes", inputs.notes);
            // }else{
            //   setError('Please Fill in all the inputs')
            // }
        
            const url = "https://api.codingscholar.com/trial_notes/";
            for (let [key, value] of formData.entries()) {
                console.log('form',`${key}:`, value);
              }
            if(formData){
                axios
                .post(url, formData, {
                    headers: {
                        "Authorization":`Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    getTrialNotes(); // Corrected missing function execution ()
                    setLoading(false);
                    setInputs(initialState)
                    alert('Notes created successfully')
                    
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
            }
        }else{
            setError('Please Fill In Inputs')
        }
        
    };
    const handleDelete =(lesson)=>{
      setOpenDeletePop(true)
      setLesson(lesson)
    }
    const handleToNotes =(url)=>{
       
        navigate(`/teacher/dashboard/Notes/`, { state: url});
    }
  useEffect(()=>{
    getTrialNotes()
  },[token])
  useEffect(()=>{
    getToken()
  },[])
  return (
    <div className='CreatLessonsWrapper'>
        <h3>create classes</h3>
        <div className='CreatLessonsContainer'>
            <input value={inputs.trial_type} name='trial_type' onChange={handleChange} type='text' placeholder='Class type coding.../mathematics...'/><br/>
            <input value={inputs.grade} name='grade' onChange={handleChange} type='text' placeholder='Grade'/><br/>
            <input value={inputs.title} name='title' onChange={handleChange} type='text' placeholder='Title'/><br/>
            <input value={inputs.projectlink} name='projectlink' onChange={handleChange} type='text' placeholder='Project Link'/><br/>
            <label htmlFor="file-upload" className="custom-file-upload">
             {/* {inputs.notes?inputs.notes:'Upload Notes'} */}
             {inputs.pdf_notes?<p>Selected file: {inputs.pdf_notes.name}</p>:'Upload Trail Notes'}
            </label>
            <input  name='pdf_notes' accept='.pdf'  onChange={handleChange} id="file-upload" type="file" />
            <div className='classBtnContainer'>
                <button onClick={handleCreateClass}>{loading===true?<i className="fa fa-spinner spinner" aria-hidden="true"></i>:"Create  class"} </button>
            </div>
            <div className='TrialNotesWrapper'>
               <table>
                  <thead>
                      <tr>
                         <th>type</th>
                         <th>grade</th>
                         <th>title</th>
                         <th>Notes url</th>
                      </tr>
                  </thead>
                   <tbody>
                     {notes.map((item,i)=>{
                      return(
                        <tr key={i}>
                        <td>{item.trial_type}</td>
                        <td>{item.grade}</td>
                        <td>{item.title}</td>
                        <td>{item.pdf_notes}</td>
                       </tr>
                      )
                     })}
                   </tbody>
               </table>
            </div>
        </div>
    </div>
  )
}

