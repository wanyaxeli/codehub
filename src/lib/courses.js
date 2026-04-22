import codeexplorerpic from '../assets/codingexplorer.webp'
import codespecialistpic from '../assets/codingspecialist001.jpg'
import codeinnovator from '../assets/codinginnovator001.jpg'
import mathpic from '../assets/math.jpg'
const coursesData = {
  items: [
    {
      _id: "1",
      courseTitle: "Coding Explorer",
      targetAgeGroup: "$6",
      shortDescription: "A fun, beginner-friendly coding program that teaches foundational skills through interactive stories, games, and animations.",
      courseImage: codeexplorerpic
    },
    {
      _id: "2",
      courseTitle: "Coding Innovator",
      targetAgeGroup: "$12",
      shortDescription: "A hands-on program for learners with basic experience, focused on building real apps and websites through guided projects.",
      courseImage: codeinnovator
    },
     {
      _id: "2",
      courseTitle: "Coding Specialist",
      targetAgeGroup: "$18",
      shortDescription: "An advanced program that develops mastery in Python and JavaScript through real-world, innovation-driven projects.",
      courseImage: codespecialistpic
     },
     {
      _id: "2",
      courseTitle: "Elementary Math",
      targetAgeGroup: "$10",
      shortDescription: "Engaging activities and games to build a strong foundation in addition, subtraction, multiplication, and division.",
      courseImage: mathpic
     },


  ]
};

export default coursesData