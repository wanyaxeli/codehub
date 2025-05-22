import React ,{useState,useEffect}from 'react'
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
export default function CreatLessons() {
    const initialState={
        grade:"",
        classname:'',
        module:'',
        notes:'',
        LessonNumber:''
    }
    const [inputs,setInputs]=useState(initialState)
    const [notes,setNotes]=useState([])
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)
    const handleChange=(e)=>{
     const {name,value,type}= e.target
     if(type==='files'){
        setInputs({...inputs,[name]:e.target.files[0] })
     }else{
        setInputs({...inputs,[name]:value})
     }
    }
    console.log('ada',inputs)
    function getNotes(){
        const url ='https://api.codingscholar.com/classNotes/'
        axios.get(url)
        .then(res=>{
            console.log(res.data)
            const data= res.data
            data.forEach(item=>{
                console.log('ada',item)
                const {notes}= item
                const splitNotes=notes.split('\\')[2]
                // const data={notesOnly:splitNotes}
                console.log('sfs',splitNotes)
                // setNotes([{...item,...{notesOnly:splitNotes}}])
                setNotes(prev => {
                    const exists = prev.some(existingItem => existingItem.id === item.id);
                    return exists ? prev : [...prev, { ...item, ...{notesOnly:splitNotes} }];
                });

            })
            // setNotes(data)
        })
        .catch(error=>console.log(error))
    }
    console.log(notes)
    const handleCreateClass = () => {
        setLoading(true);
        const uniqueId = uuidv4();
        const classId = `${inputs.classname}${uniqueId}`; // Corrected from inputs.name
    
        // Create FormData
        const formData = new FormData();
        formData.append("classId", classId);
        formData.append("grade", inputs.grade);
        formData.append("module", inputs.module);
        formData.append("classname", inputs.classname);
        formData.append("LessonNumber", inputs.LessonNumber);
        
        // Append file if available
        if (inputs.notes) {
            formData.append("notes", inputs.notes);
        }else{
          setError('Please Fill in all the inputs')
        }
    
        const url = "https://api.codingscholar.com/classNotes/";
        
        axios
            .post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                getNotes(); // Corrected missing function execution ()
                setLoading(false);
                setInputs(initialState)
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };
  useEffect(()=>{
   getNotes()
  },[])
  return (
    <div className='CreatLessonsWrapper'>
        <h3>create classes</h3>
        <div className='CreatLessonsContainer'>
            <input name='grade' onChange={handleChange} type='text' placeholder='Grade'/><br/>
            <input name='module' onChange={handleChange} type='text' placeholder='Module'/><br/>
            <input name='classname' onChange={handleChange} type='text' placeholder='Lesson Name'/><br/>
            <input name='LessonNumber' onChange={handleChange} type='text' placeholder='Lesson Number'/><br/>
            <label for="file-upload" class="custom-file-upload">
             {inputs.notes?inputs.notes:'Upload Notes'}
            </label>
            <input name='notes' accept='.pdf'  onChange={handleChange} id="file-upload" type="file" />
            <div className='classBtnContainer'>
                <button onClick={handleCreateClass}>{loading===true?<i className="fa fa-spinner spinner" aria-hidden="true"></i>:"Create  class"} </button>
            </div>
         <div className='classesShowWrapper'>
            <table>
                <thead>
                       <tr>
                        <th>Name</th>
                       <th>module</th>
                       <th>time</th>
                       <th>pdf</th>
                       </tr>
                </thead>
                <tbody>
                    {notes.map(note=>{
                        return(
                        <tr key={note.id}>
                        <td>{note.classname}</td>
                        <td>{note.module}</td>
                        <td>{note.time}</td>
                        <td>{note.notesOnly}</td>
                        <td><button>add student</button></td>
                        {/* <td><button>add teacher</button></td> */}
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
