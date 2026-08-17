'use client'

import { useState, useRef, useEffect, lazy } from 'react'
// import Link from 'next/Link'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Code2, ChevronDown } from 'lucide-react'
import pic from '@/assets/codingscholarlogo00v2.png'

export default function HeaderSection() {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const [isOpen,setIsOpen]=useState(false)
  const [isMobileCoursesOpen,setIsMobileCoursesOpen]=useState(false)
  const coursesRef = useRef(null)
  const navigate=useNavigate()
  const toggleMenu = () => setIsOpen(!isOpen);
 const toggleCourses = () => {
  setIsMobileCoursesOpen(prev => !prev);
};
  useEffect(() => {
    function handleClickOutside(event) {
      if (coursesRef.current && !coursesRef.current.contains(event.target)) {
        setIsCoursesOpen(false)
      }
    }

    if (isCoursesOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isCoursesOpen])

  const courses = [
    { name: 'Scratch Programming', id:3 },
    { name: 'Python for Kids', id: 1 },
    { name: 'Web Development for Kids', id: 2},
  ]

  return (
    <>
    {/* desktop header */}
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white md:h-[12vh]  ">
      {/* Desktop Header */}
      <div className="headercontainer hidden md:flex items-center justify-between h-[12vh] px-6 lg:px-12 shadow-sm">
        {/* Left: Logo & Brand */}
       <div
  className="flex items-center min-w-50 hover:opacity-80 transition-opacity"
  onClick={() => { navigate('/') }}
>
  <div className="flex items-center">
    <div className="w-21 h-21 flex items-center justify-center">
      <img
        src={pic}
        alt="logo"
        className="object-contain h-30 w-30 scale-120 hover:scale-125"
      />
    </div>

    {/* Brand name + underline */}
    <div className="flex flex-col">
  <span className="text-[var(--primary)] font-bold text-xl tracking-wide leading-tight">
    Coding<span className="text-[var(--primarysec)]">Scholar</span>
  </span>
  <div className="flex items-center gap-1 mt-0.5">
    <div className="h-[2px] !ml-0.5 w-16 bg-[var(--accentsec)]" />
    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accentsec)]" />
    <div className="h-[2px] w-17 bg-[var(--accentsec)]" />
  </div>
</div>
  </div>
</div>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-8 text-black">
         

          {/* Courses with Dropdown */}
          <div
            ref={coursesRef}
            className="relative"
            onMouseEnter={() => setIsCoursesOpen(true)}
            onMouseLeave={() => setIsCoursesOpen(false)}
          >
            <button className="buttons-bg header-text flex items-center gap-1 bg-transparent text-gray-700 hover:!text-cyan-600 font-medium transition-colors group focus:outline-none">
              Courses
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 group-hover:text-cyan-600 ${isCoursesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel */}
            {isCoursesOpen && (
              <div className="paddingy-two absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                {courses.map((course) => (
                  <span
                    key={course.href}
                    onClick={()=>{navigate('/courses',{state:course.id})}}
                    className="header-text paddingx-four  padding-yfour cursor-pointer flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-150 first:rounded-t-lg last:rounded-b-lg group/item"
                  >
                    {/* <div className="w-2 h-2 rounded-full bg-cyan-600 group-hover/item:scale-150 transition-transform duration-200" /> */}
                    <span>{course.name}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div  className="header-text text-gray-700 hover:!text-cyan-600 font-medium transition-colors cursor-pointer"
          onClick={()=>{navigate('/curriculum-page')}}>
            Curriculum
          </div>
          <div 
          className="header-text text-gray-700 hover:!text-cyan-600 font-medium transition-colors cursor-pointer"
          onClick={()=>{navigate('/about-us')}}>
            About
          </div>
          <div 
          className="header-text text-gray-700 hover:!text-cyan-600 font-medium transition-colors cursor-pointer"
          onClick={()=>{navigate('/course-blogs')}}>
            Blogs
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <div className="header-text text-gray-700 hover:!text-cyan-600 font-medium transition-colors cursor-pointer" 
            onClick={()=>{navigate('/Login')}}>
            Login
          </div>

          {/* <Link href="/join" className="header-text text-gray-700 hover:text-cyan-600 font-medium transition-colors">
            Join Class
          </Link> */}

          <Button
            asChild
            className="!py-4 paddingx-six bg-cyan-600 hover:!bg-cyan-700 text-white font-semibold rounded-lg px-6 py-2 h-auto transition-colors cursor-pointer hover:scale-110"
            onClick={()=>{navigate('/register')}}
          >
            <div>Book Free Trial</div>
          </Button>
        </div>
      </div>

    </header>

    <div className="sticky top-0 z-50">
      {/* Header */}
      <header className="paddingx-four md:hidden flex items-center justify-between h-16 px-4 bg-white shadow-sm border-b border-gray-100">
        {/* Logo */}
        <div
  className="flex items-center hover:opacity-80 transition-opacity"
  onClick={() => { navigate('/') }}
>
  <div className="flex items-center">
    <div className="w-16 h-16  flex items-center justify-center">
      <img
        src={pic}
        alt="logo"
        className="object-contain h-22 w-22 sm:h-30 sm:w-30 scale-120 hover:scale-125"
      />
    </div>

    {/* Brand name + underline */}
    <div className="flex flex-col">
      <span className="text-[var(--primary)] font-bold text-base sm:text-xl tracking-wide leading-tight">
        Coding<span className="text-[var(--primarysec)]">Scholar</span>
      </span>
      <div className="flex items-center gap-1 mt-0.5">
        <div className="h-[2px] !ml-0.5 w-12 sm:w-16 bg-[var(--accentsec)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accentsec)]" />
        <div className="h-[2px] w-13 sm:w-17 bg-[var(--accentsec)]" />
      </div>
    </div>
  </div>
</div>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </header>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <nav
          className="md:hidden bg-white border-b border-gray-100 shadow-sm animate-in slide-in-from-top-2 duration-300 block"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="paddingx-four paddingy-six spacing-y-one px-4 py-6 space-y-1 h-[calc(100vh-64px)] overflow-y-auto">
            {/* Home */}
            <div 
              className="px-three paddingy-three block px-3 py-3 !text-gray-700 hover:!text-cyan-600 font-medium text-base transition-colors rounded-lg cursor-pointer"
               onClick={()=>{navigate('/')}}
            >
              Home
            </div>

            {/* Courses with Dropdown */}
            <div>
              <button
                onClick={toggleCourses}
                className="px-three paddingy-three w-full !bg-transparent flex items-center justify-between px-3 py-3 !text-gray-700 hover:text-cyan-600 font-medium text-base transition-colors rounded-lg hover:bg-cyan-50"
                aria-expanded={isCoursesOpen}
              >
                <span>Courses</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isCoursesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Courses Submenu */}
              {isMobileCoursesOpen && (
                <div className="privacy-ul mt-two pl-four ml-4 mt-2 spacing-y-one border-l-2 !border-cyan-200 pl-4 animate-in fade-in slide-in-from-top-1 duration-200">
                  {courses.map((course) => (
                    <span
                      key={course.href}
                      onClick={()=>{navigate('/courses',{state:course.id})}}
                      className="paddingy-two block py-2 !text-gray-600 hover:!text-cyan-600 text-sm transition-colors cursor-pointer"
                    >
                      {course.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing */}
            <div
              className="block px-three paddingy-three px-3 py-3 !text-gray-700 hover:!text-cyan-600 font-medium !text-base transition-colors rounded-lg cursor-pointer"
              onClick={()=>{navigate('/curriculum-page')}}
            >
              Curriculum
            </div>

            {/* About */}
             <div 
          className="header-text !px-3 !py-3 !text-gray-700 hover:!text-cyan-600 font-medium transition-colors cursor-pointer"
          onClick={()=>{navigate('/about-us')}}>
            About
          </div>
           <div 
          className="header-text !px-3 !py-3  text-gray-700 hover:!text-cyan-600 font-medium transition-colors cursor-pointer"
          onClick={()=>{navigate('/course-blogs')}}>
            Blogs
          </div>

            {/* Divider */}
            <div className="my-four border-t !border-gray-200" />

            {/* Login */}
            <div className="pt-four">
              <Button className=" paddingy-three flex items-center justify-center !bg-transparent w-full !text-gray-700 hover:text-cyan-600 border !border-[var(--accentsec)] font-medium transition-colors rounded-lg hover:bg-cyan-50"
              onClick={()=>{navigate('/Login')}}
         >
      
              Login
            

              </Button>

            </div>


            {/* CTA Button */}
            <div className="pt-four">
              <Button
                // asChild
                className="paddingy-three w-full flex items-center justify-center !bg-cyan-600 hover:!bg-cyan-700 text-white font-semibold rounded-lg py-2.5 h-auto transition-colors"
                onClick={()=>{navigate('/register')}}
              >
                Book Free Trial
              </Button>
             
            </div>
          </div>
        </nav>
      )}
    </div>
    </>
  )
}
