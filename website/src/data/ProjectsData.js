import taskmateImg from '../assets/projects/taskmate.jpg';
import fingeImg from '../assets/projects/finge.jpeg';
import websiteImg from '../assets/projects/personalportfolio.jpg';
import newstoactionImg from '../assets/projects/newstoaction.jpg';

const projectData = [
  {
    id: 1,
    title: "TaskMate",
    description: "Struggle with lazy roommates? TaskMate's your solution!",
    image: taskmateImg,
    link: "https://devpost.com/software/in-progress-d6wk58",
    // githubLink: "https://github.com/fwinford/your-taskmate-repo", // Optional: Add GitHub repo link if available
    stack: ["Flask", "HTML", "JavaScript", "Python"]
  },
  {
    id: 2,
    title: "Fin/ge",
    description: "Hinge for Stocks",
    image: fingeImg,
    link: "https://devpost.com/software/fin-ge",
    // githubLink: "https://github.com/fwinford/your-finge-repo", // Optional: Add GitHub repo link if available
    stack: ["FastAPI", "MongoDB", "React", "TypeScript", "Vite"]
  },
  {
    id: 3,
    title: "Personal Portfolio",
    description: "Like Inception, but for personal websites",
    image: websiteImg, // Swap for your actual portfolio image
    link: "https://www.faithwinford.com/",
    githubLink: "https://github.com/fwinford/finalprojecttemplate-PERSONAL-WEBSITE", // Optional: Add GitHub repo link
    stack: ["React", "Tailwind CSS", "Vite"]
  },
  {
    id: 4,
    title: "NewsToAction",
    description: "CLI that transforms news articles into actionable insights.",
    image: newstoactionImg,
    link: "https://www.canva.com/design/DAGsGVoXKSo/TYZNMRm80VCzJACb01Yzng/edit?utm_content=DAGsGVoXKSo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    githubLink: "https://github.com/fwinford/grassroots-cli", // Optional: Add GitHub repo link if available
    stack: ["Python", "SQL", "OpenAI API", "Charity API"]
  }
  // To add a new project, simply add a new object here with id: 5, 6, etc.
  // Example:
  // {
  //   id: 5,
  //   title: "Your New Project",
  //   description: "Description of your new project",
  //   image: newProjectImg,
  //   link: "https://your-project-link.com",
  //   githubLink: "https://github.com/your-username/your-repo", // Optional
  //   stack: ["Tech1", "Tech2", "Tech3"]
  // }
];
  
  export default projectData;