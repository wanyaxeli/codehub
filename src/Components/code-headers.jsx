'use client'

import { useState, useRef, useEffect } from 'react'
// import Link from 'next/Link'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Code2, ChevronDown } from 'lucide-react'
import pic from '../assets/logoCodeHub.png'

export default function HeaderSection() {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const coursesRef = useRef(null)
  const navigate=useNavigate()

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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white h-[12vh] ">
      {/* Desktop Header */}
      <div className="headercontainer hidden md:flex items-center justify-between h-[12vh] px-6 lg:px-12 shadow-sm">
        {/* Left: Logo & Brand */}
        <div  className="flex items-center  hover:opacity-80 transition-opacity"
        onClick={()=>{navigate('/')}}>
          {/* <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900">CodingScholar</span> */}
           <div className="flex items-center gap-3">
  <div className="logoContainer">
            <img loading="lazy" src={pic} alt="logo" />
           </div>
          <h4 className="text-black font-bold text-lg tracking-wide">
                 codingscholar
                   </h4>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-8 text-black">
          {/* <Link href="/" className="header-text hover:text-cyan-600 font-medium transition-colors">
            Home
          </Link> */}

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

      {/* Mobile Header */}
      <div className="paddingx-four md:hidden flex items-center justify-between h-16 px-4 shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-base text-gray-900">CodingScholar</span>
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-700">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full sm:w-80 bg-white">
            <div className="flex flex-col gap-6 mt-8">
              {/* Navigation Links */}
              <Link
                href="/"
                className="text-gray-700 hover:text-cyan-600 font-medium text-lg transition-colors"
              >
                Home
              </Link>

              <Link
                href="/courses"
                className="text-gray-700 hover:text-cyan-600 font-medium text-lg transition-colors"
              >
                Courses
              </Link>

              <div className="paddingleft-four ml-4 space-y-2 border-l-2 border-cyan-200 pl-4">
                {courses.map((course) => (
                  <Link
                    key={course.href}
                    href={course.href}
                    className="block text-gray-600 hover:text-cyan-600 text-sm transition-colors"
                  >
                    {course.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/pricing"
                className="text-gray-700 hover:text-cyan-600 font-medium text-lg transition-colors"
              >
                Pricing
              </Link>

              <Link
                href="/about"
                className="text-gray-700 hover:text-cyan-600 font-medium text-lg transition-colors"
              >
                About
              </Link>

              <div className="paddingtopfour student-list border-t border-gray-200 pt-4 space-y-3">
                <Link
                  href="/login"
                  className="block text-gray-700 hover:text-cyan-600 font-medium transition-colors"
                >
                  Login
                </Link>

                <Link
                  href="/join"
                  className="block text-gray-700 hover:text-cyan-600 font-medium transition-colors"
                >
                  Join Class
                </Link>

                <Button
                  asChild
                  className=" paddingy-two w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg py-2 h-auto transition-colors"
                >
                  <Link href="/trial">Book Free Trial</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
