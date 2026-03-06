import { Accessibility, ArrowLeft, Calendar, Check, Edit2, Plus, Trash2, User, Users, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddStudents from "../pages/AddStudents";

// const allstudents = [
//   {
//     id: '1',
//     name: 'Alice Johnson',
//     email: 'alice@example.com',
//     country: 'USA',
//     phone: '+1-555-0101',
//   },
//   {
//     id: '2',
//     name: 'Bob Smith',
//     email: 'bob@example.com',
//     country: 'UK',
//     phone: '+44-555-0102',
//   },
//   {
//     id: '3',
//     name: 'Carol White',
//     email: 'carol@example.com',
//     country: 'Canada',
//     phone: '+1-555-0103',
//   },
// ];

// const allteachers = [
//   { id: '1', name: 'Dr. Sarah Connor', email: 'sarah@example.com' },
//   { id: '2', name: 'Prof. John Doe', email: 'john@example.com' },
//   { id: '3', name: 'Ms. Emily Davis', email: 'emily@example.com' },
// ];
const weekdays=['monday', 'tuesday','wednesday','thursday','friday','saturday','sunday']

export default function GroupDetails({group,onBack}){
    const [allstudents,setAllStudents]=useState([])
    const [allteachers,setAllTeachers]=useState([])
    const [isEditingName,setIsEditingName]=useState(false)
    const [isEditingGdescription,setIsEditingGDescription]=useState(false)
    const [groupdescription,setGroupDescription]=useState('')
    const [groupname,setGroupName]=useState(group.group_name)
    const [showaddstudentmodal,setshowaddStudentsModal]=useState(false)
    const [students , setStudents]=useState([])
    const [assignedTeacher,setAssignedTeacher]=useState(null)
    const [showAssignTeacherModal,setshowAssignTeacherModal]=useState(false)
    const [showScheduleClassModal,setShowScheduleClassModal]=useState(false)
    const [scheduledClasses,setscheduledClasses]=useState([])
    const [showDeleteConfirmModal,setShowDeleteConfirmModal]=useState(false)
    const [selectedStudents,setSelectedStudents]=useState(new Set())
    const [lessonName,setLessonName]=useState('')
    const [classDate,setClassDate]=useState('')
    const [starttime,setStartTime]=useState('')
    const [room,setRoom]=useState({
        grade:'',
        gradetype:'',
        module:'',
        teacher:''
    })
    const [roomdetails,setRoomDetails]=useState()
    const [isSaving,setIsSaving]=useState()
    const [originalstudents,setOriginalstudents]=useState([])
    const [showSaveConfirmModal,setShowSaveConfirmModal]=useState(false)
    const [isroomModule,setIsRoomModule]=useState(false)
    const [classType,setClassType]=useState()
    const [lessonNumber,setLessonNumber]=useState()   
    const [originalClassSchedule,setOriginalClassSchedule]=useState([])
    const [classDay,setClassDay]=useState()
    const [scheduleDays,setScheduleDays]=useState([])
    const [changedTeacher,setChangedTeacher]=useState()
    const [got_t, setGot_t]=useState()

    const student_url='https://api.codingscholar.com/student/'
    const teachers_url ='https://api.codingscholar.com/registerTeacher/'
    const saveroom_url=`https://api.codingscholar.com/CreateClassGroupRoomView/${group.id}`
    const studentaddurl=`https://api.codingscholar.com/AddStudentToGroup/${group.id}`
    const scheduleclasses_url =`https://api.codingscholar.com/GroupLessonView/${group.id}`
    // const scheduleclasses_url=''
    const deletegroup=`https://api.codingscholar.com/DeleteGroupclass/${group.id}`
    const students_in_group_url=`https://api.codingscholar.com/studentInGroup/${group.id}`
    const group_lesson_url=`https://api.codingscholar.com/teacherGroupClass`
    const group_details=`https://api.codingscholar.com/Get_class_group_room/${group.id}`


    const fetchgroup_students=async(goten_token)=>{
      try{
        const students=await axios.get(students_in_group_url,{
          headers:{
            Authorization:`Bearer ${goten_token}`
          }
        })

        const group_students=students.data
        setStudents(group_students)
        setOriginalstudents(group_students)

      }catch(e){
        console.log('error in getting all students in agroup',e)
      }
    }

    const formatdates=(dates)=>{
      return new Date(dates).toLocaleDateString("en-GB",{
        day:'numeric',
        month:'short',
        year:'2-digit',
        weekday:'long',
        hour:'2-digit',
        minute:'2-digit'
      })
    }

    const grouplessons=async(goten_token)=>{
      try{
        const {data}=await axios.get(group_lesson_url,{
          headers:{
            Authorization:`Bearer ${goten_token}`
          }
        })

        const group_classes=data.filter((lesson)=> lesson.group_class.id==group.id && new Date(lesson.date_time).getTime() >= Date.now())
        setscheduledClasses(group_classes)
        setOriginalClassSchedule(group_classes)
        // const grouped_lessons=Object.values(
        //   group_classes.reduce((acc,lesson)=>{
        //     const classType=lesson.lessontype

        //     if(!acc[classType]){
        //       acc[classType]={
        //         classType:classType,
        //         lessonNumber:[],
        //         lessonTitle:[],
        //         scheduleddates:[]
        //       }
        //     }

        //     acc[classType].lessonNumber.push()
        //   })  
        // )



      // const 
      // const upcoming_classes=group_classes.filter()


      }catch(e){
        console.error('error in getting group lessons',e)
      }
    }

    const fetch_groupdetails=async()=>{
      try{
        const groupdetails =await axios.get(group_details)
        const details=groupdetails.data
        const existing_room={
          grade:details?.room??'',
          gradetype:details?.roomType??'',
          module:details?.module??'',
          teacher:details?.teacher??''
        }
        const teachers_data=await fetchData()
        const newteacher=teachers_data.find((teacher)=>teacher.id===Number(details.teacher))
        
        setAssignedTeacher(newteacher)
        setRoom(existing_room)
        

      }catch(e){
        console.error('error in getting group_details',e)
      }
    }

    const fetchData=async () =>{
      try{
        const [studentRes,teachersRes]=await Promise.all([
          axios.get(student_url),
          axios.get(teachers_url),
        ]);
        const teachers_data=teachersRes.data
        setAllStudents(studentRes.data)
        setAllTeachers(teachersRes.data)

        return teachers_data

      }catch(e){
        console.error('error in getting data from the backend', e)
      }
    }
    useEffect(()=>{
      const got_t=localStorage.getItem('token')
      setGot_t(got_t)
      fetchgroup_students(got_t)
      fetchData()
      fetch_groupdetails()
      grouplessons(got_t)
      
    },[])

    const closeModal=()=>{
        setRoom({grade:'',module:'',teacher:''})
        setIsRoomModule(false)

    }

    const handleRoomChange=(field,value)=>{
        setRoom(prev=>({...prev,[field]:value}))
        
    }

    const getStudentchanges=()=>{
        const addedstudents=students.filter((s)=>!originalstudents.some((os)=>os.id==s.id))
        const removedstudents=originalstudents.filter((origs)=>!students.some((s)=>s.id==origs.id))
        return {addedstudents, removedstudents}
    }

    const hasChanges=()=>{
        const {addedstudents,removedstudents} =getStudentchanges()
        return addedstudents.length > 0 || removedstudents.length > 0
    }

    const handleSaveStudentChanges = async()=>{
        setIsSaving(true)
        try{
            const {addedstudents,removedstudents} =getStudentchanges()
            let addresults;
            // api call
            if (addedstudents.length>0){
              addresults=await Promise.allSettled(
                addedstudents.map(student=>axios.post(studentaddurl,{student:student.id},{headers:{"Authorization":`Bearer ${got_t}`}}))
              )

              addresults.forEach((add_res,index)=>{
                if(add_res.status=="fulfilled"){
                
                }else{
                  console.error("failed add student::",addedstudents[index],add_res.reason)
                }
              })
            }

            if(removedstudents.length>0){
              removedresults=await Promise.allSettled(
                removedstudents.map(removedstudent=>axios.post(studentremoveurl,{student:student.id},{headers:{"Authorization":`Bearer ${got_t}`}}))
              )

              removedresults.forEach((removeresult,index)=>{
                if(removeresult.status=="fulfilled"){
                  alert('students removed successfully')
                }else{
                  console.error("faileed remove student::",removedstudents[index],removeresult.reason)
                }
              })
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));

            setOriginalstudents(students)
            fetchgroup_students(got_t)
            

        }catch(e){
            console.error('Error saving student changes:', error);
        } finally{
            setIsSaving(false)
            setShowSaveConfirmModal(false)
                }
    }

    const handleAddScheduleDay = () => {
    if (classDay && starttime) {
      const newDay = {
        // id: Date.now().toString(),
        day: classDay,
        time: starttime,
      };
      setScheduleDays([...scheduleDays, newDay]);
      setClassDay('');
      setStartTime('');
    }
  };

  // Remove a day and time from the schedule
  const handleRemoveScheduleDay = (id) => {
    setScheduleDays(scheduleDays.filter((d) => d.id !== id));
  };

    const handleAddRoom=async ()=>{
        if (room.grade && room.module && room.teacher){
            const newRoom={
                // id:
                grade:room.grade,
                module:room.module,
                teacher:Number(room.teacher),
                gradetype:room.gradetype
            }


            const savedroom=await axios.post(
              saveroom_url,
              {
                grade:room.grade,
                roomType:room.gradetype,
                module:room.module,
                teacherId:room.teacher
              },
              {
                headers:{
                  "Authorization":`Bearer ${got_t}`
                }
              }
            
             )

             if (savedroom){
              alert('room saved successfully')
              fetch_groupdetails()
              
             }

            // console.log('new room ', newRoom)


             
            // setRoomDetails(newRoom)
            // setRoom({grade:'',module:'',teacher:''})
            // setIsRoomModule(false)
        }
    }
    const handleSaveName=()=>{
        setIsEditingName(false)
        // send name to backend
    }

    const handleSaveDescription=()=>{
        setIsEditingGDescription(false)
        // send to backend
    }

    const handleRemoveStudent=(studentId)=>{
        setStudents(students.filter((s)=>s.id!==studentId))
    }
    // const students=[]
    const removeclass=(classId)=>{
        setscheduledClasses(scheduledClasses.filter((cls)=>cls.id!==classId))
    }

     // Handle student selection in modal
   const handletoggleStudent = (studentId) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedStudents(newSelected);
  };

  // Handle adding selected students
  const handleAddSelectedStudents = () => {
    const newStudents = allstudents.filter((s) =>
      selectedStudents.has(s.id)
    ).filter((s) => !students.some((existing) => existing.id === s.id));

    setStudents([...students, ...newStudents]);
    setSelectedStudents(new Set());
    setshowaddStudentsModal(false);
  };

//   handle scheduling class
   const handleScheduleClass=()=>{
    if (lessonNumber && scheduleDays.length > 0 && classType){
        const newClass ={
            id:Date.now().toString(),
            lessonNumber,
            classType,
            scheduleDays
        }
        setscheduledClasses([...scheduledClasses,newClass])
        setLessonNumber('')
        setClassDate('')
        setScheduleDays([]);
        setStartTime('')
        setClassType('')
        setShowScheduleClassModal(false)
    }
   }

   const getclassScheduleChanges=()=>{
    const addedclasses=scheduledClasses.filter((sc)=>!originalClassSchedule.some((ocs)=>ocs.id===sc.id))
    const removedclasses = originalClassSchedule.filter((ocs)=> !scheduledClasses.some((sc)=>sc.id==ocs.id))
    return {addedclasses, removedclasses}
   }

   const hasclassChange =()=>{
    const {addedclasses,removedclasses}=getclassScheduleChanges()
    return addedclasses.length>0 || removedclasses.length>0
   }
   
   const saveclassChange =async()=>{
    setIsSaving(true)
    try{
        const {addedclasses,removedclasses}=getclassScheduleChanges()

        
      //  addedclasses.map(addclass=>console.log('class data', {
      //           "lesson_schedule":addclass.scheduleDays,
      //           "roomType":addclass.classType,
      //           "lesson_number":Number(addclass.lessonNumber)
      //         }))

        if (addedclasses.length>0){
           const addclass_results=await Promise.allSettled(
            addedclasses.map(addclass=>axios.post(
              scheduleclasses_url,
              {
                "lesson_schedule":addclass.scheduleDays,
                "roomType":addclass.classType,
                "lesson_number":addclass.lessonNumber
              },
              {
                headers:{
                  "Authorization":`Bearer ${got_t}`
                }
              }
            )

          
          )

           )

           addclass_results.forEach((addc_res,index)=>{
            if(addc_res.status=="fulfilled"){
              alert('classes added succesfully')
            }else{
              console.error("error in  add class::",addedclasses[index],addc_res.value.data)
            }
           })
        }

        if (removedclasses.length>0){
           const removeclass_results=await Promise.allSettled(
            removedclasses.map(removeclass=>axios.post(
              // scheduleclasses_url,
              {
                class:removeclass.id
              },
              {
                headers:{
                  "Authorization":`Bearer ${got_t}`
                }
              }
            ))

           )

           removeclass_results.forEach((removec_res,index)=>{
            if(removec_res.status=="fulfilled"){
              alert("success in removing classs::")
            }else{
              console.error("error in  add class::",removedclasses[index],removec_res.value.data)
            }
           })
        }

        await new Promise((sending)=>setTimeout(sending,1000))
        setOriginalClassSchedule(scheduledClasses)
   

    }catch(e){
        console.error('error saving class Change ', e)
    }finally{
        setIsSaving(false)
        setShowSaveConfirmModal(false)
    }
   }

   const handlechangeteacher =(teacher)=>{
     setChangedTeacher(teacher)
     setshowAssignTeacherModal(false)
    setShowDeleteConfirmModal(true)
   }
   // Handle assigning teacher
  const handleAssignTeacher = async (teacher) => {
    //  setIsSaving(true)
    setChangedTeacher('')
    
    // const saveteacher=await axios.post(savingteacher,{teacher})
    // const saved=saveteacher.data

    // if( saved.status===200){
    //     setAssignedTeacher(teacher);
    //     setShowDeleteConfirmModal(false);
          //  setIsSaving(false)
    // }else{
    //   setsavingMessage({error:'Changing teacher failed , please try again later'})
    //   setTimeout(setShowDeleteConfirmModal(false),1000)
    // }


   
   
  };

  const handleDeleteGroup = async() => {
    setShowDeleteConfirmModal(false);
    // const {addedstudents,removedstudents} =getStudentchanges()
    const deletinggroup=await axios.delete(deletegroup,{
      headers:{
        Authorization:`Bearer ${got_t}`
      }
    }) 

    onBack();
  };

    return(
        <div>
            <div className="group-container">
                {/* Back button */}
                <button
                onClick={onBack}
                 className="group-header flex items-center text-cyan-400 hover:text-cyan-300 transition-colors" >
                    <ArrowLeft className="icon-left w-5 h-5 "/>
                    <span> Back to Groups</span>
                </button>
                
                {/* Header section */}
                <div className="group-header ">
                    <div className="flex items-center  gap-3 flex-1">
                       { isEditingName?(
                        <div className="marginbottom-two flex gap-2 flex-1">
                            <input type="text" value={groupname} className="input-field" onChange={(e)=>setGroupName(e.target.value)} autoFocus/>
                            <button className="padding-two bg-white hover:bg-cyan-700 rounded-lg items-center justify-center flex"
                            onClick={handleSaveName}>
                                <Check className="w-5 h-5"/>
                            </button>

                        </div>
                       ):(
                        <div className="flex">
                        <h1 className="text-3xl font-bold text-[#1a1a2e]"> {groupname?groupname:"Group001"}</h1>
                        <button 
                        title="Edit name"
                        onClick={()=>{ 
                            setGroupName(groupname || "Group001") 
                            setIsEditingName(true)}}
                        className="padding-two hover:bg-slate-700 rounded-lg transition-colors">
                            <Edit2 className="w-5 h-5 text-slate-400 hover:text-cyan-400"/>

                        </button>
                        </div>
                       )
                       }


                    </div>
                    <div>
                        {
                                <div
                                
                                className="padding-two  transition-colors rounded-lg"
                                >
                                    {
                                        room.grade !=='' || room.module!==''?(
                                             <p className="text-[#1a1a2e] font-semibold"> Grade {room.grade} , Module {room.module} </p>
                                        ):(
                                            <div className=" flex  align-center justify-center gap-3 ">
                                            <p className="text-slate-500 italic flex-1">
                                               No room set yet. Add students then Set one .
                                            </p>
                                            <button 
                                            onClick={()=>{setIsRoomModule(true)}}
                                            disabled={students.length===0}
                                            className="input-button bg-[#06b6d4] hover:bg-blue-600 text-white font-semibold px-6 rounded-lg transition-colors" >
                                                set room
                                            </button>
                                            </div>
                                        )
                                    }
                                    
                                </div>
                            
                            
                        }
                    </div>

                </div>

                {/* student section */}
                <div className="group-stdtsection bg-white backdrop-blur border border-[#d5d5dd] rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#1a1a2e]  flex items-center gap-2">
                        <Users className="w-5 h-5"/>
                        Students
                    </h2>
                     <div className="flex gap-2">
                    <button
                    onClick={()=>setshowaddStudentsModal(true)}
                    className="addstdnts-button rounded-lg bg-cyan-600 hover:bg-cyan-700 gap-2 flex items-center justify-center">
                        <Plus className="w-5 h-5"/>
                        Add Students
                    </button>
                  {hasChanges() && (
                <button
                  onClick={() => setShowSaveConfirmModal(true)}
                  disabled={isSaving}
                  className={` ${isSaving ? "bg-green-300":"bg-green-600 hover:bg-green-700"} addstdnts-button rounded-lg flex items-center justify-center  gap-2 text-white`}
                >
                  <Check className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              )}
              </div>
                  </div>
                  {
                    students.length===0?(
                        <div className="text-center privacy-contactsection">
                            <p className="text-slate-400">No students in this group yet.</p>
                        </div>

                    ):(
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700">
                                        <th className="table-header text-left py-3 px-4 text-[#1a1a2e] font-semibold">
                                                Name
                                        </th>
                                        <th className="table-header text-left py-3 px-4 text-[#1a1a2e] font-semibold">
                                                Email
                                        </th>
                                        <th className="table-header text-left py-3 px-4 text-[#1a1a2e] font-semibold">
                                            Country
                                        </th>
                                        <th className="table-header text-left py-3 px-4 text-[#1a1a2e] font-semibold">
                                                Phone
                                        </th>
                                        <th className="table-header text-left py-3 px-4 text-[#1a1a2e] font-semibold">
                                                Action
                                        </th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        students.map((student)=>(
                                            <tr
                                            key={student.id}
                                            className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                                                <td className="table-header text-[#1a1a2e]">{student.user.first_name}</td>
                                                <td className="table-header  text-[#1a1a2e]">{student.user.email}</td>
                                                <td className="table-header   text-[#1a1a2e]">{student.country}</td>
                                                <td className="table-header  text-[#1a1a2e]">{student.user.phone_number}</td>
                                                <td className="table-header ">
                                                    <button
                                                    onClick={() => handleRemoveStudent(student.id)}
                                                    className="padding-two hover:bg-red-500/20 rounded-lg transition-colors">
                                                         <X className="w-4 h-4 text-red-400 hover:text-red-300" />

                                                        </button>
                                                </td>

                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>
                    )
                  }

                </div>

                {/* teacher's section */}
                <div className="group-stdtsection bg-white backdrop-blur border border-[#d5d5dd] rounded-xl">
                  <h2 className="margin-btm-four text-lg font-semibold text-[#1a1a2e] mb-4">Assigned Teacher</h2>
                  {
                    assignedTeacher?(
                        <div className=" paddingfour flex items-center justify-between p-4 bg-[#f5f5f7]/30 rounded-lg border border-[#d5d5dd]">
                            <div>
                                <p className="text-[#1a1a2e] font-medium">
                                    {assignedTeacher.user.first_name}
                                </p>
                                <p className="text-slate-600 text-sm">{assignedTeacher.user.email}</p>
                            </div>
                            <button 
                            onClick={()=>setshowAssignTeacherModal(true)}
                            className=" addstdnts-button bg-slate-700 rounded-lg border-slate-600 text-slate-300 hover:bg-slate-700">
                                Change Teacher
                            </button>
                        </div>
                    ):(
                        <div className=" paddingfour flex items-center justify-between p-4 bg-bg-[#f5f5f7]/30 rounded-lg border border-[#d5d5dd]">
                            <p className="text-slate-400">No teacher assigned yet. create Room for the Group first</p>
                            <button 
                            onClick={() => setIsRoomModule(true)}
                             className="addstdnts-button rounded-lg bg-cyan-600 hover:bg-cyan-700 "
                            >
                                Assign Teacher
                            </button>
                        </div>
                    )

                  }

                </div>

                {/* class schedule section */}
                <div className="group-stdtsection bg-white backdrop-blur border border-[#d5d5dd] rounded-xl">
                <div className="margin-btm-four flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#1a1a2e] flex items-center gap-2">
                        <Calendar className="w-5 h-5"/>
                        Class schedule
                    </h2>
                    <div className="flex gap-2">
                    <button
                    onClick={() => setShowScheduleClassModal(true)}
                    className="addstdnts-button rounded-lg bg-cyan-600 hover:bg-cyan-700 gap-2 flex"
                    >
                        <Plus className="w-5 h-5" />
                        Schedule Class
                    </button>
                    {hasclassChange() && (
                <button
                  onClick={() => setShowSaveConfirmModal(true)}
                  disabled={isSaving}
                  className={` ${isSaving ? "bg-green-300":"bg-green-600 hover:bg-green-700"} addstdnts-button rounded-lg flex items-center justify-center  gap-2 text-white`}
                >
                  <Check className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              )}
              </div>
               </div>
               {
                scheduledClasses.length===0?(
                     <div className="text-center py-8">
                        <p className="text-slate-400">No scheduled classes yet.</p>
                     </div>
                ):(
                    <div className="scheduleclass-modalspacing">
                        {
                            scheduledClasses.map((cls)=>(
                                <div
                                key={cls.id}
                                 className="paddingfour bg-[#f5f5f7]/50 rounded-lg border border-[#d5d5dd] hover:border-[#666680] transition-colors">

                                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#1a1a2e] font-semibold">
                          {cls.lessons?cls.lessons:cls.lesson.title}
                        </p>
                        <span className="paddingyxtwo px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {cls.classType?cls.classType:cls.lessontype}
                        </span>
                      </div>
                      <div className="spacing-y-one">
                        {cls.sheduleDays?(
                          cls.scheduleDays.map((day) => (
                          <div key={day.id} className="flex items-center gap-2 text-sm text-[#666680]">
                            <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full"></span>
                            {day.day} at {day.time}
                          </div>
                        ))):(
                          <div  className="flex items-center gap-2 text-sm text-[#666680]">
                            <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full"></span>
                            {formatdates(cls.date_time)}
                          </div>
                        )
                        }
                      </div>
                    </div>
                    <button
                      onClick={()=>{removeclass(cls.id)}}
                      className="padding-two p-2 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4 text-red-600 hover:text-red-700" />
                    </button>
                  </div>
                                    {/* <div  className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-800 font-medium">
                                               {cls.classType} lesson {cls.lessonNumber}
                                            </p>   
                                            <p className="text-slate-400 text-sm">
                                                 {cls.date} at {cls.startTime}
                                                 </p>                                                                                                                     
                                      </div>
                                    <button 
                                    onClick={()=>{removeclass(cls.id)}}
                                    className="padding-two hover:bg-red-500/20 rounded-lg transition-colors">
                                    <X className="w-4 h-4 text-red-400 hover:text-red-300" />
                                    </button>
                                    </div> */}


                                </div>
                            ))
                        }
                    </div>
                )
               }
                </div>

                {/* Danger zone/ delete group */}
                <div className="group-stdtsection bg-white backdrop-blur border border-[#d5d5dd] rounded-xl p-6">
                <h2 className="margin-btm-four text-lg font-semibold text-[#1a1a2e] mb-4">Danger Zone</h2>
                <button 
                onClick={() => setShowDeleteConfirmModal(true)}
                className="addstdnts-button rounded-lg flex justify-center items-center bg-red-600 hover:bg-red-700 gap-2"
                >
                    <Trash2 className="w-4 h-4"/>
                    Delete Group
                </button>

                </div>
                     {/* student modal */}
                {
                    showaddstudentmodal &&(
                        <div className="paddingfour fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white border border-[#d5d5dd] rounded-xl max-w-lg w-full max-h-96 flex flex-col">
                            <div className="all-groups flex items-center justify-between p-6 border-b border-[#d5d5dd]">
                                <h3 className="text-lg font-semibold text-[#1a1a2e]">Add Students</h3>
                                <button
                                onClick={()=>{
                                    setshowaddStudentsModal(false)
                                    setSelectedStudents(new Set());
                                }}
                                className="paddingone p-1 hover:bg-slate-600/30 rounded">
                                    <X className="w-5 h-5 text-[#1a1a2e]" />
                                </button>
                                </div>
                                <div className="paddingfour flex-1 overflow-y-auto p-4 space-y-2">
                                    {
                                        allstudents.map((student)=>(
                                            <label
                                            key={student.id}
                                            className="paddingthree flex items-center gap-3 p-3 hover:bg-slate-400/50 rounded-lg cursor-pointer transition-colors">
                                                <input
                                                type="checkbox"
                                                checked={selectedStudents.has(student.id)}
                                                onChange={()=>handletoggleStudent(student.id)}
                                                className="w-4 h-4 rounded bg-white"/>
                                                <div className="flex-1">
                                                    <p className="text-[#1a1a2e] font-medium">{student.user.first_name}</p>
                                                    <p className="text-slate-500 text-sm">{student.user.email}</p>
                                                </div>

                                            </label>
                                        ))
                                    }
                                </div>
                                <div className="all-groups flex gap-3 p-6 border-t border-[#d5d5dd]">
                                    <button
                                    onClick={()=>{
                                        setshowaddStudentsModal(false)
                                        setSelectedStudents(new Set());
                                    }}
                                    className="flex-1 border-[#d5d5dd] text-slate-400 hover:bg-slate-700"
                                    >
                                        cancel
                                    </button>
                                    <button
                                    onClick={handleAddSelectedStudents}
                                    className=" padding-two text-white   rounded-lg flex-1 bg-cyan-600 hover:bg-cyan-700"
                                    disabled={selectedStudents.size===0}
                                    >
                                        Add Selected
                                    </button>
                                </div>
                        </div>
                        </div>
                    )
                }
                {/* assign Teacher Modal */}
                {
                    showAssignTeacherModal &&(
                         <div className="paddingfour fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white border border-[#d5d5dd] rounded-xl max-w-lg w-full max-h-96 flex flex-col">
                                <div className="all-groups flex items-center justify-between p-6 border-b border-[#d5d5dd]">
                                    <h3 className="text-lg font-semibold text-[#1a1a2e]" >Assign Teacher </h3>
                                    <button
                                    onClick={() => setshowAssignTeacherModal(false)}
                                    className="p-1 hover:bg-slate-600/30 rounded">
                                        <X className="w-5 h-5 text-slate-400" />
                                    </button>
                                </div>

                                <div className="paddingfour modal-y-spacing flex-1 ">
                                    {
                                        allteachers.map((teacher)=>(
                                            <button
                                            key={teacher.id}
                                            type="button"
                                            onClick={() => {
                                              handlechangeteacher(teacher)
                                            }}
                                            className="paddingthree w-full p-3 text-left  rounded-lg transition-colors border border-[#d5d5dd] hover:border-cyan-500">
                                                <p className="text-slate-800 font-medium">{teacher.user.first_name}</p>
                                                <p className="text-slate-500 text-sm">{teacher.user.email}</p>
                                            </button>
                                        ))
                                    }
                                </div>

                                <div className="all-groups border-t border-[#d5d5dd]">
                                    <button
                                    onClick={() => setshowAssignTeacherModal(false)}
                                    className="paddingone rounded-lg w-full bg-slate-600/30 border-[#d5d5dd] text-[#1a1a2e] hover:bg-[#f5f5f7]">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                         </div>
                    )
                }

                {/* schedule room */}
                
                    {isroomModule && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="GroupClass bg-white border border-[#d5d5dd] rounded-xl p-8 w-full max-w-md shadow-xl">
              <div className="privacy-infocollect-description flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#1a1a2e]">Create New Room</h3>
                <button
                  onClick={closeModal}
                  className="text-[#666680] hover:text-[#1a1a2e] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="scheduleclass-modalspacing">
               
                {/* Grade Dropdown */}
                <div>
                  <label className="marginbottom-two block text-sm font-medium text-[#1a1a2e] mb-2">
                    Grade
                  </label>
                  <select
                    value={room.grade}
                    onChange={(e) => {handleRoomChange('grade', e.target.value)}}
                    className=" newgrouppadding w-full bg-white border border-[#d5d5dd] text-[#1a1a2e] rounded-lg px-3 py-2 focus:border-[#2563eb] focus:ring-[#2563eb] focus:outline-none"
                  >
                    <option value="">Select Grade</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((grade) => (
                      <option key={grade} value={grade}>
                        Grade {grade}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="marginbottom-two block text-sm font-medium text-[#1a1a2e] mb-2">
                    Grade Type
                  </label>
                  <select
                    value={room.gradetype}
                    onChange={(e) => {handleRoomChange('gradetype', e.target.value)}}
                    className=" newgrouppadding w-full bg-white border border-[#d5d5dd] text-[#1a1a2e] rounded-lg px-3 py-2 focus:border-[#2563eb] focus:ring-[#2563eb] focus:outline-none"
                  >
                    <option value="">Select Grade Type</option>
                    {['coding','math'].map((gradetype) => (
                      <option key={gradetype} value={gradetype}>
                      {gradetype}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Module Dropdown */}
                <div>
                  <label className="marginbottom-two block text-sm font-medium text-[#1a1a2e] mb-2">
                    Module
                  </label>
                  <select
                    value={room.module}
                    onChange={(e) => {handleRoomChange('module', e.target.value)}}
                    className="newgrouppadding nogroup-p w-full bg-white border border-[#d5d5dd] text-[#1a1a2e] rounded-lg px-3 py-2 focus:border-[#2563eb] focus:ring-[#2563eb] focus:outline-none"
                  >
                    <option value="">Select Module</option>
                    {[1, 2, 3, 4, 5, 6].map((module) => (
                      <option key={module} value={module}>
                        Module {module}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Teacher Dropdown */}
                <div>
                  <label className="marginbottom-two block text-sm font-medium text-[#1a1a2e] mb-2">
                    Teacher
                  </label>
                  <select
                    value={room.teacher}
                    onChange={(e) => {handleRoomChange('teacher', e.target.value)}}
                    className="newgrouppadding nogroup-p w-full bg-white border border-[#d5d5dd] text-[#1a1a2e] rounded-lg px-3 py-2 focus:border-[#2563eb] focus:ring-[#2563eb] focus:outline-none"
                  >
                    <option value="" className="text-slate-500 bg-blue-200">Select Teacher</option>
                    {allteachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.user.id}>
                        {teacher.user.first_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="margintop-ii flex gap-3 mt-8">
                <button
                  onClick={closeModal}
                  variant="outline"
                  className="flex-1 border-[#d5d5dd] text-[#1a1a2e] hover:bg-[#f5f5f7] bg-transparent"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRoom}
                  disabled={ !room.grade || !room.module || !room.teacher || !room.gradetype}
                  className="rounded-lg newgrouppadding flex-1 bg-[#06b6d4] hover:bg-blue-600 disabled:bg-[#d5d5dd] disabled:cursor-not-allowed text-white font-semibold"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        )}
                {/* schedule class modal */}
                {
                    showScheduleClassModal &&(
                        <div className="paddingfour fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                            <div className="bg-white border border-[#d5d5dd] rounded-xl max-w-2xl shadow-xl overflow-y-auto max-h-96 w-full">
                                <div className="all-groups flex items-center justify-between p-6 border-b border-[#d5d5dd] sticky top-0 bg-white">
                                    <h3 className="text-lg font-semibold text-[#1a1a2e]">Schedule Class</h3>
                                    <button
                                    onClick={() => setShowScheduleClassModal(false)}
                                    className="paddingone hover:bg-slate-700 rounded">
                                        <X className="w-5 h-5 text-slate-400" />
                                    </button>
                                </div>

                                <div className="all-groups scheduleclass-modalspacing ">
                                    <div className="flex flex-col">
                                        <label className="marginbottom-two block text-[#1a1a2e] font-medium">
                                            Class Type
                                        </label>
                                        <select name="" id=""
                                        value={classType}
                                        onChange={(e)=>{setClassType(e.target.value)}}
                                        className="marginbottom-two f scheduleclassinput-field fl bg-white border border-[#d5d5dd]">

                                        <option value="">class type</option>
                                        {['coding','math'].map((classes)=>(
                                            <option key={classes} value={classes}> {classes}</option>
                                        ))}                                        
                                        </select>
                                        </div>

                                        <div className="flex flex-col">

                                        <label className="marginbottom-two block text-[#1a1a2e] font-medium mb-2">
                                            Lesson Number
                                        </label>
                                        <select name="" id=""
                                        value={lessonNumber}
                                        onChange={(e)=>{setLessonNumber(e.target.value)}}
                                        className="marginbottom-two scheduleclassinput-field bg-white border border-[#d5d5dd]">
                                            <option value="">select lesson</option>
                                            {[1,2,3,4,5,6].map((lesson)=>(
                                                <option key={lesson} value={lesson}>
                                                    Lesson {lesson}

                                                </option>
                                            ))}
                                        </select>
                                        </div>

                                        {/* Day and Time Selection */}
                                        <div className="spacing-y-three bg-[#f5f5f7]/30 rounded-lg p-4 space-y-3">
                                          <h4 className="font-medium text-[#1a1a2e]">Add Class Schedule</h4>
                                          <div className="grid grid-cols-3 gap-2">
                                            <div>
                                           <label className="marginbottom-two block text-[#1a1a2e] font-medium mb-2">
                                            Class Day
                                            </label>
                                             <select
                                        value={classDay}
                                        onChange={(e)=>{setClassDay(e.target.value)}}
                                        className="scheduleclassinput-field bg-white border border-[#d5d5dd] text-sm">
                                          <option value="">Choose a class Day</option>
                                          {weekdays.map((weekday)=>(
                                            <option
                                            key={weekday} value={weekday}> {weekday}</option>
                                          ))}

                                             </select>

                                            </div>
                                            

                                            <div>
                                              <label className="marginbottom-two block text-[#1a1a2e] font-medium mb-2">
                                            Start Time
                                        </label>
                                        {/* <input type="time" /> */}
                                        <input 
                                        type="time"                                        
                                        value={starttime} 
                                        onChange={(e)=>setStartTime(e.target.value)}
                                        className="scheduleclassinput-field bg-white border border-[#d5d5dd]"
                                        />

                                        

                                            </div>

                                            <div className="flex items-end">
                                                 <button
                                                  onClick={handleAddScheduleDay}
                                                    //  disabled={!selectedDay || !selectedTime}
                                                   className="padding-two w-full bg-[#06b6d4] rounded-lg  flex items-center justify-center  hover:bg-blue-600 text-white gap-2"
                                                             >
                                                  <Plus className="w-4 h-4" />
                                                        Add
                                                  </button>
                                            </div>

                                          </div>
                                        </div>
                                             {/* Selected Schedule Display */}
              {scheduleDays.length > 0 && (
                <div className="spacing-y-three">
                  <h4 className="font-medium text-[#1a1a2e]">Selected Schedule</h4>
                  <div className="modal-y-spacing max-h-40 overflow-y-auto">
                    {scheduleDays.map((scheduleDay) => (
                      <div
                        key={scheduleDay.day}
                        className="flex  paddingthree items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-[#06b6d4] rounded-full"></div>
                          <span className="text-[#1a1a2e] font-medium">
                            {scheduleDay.day} at {scheduleDay.time}
                          </span>
                        </div>
                        <button
                          // onClick={() => handleRemoveScheduleDay(scheduleDay.id)}
                          className="p-1 hover:bg-red-100 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}


                                        
                                        
                                        {/* <input
                                        type="text" 
                                        placeholder="e.g Introduction to python"
                                        value={lessonName} 
                                        onChange={(e)=>setLessonName(e.target.value)}
                                        className="scheduleclassinput-field bg-white border border-[#d5d5dd]"
                                        /> */}
                                        
                                   
                                    {/* <div className="flex flex-col">
                                        <label className="marginbottom-two block text-[#1a1a2e] font-medium mb-2">
                                            Date
                                        </label>
                                        <input 
                                        type="date"             
                                        value={classDate} 
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e)=>setClassDate(e.target.value)}
                                        className="scheduleclassinput-field bg-white border border-[#d5d5dd]"
                                        />
                                        
                                    </div> */}
                                    
                                </div>

                                <div className="all-groups flex gap-3 p-6 border-t border-[#d5d5dd]">
                                    <button
                                    onClick={() => {
                                      setShowScheduleClassModal(false)
                                      setScheduleDays([]);
                                      setClassDay('')
                                      setStartTime('')
                                    }
                                    }
                                    className="flex-1 border-[#d5d5dd] text-[#1a1a2e] hover:bg-slate-700">
                                        Cancel
                                    </button>
                                    <button
                                    onClick={handleScheduleClass}
                                    className="paddingone rounded-lg flex-1 text-white bg-cyan-600 hover:bg-cyan-700"
                                    disabled={!lessonNumber || scheduleDays.length === 0|| !classType}>
                                        Schedule
                                    </button>

                                </div>
                            </div>
                        </div>
                    )
                }

                {/* confirmation modal */}
                 {showSaveConfirmModal && (() => {
        const { addedstudents, removedstudents } = getStudentchanges();
        const {addedclasses,removedclasses}=getclassScheduleChanges()
        const totalclasschanges=addedclasses.length + removedclasses.length
        const totalChanges = addedstudents.length + removedstudents.length;
        
        return (
          <div className="paddingfour fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-[#d5d5dd] rounded-xl max-w-lg w-full shadow-xl">
              <div className="all-groups p-6 border-b border-[#d5d5dd]">
                <h3 className="text-lg font-semibold text-[#1a1a2e]">Save Changes</h3>
              </div>

              <div className="scheduleclass-modalspacing all-groups p-6 space-y-4">
                <p className="text-[#1a1a2e] font-medium">
                  Do you want to save these changes?
                </p>

                {addedclasses.length > 0 && (
                  <div>
                    <p className="marginbottom-two text-sm font-medium text-green-700 mb-2">
                      ✓ {addedclasses.length} scheduled Class{addedstudents.length !== 1 ? 'es' : ''} added
                    </p>
                    <div className="paddingthree bg-green-50 border border-green-200 rounded-lg p-3 max-h-32 overflow-y-auto">
                      <ul className="spacing-y-one">
                        {addedclasses.map((clas) => (
                          <li key={clas.id} className="text-sm text-[#1a1a2e]">
                            • {clas.classType} on {clas.date}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {addedstudents.length > 0 && (
                  <div>
                    <p className="marginbottom-two text-sm font-medium text-green-700 mb-2">
                      ✓ {addedstudents.length} student{addedstudents.length !== 1 ? 's' : ''} added
                    </p>
                    <div className="paddingthree bg-green-50 border border-green-200 rounded-lg p-3 max-h-32 overflow-y-auto">
                      <ul className="spacing-y-one">
                        {addedstudents.map((student) => (
                          <li key={student.id} className="text-sm text-[#1a1a2e]">
                            • {student.user.first_name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {removedclasses.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-red-700 mb-2">
                      ✗ {removedclasses.length} sheduled class{removedclasses.length !== 1 ? 's' : ''} removed
                    </p>
                    <div className="paddingthree bg-red-50 border border-red-200 rounded-lg p-3 max-h-32 overflow-y-auto">
                      <ul className="spacing-y-one">
                        {removedclasses.map((clas) => (
                          <li key={clas.id} className="text-sm text-[#1a1a2e]">
                            • {clas.classType} on {clas.date}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {removedstudents.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-red-700 mb-2">
                      ✗ {removedstudents.length} student{removedstudents.length !== 1 ? 's' : ''} removed
                    </p>
                    <div className="paddingthree bg-red-50 border border-red-200 rounded-lg p-3 max-h-32 overflow-y-auto">
                      <ul className="spacing-y-one">
                        {removedstudents.map((student) => (
                          <li key={student.id} className="text-sm text-[#1a1a2e]">
                            • {student.user.first_name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

               {addedclasses.length>0 || removedclasses.length>0 ? (
                 <p className="allgroups text-xs text-[#666680] mt-4">
                  Total changes: {totalclasschanges} scheduled class{totalclasschanges !== 1 ? 's' : ''}
                </p>
                ):(
                    <p className="allgroups text-xs text-[#666680] mt-4">
                  Total changes: {addedstudents.length>0?`${addedstudents.length} added`:''} , {removedstudents.length>0?`${removedstudents.length} removed`:''}  student{totalChanges !== 1 ? 's' : ''}
                </p>
                )}
              </div>

              <div className="all-groups flex gap-3 p-6 border-t border-[#d5d5dd]">
                <button
                  onClick={() => setShowSaveConfirmModal(false)}
                  variant="outline"
                  disabled={isSaving}
                  className="ddstdnts-button rounded-lg flex-1 border-[#d5d5dd] text-[#1a1a2e] hover:bg-[#f5f5f7] bg-slate-500/30"
                >
                  Cancel
                </button>
                <button
                  onClick={ ()=>{
                    if(addedclasses.length>0 || removedclasses.length>0){
                      saveclassChange()
                    } else{
                      handleSaveStudentChanges()
                    }
                  } 
                }
                  disabled={isSaving}
                  className={` ${isSaving ? "bg-green-300":"bg-green-600 hover:bg-green-700"} addstdnts-button flex-1 rounded-lg text-white `}
                >
                  {isSaving ? 'Saving...' : 'Confirm Save'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

                {/* delete confirmation Modal */}
                {
                    showDeleteConfirmModal &&(
                        <div className="paddingfour fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white border border-[#d5d5dd] rounded-xl max-w-lg w-full">
                                <div className="all-groups p-6 border-b border-[#d5d5dd]">
                                    <h3 className="text-lg font-semibold text-[#1a1a2e]">{changedTeacher?'Change Teacher':'Delete Group'}</h3>
                                </div>
                                 <div className="all-groups p-6">
                                        <span className="text-[#1a1a2e]">
                                           {changedTeacher ? (
                                                       <p className="nogroup-p">
                                                            Are you sure you want to set{" "}
                                                          <strong>{changedTeacher.user.first_name}</strong> as your new teacher?
                                                                </p>):(

                                                                 <p> Are you sure you want to delete this group?</p> 
                                                                )
                                                                }

                                             <p className="font-bold">
                                                This action cannot be undone.
                                                </p> 
                                        </span>
                                 </div>
                                 <div className="all-groups flex gap-3 p-6 border-t border-[#d5d5dd]">
                                    <button
                                    onClick={() =>{ 
                                      setShowDeleteConfirmModal(false)
                                      setChangedTeacher('')
                                    }
                                    }
                                    className="flex-1  rounded-lg border-slate-600 text-[#1a1a2e] hover:bg-slate-600/30">
                                        Cancel
                                    </button>

                                    {changedTeacher?(
                                      <button
                                    onClick={()=>{
                                      handleAssignTeacher(changedTeacher)
                                    }}
                                    className="paddingone rounded-lg flex-1 text-white  bg-green-600 hover:bg-green-700">
                                        confirm change
                                    </button>
                                    ):(
                                    <button
                                    onClick={handleDeleteGroup}
                                    className="paddingone rounded-lg flex-1 text-white  bg-red-600 hover:bg-red-700">
                                        Confirm Delete
                                    </button>

                                    )}

                                 </div>
                            </div>
                        </div>
                    )
                }


            </div>
       

        </div>
    )
}