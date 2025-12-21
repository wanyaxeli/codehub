import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
export default function DisplayAttemptedQuiz() {
    const [quiz,setQuiz]=useState([])
    const [Choices,setChoices]=useState([])
    const location=useLocation()
    useEffect(() => {
      const { state } = location;
      if (!state) return;
    
      const { question, studentChoices } = state;
    
      setChoices(studentChoices);
      setQuiz(question[0].questions);
    }, [location]);
    const choicesMap = React.useMemo(() => {
      return Object.fromEntries(
        Choices.map(c => [c.id, c.choice])
      );
    }, [Choices]);
    console.log(choicesMap) 
  return (
    <div className='DisplayAttemptedQuiz'>
      {quiz.length > 0 ? quiz.map((item, i) => {
  const studentChoice = choicesMap[item.id];
  const isCorrect =
    studentChoice !== undefined &&
    studentChoice.toString().trim() === item.answer.toString().trim();

  return (
    <div key={i} className="questionCardHolder">
      <p>{item.quiz}</p>

      <div className="answerQrapper">
        <div className="InneranswerQrapper">
          <p>Correct Answer: {item.answer}</p>

          <p>
            Your choice: <strong>{studentChoice ?? "Not answered"}</strong>{" "}
            {studentChoice && (
              isCorrect ? (
                <i className="fa fa-check" style={{ color: "green" }} />
              ) : (
                <i className="fa fa-times" style={{ color: "red" }} />
              )
            )}
          </p>
        </div>
      </div>
    </div>
  );
}) : (
  <p>loading ...</p>
)}

    </div>
  )
}
