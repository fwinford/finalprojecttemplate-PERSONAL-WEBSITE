import taskmateImg from '../assets/projects/taskmate.jpg';
import fingeImg from '../assets/projects/finge.jpeg';
import websiteImg from '../assets/projects/personalportfolio.jpg';

const projectData = [
  {
    id: 1,
    title: "Personal Portfolio",
    description: "Like Inception, but for personal websites",
    image: websiteImg, // Swap for your actual portfolio image
    link: "https://your-portfolio-link.com",
    stack: ["React", "Tailwind CSS", "Vite"]
  },  
  {
      id: 2,
      title: "Personal Portfolio",
      description: "Like Inception, but for personal websites",
      image: websiteImg, // Swap for your actual portfolio image
      link: "https://your-portfolio-link.com",
      stack: ["React", "Tailwind CSS", "Vite"]
    },
    {
      id: 3,
      title: "Fin/ge",
      description: "Hinge for Stocks",
      image: fingeImg,
      link: "https://devpost.com/software/fin-ge",
      stack: ["FastAPI", "MongoDB", "React", "TypeScript", "Vite"]
    },
    {
      id: 4,
      title: "TaskMate",
      description: "Struggle with lazy roommates? TaskMate's your solution! Organize tasks effortlessly. Say goodbye to chaos, hello to harmony",
      image: taskmateImg,
      link: "https://devpost.com/software/in-progress-d6wk58",
      stack: ["Flask", "HTML", "JavaScript", "Python"]
    }
];
  
  export default projectData;