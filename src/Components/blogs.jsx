// import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle2, Users, Award, Code, Lightbulb, Zap, Star, PlayCircle, Image } from 'lucide-react'
import courses from '../lib/course-blogs'
import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

export const metadata = {
  title: 'Python for Kids - CodingScholar',
  description: 'Learn Python programming with live online tutoring designed for kids and teens. Build projects, earn certificates, and discover the future of coding.',
}

export default function CourseDetailPage() {
  // const [chosencourse,setCourse]=useState()
  const location=useLocation()
  const navigate=useNavigate()
  const [chosencourseid,setChosenCourseId]=useState(location.state ||1)

  useEffect(()=>{
    // const state=location.state
    console.log('state',location.state)
    setChosenCourseId(location.state)
    window.scrollTo(0,0)

  },[location.state])

  console.log('courses ',courses)
  console.log('location state', chosencourseid)

  // useEffect(()=>{
  //   console.log('findinf courses')
    // if (!chosencourseid) return
   const chosencourse=courses.find((course)=>Number(course.id)===Number(chosencourseid))
  //  setCourse(foundcourse)

   
  // },[chosencourseid,courses])
  
  console.log('chosencourse..',chosencourse)
  // console.


  // const handlechoosecourse=(id)=>{
  //   console.log('chosen course id',id)
  //   setChosenCourseId(id)
  // }


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="paddingy-courseblogs relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 md:paddingy-courseblogs">
        <div className="heroblogcontainer mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-center">
            <div className="spacing-y-six flex flex-col justify-center space-y-6">
              <div className="inline-block">
                <span className="padding-two inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-[var(--blog-primary)]">
                  {chosencourse.tag}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance leading-tight">
                {chosencourse.title}
              </h1>
              <p className="text-xl text-gray-600 text-balance">
                {chosencourse.titlesupportstatement}
              </p>
              
              <div className="paddingtopfour flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--blog-primary)]/10">
                    <Clock className="h-4 w-4 text-[var(--blog-primary)]" />
                  </span>
                  <span className="text-sm font-medium text-gray-700">{chosencourse.timeline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--blog-primary)]/10">
                    <Users className="h-4 w-4 text-[var(--blog-primary)]" />
                  </span>
                  <span className="text-sm font-medium text-gray-700">Grades {chosencourse.grades}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--blog-primary)]/10">
                    <Award className="h-4 w-4 text-[var(--blog-primary)]" />
                  </span>
                  <span className="text-sm font-medium text-gray-700">Certificate</span>
                </div>
              </div>

              <div className="paddingfour spacing-y-two bg-white border border-gray-200 rounded-lg p-4 space-y-2">
                <p className="text-sm text-gray-600">Key Highlights</p>
                <ul className="spacing-y-two space-y-2">
                  {
                    chosencourse.highlights.map((highlight)=>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-[var(--blog-primary)] flex-shrink-0" />
                    <span className="text-sm">{highlight}</span>
                  </li>
                    )

                  }
                  {/* <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-[var(--blog-primary)] flex-shrink-0" />
                    <span className="text-sm">Live online tutoring</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-[var(--blog-primary)] flex-shrink-0" />
                    <span className="text-sm">1000+ students enrolled</span>
                  </li> */}
                </ul>
              </div>

              <div className="paddingtopfour flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="paddingxeight h-12 px-8 text-base font-semibold bg-[var(--blog-primary)] hover:bg-[var(--blog-primary)]/90 text-white rounded-lg">
                  Try a Free Lesson
                </Button>
                <Button variant="outline" className="paddingxeight h-12 text-black px-8 text-base font-semibold border-2 border-gray-300 hover:border-[var(--blog-primary)] hover:text-[var(--blog-primary)] rounded-lg bg-transparent">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative md:h-full  rounded-xl overflow-hidden shadow-xl">
              <img
                src={chosencourse.heropic}
                alt="Kids learning Python programming"
                className="object-cover h-full w-full object-center"
                
              />
            </div>
          </div>
        </div>
      </section>

      {/* About the Course */}
      <section className="boutcoursesect py-16 md:py-20 bg-white">
        <div className="heroblogcontainer mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="spacing-y-six">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About This Course</h2>
              <div className="scheduleclass-modalspacing space-y-4">
                {
                  chosencourse.aboutcourse.map((about)=>(
                <div>
                  <h3 className="nogroup-p text-xl font-semibold text-gray-900 mb-2">{about.question}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {about.description}
                  </p>
                </div>

                  ))
                }
                {/* <div>
                  <h3 className="nogroup-p text-xl font-semibold text-gray-900 mb-2">Why Learn Python?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Python is the perfect first language for kids. It's easy to read, powerful, and used by tech companies like Google, Netflix, and NASA. Learning Python builds logical thinking, creativity, and confidence—skills that matter for the future.
                  </p>
                </div> */}
              </div>
            </div>
            <div className="spacing-y-six space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose CodingScholar?</h2>
              <div className="scheduleclass-modalspacing space-y-4 ">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--blog-primary)]/10">
                      <Users className="h-6 w-6 text-[var(--blog-primary)]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Live Tutoring</h3>
                    <p className="text-sm text-gray-600 mt-1">Connect with experienced instructors in real-time, ask questions, and get instant feedback.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--blog-primary)]/10">
                      <Lightbulb className="h-6 w-6 text-[var(--blog-primary)]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Project-Based Learning</h3>
                    <p className="text-sm text-gray-600 mt-1">Learn by doing. Build games, apps, and tools while mastering Python concepts.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--blog-primary)]/10">
                      <Zap className="h-6 w-6 text-[var(--blog-primary)]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Flexible Schedule</h3>
                    <p className="text-sm text-gray-600 mt-1">Choose class times that work for you. Access recorded sessions anytime.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-p[var(--blog-primary)]/10">
                      <Award className="h-6 w-6 text-[var(--blog-primary)]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Certified Achievement</h3>
                    <p className="text-sm text-gray-600 mt-1">Earn a certificate of completion recognized by top tech companies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="boutcoursesect py-16 md:py-20 bg-gray-50">
        <div className="heroblogcontainer mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mbottomtwelve text-center mb-12">
            <h2 className="margin-btm-four text-3xl md:text-4xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
            <p className="mxauto text-lg text-gray-600 max-w-2xl mx-auto">
              {chosencourse.learncoursedescription}
            </p>
          </div>

          <div className="privacy-sections grid gap-8 md:grid-cols-3 mb-12">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="all-groups p-6">
                <div className="margin-btm-four inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--blog-primary)]/10 mb-4">
                  <Code className="h-6 w-6 text-[var(--blog-primary)]" />
                </div>
                <h3 className="privacy-infocollect-title text-xl font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                <ul className="modal-y-spacing space-y-2 text-gray-600 text-sm">
                  {
                    chosencourse.learn.map((whattolearn)=>(
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>{whattolearn}</span>
                  </li>

                    ))
                  }
                  {/* <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Variables, loops & functions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Data structures & algorithms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Game development with Pygame</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Web scraping basics</span>
                  </li> */}
                </ul>
              </div>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="all-groups p-6">
                <div className="margin-btm-four inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--blog-primary)]/10 mb-4">
                  <Lightbulb className="h-6 w-6 text-[var(--blog-primary)]" />
                </div>
                <h3 className="privacy-infocollect-title text-xl font-semibold text-gray-900 mb-3">What You'll Gain</h3>
                <ul className="modal-y-spacing space-y-2 text-gray-600 text-sm">
                  {
                    chosencourse.gain.map((whattogain)=>(
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>{whattogain}</span>
                  </li>

                    ))
                  }
                  {/* <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Problem-solving skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Logical thinking ability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Creative expression through code</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Confidence in tech</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Collaboration experience</span>
                  </li> */}
                </ul>
              </div>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="all-groups p-6">
                <div className="margin-btm-four inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--blog-primary)]/10 mb-4">
                  <Award className="h-6 w-6 text-[var(--blog-primary)]" />
                </div>
                <h3 className="privacy-infocollect-title text-xl font-semibold text-gray-900 mb-3">What You'll Achieve</h3>
                <ul className="modal-y-spacing space-y-2 text-gray-600 text-sm">
                  {
                    chosencourse.achievements.map((whattoachieve)=>(
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>{whattoachieve}</span>
                  </li>

                    ))
                  }
                  {/* <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Build 10+ real projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Create a portfolio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Certification of completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Job-ready skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--blog-primary)] flex-shrink-0 mt-0.5" />
                    <span>Community connections</span>
                  </li> */}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Student Projects */}
      <section className="boutcoursesect py-16 md:py-20 bg-white">
        <div className="heroblogcontainer mxauto mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mbottomtwelve text-center mb-12">
            <h2 className="margin-btm-four text-3xl md:text-4xl font-bold text-gray-900 mb-4">Student Projects</h2>
            <p className="mxauto text-lg text-gray-600 max-w-2xl mx-auto">
              See what amazing projects our students have created!
            </p>
          </div>

          <div className="privacy-header grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {chosencourse.studentProjects.map((project, idx) => (
              <Card key={idx} className="border border-gray-200 hover:border-[var(--blog-primary)] hover:shadow-lg transition-all overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
                  <Image className="h-12 w-12 text-white opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <img src={project.picture} alt="" className='object-cover'/>
                </div>
                <div className="all-groups p-6">
                  <h3 className="marginbottom-two text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-80 md:h-96">
              <img
                src="https://i.pinimg.com/1200x/e3/6d/8c/e36d8ca7121fca921166a499ab17ec57.jpg"
                alt="Student programming projects showcase"
                // fill
                className="object-cover w-full h-auto"
              />
            </div>
          </div> */}
        </div>
      </section>

      {/* Testimonial */}
      <section className="boutcoursesect py-16 md:py-20 bg-gradient-to-br from-[var(--blog-primary)]/5 to-cyan-50">
        <div className="heroblogcontainer mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mbottomtwelve text-center mb-12">
            <h2 className="margin-btm-four text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Parents & Students Say</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="relative h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <img
                src={chosencourse.testimonail.testimonialpic}
                alt="Success story student"
                // fill
                className="object-cover h-full w-full object-center"
              />
            </div>

            <Card className="groupstdnt-container border border-gray-200 bg-white p-8 shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                {chosencourse.testimonail.testimonial}
              </p>
              <div>
                <p className="font-semibold text-gray-900">{chosencourse.testimonail.parent?`${chosencourse.testimonail.parent} & `:''} {chosencourse.testimonail.Student}</p>
                <p className="text-sm text-gray-600">{chosencourse.testimonail.parent?`Parent & `:''} Student, Grade {chosencourse.testimonail.Grade}</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="boutcoursesect flex py-16 md:py-20 bg-white text-center justify-center">
        <div className="heroblogcontainer mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mbottomtwelve text-center mb-12">
            <h2 className="margin-btm-four text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Everything parents and students need to know about {chosencourse.title}.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {
              chosencourse.FAQs.map((faq)=>(
            <AccordionItem value={faq.id} className="border-b border-gray-200">
              <AccordionTrigger className="padding-yfour text-left hover:text-[var(--blog-primary)] py-4">
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="paddingbtmfour text-gray-600 pb-4">
               {faq.answer}
              </AccordionContent>
            </AccordionItem>

              ))
            }

            {/* <AccordionItem value="item-2" className="border-b border-gray-200">
              <AccordionTrigger className="padding-yfour text-left hover:text-[var(--blog-primary)] py-4">
                <span className="text-lg font-semibold text-gray-900">Do kids need prior programming experience?</span>
              </AccordionTrigger>
              <AccordionContent className="paddingbtmfour text-gray-600 pb-4">
                No prior experience is needed! We welcome complete beginners. Whether your child has never coded before or has basic knowledge, our instructors will place them at the right level and provide support throughout the course.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-gray-200">
              <AccordionTrigger className="padding-yfour text-left hover:text-[var(--blog-primary)] py-4">
                <span className="text-lg font-semibold text-gray-900">How are classes conducted?</span>
              </AccordionTrigger>
              <AccordionContent className="paddingbtmfour text-gray-600 pb-4">
                Classes are live, interactive sessions conducted online via Zoom. Students can interact directly with instructors, ask questions, and collaborate with classmates. Each session is recorded, so if a student misses a class, they can watch the replay at their convenience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-gray-200">
              <AccordionTrigger className="padding-yfour text-left hover:text-[var(--blog-primary)] py-4">
                <span className="text-lg font-semibold text-gray-900">What tools or devices are required?</span>
              </AccordionTrigger>
              <AccordionContent className="paddingbtmfour text-gray-600 pb-4">
                Students need a laptop or desktop computer with an internet connection. We recommend a device with at least 4GB of RAM and a modern browser. A webcam and microphone are also required for live classes. We support Windows, Mac, and Linux systems.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-gray-200">
              <AccordionTrigger className="padding-yfour text-left hover:text-[var(--blog-primary)] py-4">
                <span className="text-lg font-semibold text-gray-900">Is there a certificate of completion?</span>
              </AccordionTrigger>
              <AccordionContent className="paddingbtmfour text-gray-600 pb-4">
                Yes! After successfully completing the course, each student receives an official Certificate of Completion from CodingScholar. This certificate recognizes their achievement and is recognized by top tech companies and educational institutions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-b border-gray-200">
              <AccordionTrigger className="padding-yfour text-left hover:text-[var(--blog-primary)] py-4">
                <span className="text-lg font-semibold text-gray-900">What happens after the course ends?</span>
              </AccordionTrigger>
              <AccordionContent className="paddingbtmfour text-gray-600 pb-4">
                Course completion is just the beginning! Graduates get access to our alumni community, advanced course options, and job placement resources. They can continue learning with our advanced courses in web development, AI, and more.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-b border-gray-200">
              <AccordionTrigger className="padding-yfour text-left hover:text-[var(--blog-primary)] py-4">
                <span className="text-lg font-semibold text-gray-900">What is the class size?</span>
              </AccordionTrigger>
              <AccordionContent className="paddingbtmfour text-gray-600 pb-4">
                We keep class sizes small (typically 8-12 students) to ensure each student receives personalized attention and can ask questions comfortably. This creates a supportive learning environment where every student can thrive.
              </AccordionContent>
            </AccordionItem> */}
          </Accordion>
        </div>
      </section>

      {/* Other Courses */}
      <section className="boutcoursesect py-16 md:py-20 bg-gray-50">
        <div className="heroblogcontainer mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mbottomtwelve text-center mb-12">
            <h2 className="margin-btm-four text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore More Courses</h2>
            <p className="mxauto text-lg text-gray-600 max-w-2xl mx-auto">
              Ready for more? Check out our other courses designed for young learners.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {chosencourse.others.map((course, idx) => (
              <Card key={idx} className="border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* <div className="h-40 bg-gradient-to-br from-[var(--blog-primary)]/20 to-[var(--blog-primary)]/5 flex items-center justify-center">
                  <Code className="h-16 w-16 text-[var(--blog-primary)]/30" />
                </div> */}
                <div className='flex h-45 items-center justify-center'>
                  <img src={course.pic} alt="" className='object-cover h-full w-full'  />
                </div>
                <div className="all-groups p-6">
                  <h3 className="nogroup-p text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="margin-btm-four text-sm text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--blog-primary)]">{course.students}</span>
                    <Button 
                    onClick={()=>{
                      navigate('/course-blogs',{state:course.id})
                      console.log(course.id)}}
                     variant="outline" size="sm" className="padding-two border-[var(--blog-primary)] text-[var(--blog-primary)] hover:bg-[var(--blog-primary)]/10 bg-transparent">
                      View Course
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="boutcoursesect flex items-center justify-center py-16 md:py-20 bg-gradient-to-r from-[var(--blog-primary)] to-[var(--blog-primary)]/80">
        <div className="mxauto  heroblogcontainer mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="margin-btm-four text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
            Ready to Start Coding?
          </h2>
          <p className="privacy-header text-xl text-white/90 mb-8 max-w-2xl mx-auto text-balance">
            Join 1000+ students already learning at CodingScholar. Claim your free lesson and discover why kids love our courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="h-12 padding-two  px-8 text-base font-semibold bg-white text-[var(--blog-primary)] hover:bg-gray-100">
              Start Free Lesson
            </Button>
            <Button variant="outline" className="h-12 padding-two  px-8 text-base font-semibold border-2 border-white text-white hover:bg-white/10 bg-transparent">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      
    </div>
  )
}

function Clock({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  )
}
