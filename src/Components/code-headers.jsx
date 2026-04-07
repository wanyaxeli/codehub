'use client'

import { useState, useRef, useEffect, lazy } from 'react'
// import Link from 'next/Link'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Code2, ChevronDown } from 'lucide-react'
import pic from '../assets/codingscholarlogo003.png'

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
        <div  className="flex items-center  hover:opacity-80 transition-opacity"
        onClick={()=>{navigate('/')}}>
          
           <div className="flex items-center gap-3">
            {/* <div className="logoContainer"> */}
            <div className="w-24 h-24 flex items-center justify-center  rounded-full overflow-hidden">
            <img
              src={pic}
              alt="logo"
              className="object-contain h-50 w-50 scale-200  "
            />
          </div>
            {/* <img loading="lazy" src={pic} alt="logo" className='flex  object-contain h-24 w-24 bg-green-300 items-center justify-center' /> */}
           {/* </div> */}
          <h4 className="!text-[var(--headingsec)] font-bold text-xl   tracking-wide">
                 codingscholar
                   </h4>
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
            <button className="buttons-bg header-text flex items-center gap-1 bg-transparent text-gray-700 hover:text-cyan-600 font-medium transition-colors group focus:outline-none">
              Courses
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 group-hover:text-cyan-600 ${isCoursesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel */}
            {isCoursesOpen && (
              <div className="paddingy-two absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                {courses.map((course) => (
                  <span
                    key={course.href}
                    onClick={()=>{navigate('/course-blogs',{state:course.id})}}
                    className="header-text paddingx-four  padding-yfour cursor-pointer flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-150 first:rounded-t-lg last:rounded-b-lg group/item"
                  >
                    {/* <div className="w-2 h-2 rounded-full bg-cyan-600 group-hover/item:scale-150 transition-transform duration-200" /> */}
                    <span>{course.name}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <Link href="/pricing" className="header-text text-gray-700 hover:text-cyan-600 font-medium transition-colors">
            Pricing
          </Link>

          <Link href="/about" className="header-text text-gray-700 hover:text-cyan-600 font-medium transition-colors">
            About
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <div className="header-text text-gray-700 hover:text-cyan-600 font-medium transition-colors cursor-pointer" 
            onClick={()=>{navigate('/Login')}}>
            Login
          </div>

          {/* <Link href="/join" className="header-text text-gray-700 hover:text-cyan-600 font-medium transition-colors">
            Join Class
          </Link> */}

          <Button
            asChild
            className="padding-yfour paddingx-six bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg px-6 py-2 h-auto transition-colors cursor-pointer"
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
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
           onClick={()=>{navigate('/')}}
        >
          <div className="flex items-center gap-3">
            <div className="w-24 h-24 flex items-center justify-center  rounded-full overflow-hidden">
            <img
              src={pic}
              alt="logo"
              className="object-contain h-50 w-50 scale-200  "
            />
          </div>
          <h4 className="!text-[var(--headingsec)] font-bold text-xl tracking-wide">
                 codingscholar
                   </h4>
          </div>
          {/* <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
            <img loading={lazy} src={pic} alt="CS" />
          </div> */}
          {/* <span className="font-bold text-lg text-gray-900 tracking-tight">
            CodingScholar
          </span> */}
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
              className="px-three paddingy-three block px-3 py-3 !text-gray-700 hover:!text-cyan-600 font-medium text-base transition-colors rounded-lg hover:bg-cyan-50"
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
                      onClick={()=>{navigate('/course-blogs',{state:course.id})}}
                      className="paddingy-two block py-2 !text-gray-600 hover:!text-cyan-600 text-sm transition-colors"
                    >
                      {course.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing */}
            <Link
              href="/pricing"
              className="block px-three paddingy-three px-3 py-3 !text-gray-700 hover:!text-cyan-600 font-medium !text-base transition-colors rounded-lg hover:bg-cyan-50"
            >
              Pricing
            </Link>

            {/* About */}
            <Link
              href="/about"
              className="block  px-three paddingy-three !text-gray-700 hover:!text-cyan-600 font-medium text-base transition-colors rounded-lg hover:bg-cyan-50"
            >
              About
            </Link>

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
