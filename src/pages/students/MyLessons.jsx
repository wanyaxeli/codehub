import React from 'react'

export default function MyLessons() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'];
    const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM','2:00 PM',
    '3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM'];
    const lessons = [
    { day: 'Monday', time: '9:00 AM', lesson: 'Math' },
    { day: 'Tuesday', time: '10:00 AM', lesson: 'Science', time: '1:00 PM' ,lesson: 'Html for begginer'},
    { day: 'Wednesday', time: '11:00 AM', lesson: 'History' },
    { day: 'Saturday', time: '11:00 AM', lesson: 'History', time: '3:00 PM', lesson: 'Css ', time: '7:00 PM', lesson: 'Roblox' },
    ];
     // Helper function to find a lesson for a specific day and time
  const getLesson = (day, time) => {
    const lesson = lessons.find(lesson => lesson.day === day && lesson.time === time);
    return lesson ? lesson.lesson : ''; // Return lesson name or empty string
  };
  return (
    <div className='MyLessonWrapper'>
         <table>
        <thead>
          <tr>
            <th>Time</th>
            {days.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(time => (
            <tr key={time}>
              <td>{time}</td>
              {days.map(day => (
                <td key={`${day}-${time}`}>{getLesson(day, time)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
