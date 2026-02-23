import React,{useState,useEffect, useMemo} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { GroupTable } from '../Components/group-table'
import { ChevronLeft,ChevronRight,X } from 'lucide-react'
import { Link } from 'react-router-dom'
const ITEMS_PER_PAGE=7
const TEACHERS = [
  'John Smith',
  'Sarah Johnson',
  'Michael Chen',
  'Emily Rodriguez',
  'David Williams',
];
export default function GroupSection({onViewGroup}) {
    const initialState= {name:"",grade:'',firstLessonTime:'',secondLessonTime:"",firstLesson:'',secondLesson:''}
    const [values,setValues]=useState(initialState)
    const [groupName,setGroupName]=useState('')
    const [currentPage,setCurrentPage]=useState(1)
    const [isModalOpen,setIsModalOpen]=useState()
    const [gotentoken,setGotenToken]=useState()
    const [groups, setGroups] = useState([
    // {
    //   id: '1',
    //   name: 'Python Basics',
    //   description: 'Introduction to Python programming',
    //   studentCount: 24,
    //   status: 'Active',
    // },
    // {
    //   id: '2',
    //   name: 'Web Development',
    //   description: 'HTML, CSS, and JavaScript fundamentals',
    //   studentCount: 18,
    //   status: 'Active',
    // },
    // {
    //   id: '3',
    //   name: 'Data Science 101',
    //   description: 'Data analysis and visualization',
    //   studentCount: 15,
    //   status: 'Active',
    // },
    // {
    //   id: '4',
    //   name: 'Advanced Python',
    //   description: 'OOP and design patterns',
    //   studentCount: 12,
    //   status: 'Inactive',
    // },
  ]);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    module: '',
    teacher: '',
  })

    // const navigate= useNavigate()
    // const handleChange=(e)=>{
    // const {value,name}=e.target
    // setValues({...values,[name]:value})
    // }
    // console.log(values)
    // const handleSubmit =()=>{
    // if(values && values.firstLesson && values.firstLessonTime && values.grade && values.name && values.secondLesson && values.secondLessonTime){
    //     const splitName=values.name.trim().split(/\s+/);
    //     const first_name=splitName[0]
    //     const last_name=splitName[1]
       
    //     const data= {...values,...{first_name:first_name,last_name:last_name}}
    //     console.log(data)
    //     const url=`https://api.codingscholar.com/teacherClassRoom/`
    //     // axios.post(url,)
    // }else{
    //     alert('Error fill in all inputs')
    // }
    // }
    // const handleToTeacherClass=()=>{
    //     navigate('/teacher/dashboard/Teacher Group Class')
    // }
    const groupurl="https://api.codingscholar.com/class_groups/"
    const fetchgroups=async(gottoken)=>{
      const allgroups=await axios.get(groupurl,
        { headers: {
          "Authorization":`Bearer ${gottoken}`
        }}
      )

      const sortedgroups=allgroups.data.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at))
      setGroups(sortedgroups)
    }


    useEffect(()=>{
      const gotentoken=localStorage.getItem('token')
      setGotenToken(gotentoken)

      fetchgroups(gotentoken)
      




    },[])

  
    const handleaddGroup = async() => {
    if (groupName.trim()) {
      const newGroup = { 
        // id: Date.now().toString(),
        name: groupName,
        studentCount: 0,
        status: 'Inactive',
      };

      const gotentoken=localStorage.getItem('token')

      const gradeName=groupName
      
      const savegroup=await axios.post(groupurl,{gradeName},
       { headers: {
          "Authorization":`Bearer ${gotentoken}`
        }}
        
      )
      const savedgroup=savegroup.data

     
// {message: 'Class group successfully created'}
      if (savedgroup.status===200){
        alert("Group created successfully")
        fetchgroups(gotentoken)
        setGroupName('');
        setCurrentPage(1);

      }else{
        console.error('error in creating the group')
      }

      // if (savedgroup){
      //   fetchgroups(gotentoken)
      //   // setGroups([newGroup, ...groups]);
      //   setGroupName('');
      //   setCurrentPage(1);
      // }else{
      //   console.log('group not saved')
      // }

    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleaddGroup();
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // const handleAddGroup = () => {
  //   if (formData.name.trim() && formData.grade && formData.module && formData.teacher) {
  //     const newGroup = {
  //       id: Date.now().toString(),
  //       name: formData.name,
  //       description: `Grade ${formData.grade} - Module ${formData.module}`,
  //       studentCount: 0,
  //       status: 'Active',
  //       grade: formData.grade,
  //       module: formData.module,
  //       teacher: formData.teacher,
  //     };
  //     setGroups([newGroup, ...groups]);
  //     setFormData({ name: '', grade: '', module: '', teacher: '' });
  //     setIsModalOpen(false);
  //     setCurrentPage(1);
  //   }
  // };

    const totalpages=Math.ceil(groups.length/ITEMS_PER_PAGE)

    const paginatedgroups=useMemo(()=>{
        const startidx=(currentPage-1) * ITEMS_PER_PAGE
        return groups.slice(startidx,startidx+ITEMS_PER_PAGE)
    },[groups,currentPage])

    const handleNextPage=()=>{
        if (currentPage<totalpages){
            setCurrentPage(currentPage+1)
        }
    }

    const handlePreviousPage=()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }
    }
    const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', grade: '', module: '', teacher: '' });
  };

    const nogroups=groups.length===0
  return (
    <div>

        <div className='group-container '>
            {/* Header section */}
        <div className=" z-10">
         <Link   to="/teacher/dashboard"  className="back-button group-backbtn  bg-white  text-blue-300"  aria-label="Back to home">
          <ChevronLeft className="w-5 h-5" />
          <span >Back</span>
        </Link>
         </div>
            <div className='group-header'> 
                <h1 className='font-bold text-3xl text-[#1a1a2e] mb-2'> Groups</h1>
                <p className='text-slate-600'>Manage and organize student groups</p>
            </div>
            {/* Add Group Section */}
        <div className="add-group   bg-white border border-[#d5d5dd] rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1a1a2e] mb-1">Create New Group</h2>
          <div className="flex items-center gap-3">
              <input type="text" className='input-field' placeholder='Python group' value={groupName} onChange={(e)=>{setGroupName(e.target.value)}} onKeyDown={handleKeyPress}/>
              {/* <p className="text-[#666680] text-sm">Add a new group with grade, module, and teacher assignment</p> */}
           
            <button
              onClick={handleaddGroup}
              className="input-button bg-[#06b6d4] hover:bg-blue-600 text-white font-semibold px-6 rounded-lg transition-colors"
            >
              Create Group
            </button>
          </div>

            </div>

         

                        {/*ALL Groups  */}
            <div className='all-groups bg-white  backdrop-blur border border-[#d5d5dd] rounded-xl'>
                <h2 className='text-lg font-semibold'></h2>

              {
                nogroups?(
                    <div className='nogroups text-center '>
                        <div className="nogroup-div text-6xl mb-4">📚</div>
                        <p className=" nogroup-p text-slate-400 mb-2">No groups yet</p>
                        <p className="text-slate-500 text-sm">
                           Create your first group to get started
                            </p>

                    </div>
                ):(
                    <>
                   <GroupTable groups={paginatedgroups} onViewGroup={onViewGroup}/>
                   {/* Pagination */}
              {totalpages > 1 && (
                <div className="paginations flex items-center justify-between border-t border-slate-700">
                  <div className="text-sm text-slate-400">
                    Page {currentPage} of {totalpages} ({groups.length} total groups)
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                    >
                      <ChevronLeft className="chevroicon icon-left" />
                      Previous
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalpages}
                      className="pagination-btn"
                    >
                      Next
                      <ChevronRight className="chevroicon icon-right" />
                    </button>
                  </div>
                </div>
              )}

                    
                    </>
                    
                )
              }
            </div>
       
            {/* a table for all the groups that exist 
             group name , group description , no of students , view button
            */}

        </div>
      
    </div>
  )
}
