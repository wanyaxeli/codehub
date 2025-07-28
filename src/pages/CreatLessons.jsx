import React ,{useState,useEffect}from 'react'
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function CreatLessons() {
    const initialState={
        grade:"",
        classname:'',
        module:'',
        notes:'',
        LessonNumber:'',
        classtype:''
    }
    const navigate= useNavigate()
    const [inputs,setInputs]=useState(initialState)
    console.log('input',inputs)
    const [notes,setNotes]=useState([])
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)
    const handleChange=(e)=>{
     const { name, value, type, files } = e.target;
     if(type==='file'){
        setInputs({...inputs,[name]:e.target.files[0] })
        // setInputs((prev) => ({
        //     ...prev,
        //     [name]: files[0] // ✅ This stores the actual File object
        //   }));
     }else{
        setInputs({...inputs,[name]:value})
     }
    }
    console.log('ada',inputs)
    function getNotes(){
        const url ='https://api.codingscholar.com/classNotes/'
        axios.get(url)
        .then(res=>{
            console.log('res',res.data)
            const data= res.data
            setNotes(data)
            // data.forEach(item=>{
            //     console.log('ada',item)
            //     const {notes}= item
            //     const splitNotes=notes.split('\\')[2]
            //     // const data={notesOnly:splitNotes}
            //     console.log('sfs',splitNotes)
            //     // setNotes([{...item,...{notesOnly:splitNotes}}])
            //     setNotes(prev => {
            //         const exists = prev.some(existingItem => existingItem.id === item.id);
            //         return exists ? prev : [...prev, { ...item, ...{notesOnly:splitNotes} }];
            //     });

            // })
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
        if(classId && inputs.grade && inputs.notes &&inputs.module && inputs.classname &&  inputs.LessonNumber){
            const formData = new FormData();
            formData.append("classId", classId);
            formData.append("grade", inputs.grade);
            formData.append("module", inputs.module);
            formData.append("classname", inputs.classname);
            formData.append("LessonNumber", inputs.LessonNumber);
            formData.append("notes", inputs.notes)
            formData.append("classtype", inputs.classtype)
            // Append file if available
            // if (inputs.notes) {
            //     formData.append("notes", inputs.notes);
            // }else{
            //   setError('Please Fill in all the inputs')
            // }
        
            const url = "https://api.codingscholar.com/classNotes/";
            for (let [key, value] of formData.entries()) {
                console.log('form',`${key}:`, value);
              }
            if(formData){
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
                    alert('Lessons created successfully')
                    console.log('res ',res);
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
    const handleToNotes =(url)=>{
        console.log(url)
        navigate(`/teacher/dashboard/Notes/`, { state: url});
    }
  useEffect(()=>{
   getNotes()
  },[])
  return (
    <div className='CreatLessonsWrapper'>
        <h3>create classes</h3>
        <div className='CreatLessonsContainer'>
            <input value={inputs.classtype} name='classtype' onChange={handleChange} type='text' placeholder='Class type coding.../math...'/><br/>
            <input value={inputs.grade} name='grade' onChange={handleChange} type='text' placeholder='Grade'/><br/>
            <input value={inputs.module} name='module' onChange={handleChange} type='text' placeholder='Module'/><br/>
            <input value={inputs.classname} name='classname' onChange={handleChange} type='text' placeholder='Lesson Name'/><br/>
            <input value={inputs.LessonNumber} name='LessonNumber' onChange={handleChange} type='text' placeholder='Lesson Number'/><br/>
            <label for="file-upload" class="custom-file-upload">
             {/* {inputs.notes?inputs.notes:'Upload Notes'} */}
             {inputs.notes?<p>Selected file: {inputs.notes.name}</p>:'Upload Notes'}
            </label>
            <input value={inputs.notes} name='notes' accept='.pdf'  onChange={handleChange} id="file-upload" type="file" />
            <div className='classBtnContainer'>
                <button onClick={handleCreateClass}>{loading===true?<i className="fa fa-spinner spinner" aria-hidden="true"></i>:"Create  class"} </button>
            </div>
            {notes.map((gradeItem) => (
        <div className='classesShowWrapper' key={gradeItem.id}>
          <div className='classesShowHeaderWrapper'>
            <h3>Grade {gradeItem.grade}</h3>
          </div>

          {gradeItem.modules.map((module, index) => (
            <div className='classesShowModuleWrapper' key={index}>
              <h4>Module {module.module_number}</h4>

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Class Number</th>
                    {/* <th>Time</th> */}
                    <th>PDF</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {module.lessons.map((lesson, i) => (
                    <tr key={lesson.lessonId || i}>
                      <td>{lesson.title}</td>
                      <td>{lesson.lesson_number}</td>
                      {/* <td>{lesson.time || 'N/A'}</td> */}
                      <td className='link' onClick={()=>handleToNotes(lesson.pdf_notes)}>
                        {/* <a 
                          href='#'
                          target='_blank'
                          rel='noreferrer'
                        >
                          View PDF
                        </a> */}
                         View PDF
                      </td>
                      <td>
                        <button>add student</button>
                      </td>
                      {/* <td><button>add teacher</button></td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
        </div>
    </div>
  )
}
