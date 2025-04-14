// src/data/experienceData.js

const experienceData = [
    {
      id: 1,
      title: "Finance and Operations Intern",
      company: "A4TE",
      organization: "A4TE", // For CareerPath component
      location: "New York, New York",
      date: "September 2023 - Present",
      description: "Developed financial models and streamlined operations processes.", // Short description for CareerPath
      responsibilities: [
        "Managing vendor relationships and pro-bono partnerships with over 80 law firms, measured by $12.35M in in-kind contributions",
        "Assisting with fund accounting and reconciliation for assets over $2.0M while enhancing IT infrastructure"
      ],
      skills: ["Financial Analysis", "Operations", "Excel"],
      lessons: "Learned how technology can transform traditional finance operations."
    },
    {
      id: 2,
      title: "Technical Solutions Specialist",
      company: "Restoration Chiropractic",
      organization: "Restoration Chiropractic",
      location: "Savannah, Georgia",
      date: "May 2023 - August 2023",
      description: "Improved office efficiency through technical solutions and workflow automation.",
      responsibilities: [
        "Implemented automated workflows for efficient communication and data processing",
        "Transitioned the team from Skype to Slack, improving internal communication efficiency"
      ],
      skills: ["Automation", "Workflow Design", "Communication Tools"],
      lessons: "Learned how the right technical tools can transform small business operations."
    },
    {
      id: 3,
      title: "IT Intern",
      company: "Blessed Sacrament Catholic School",
      organization: "Blessed Sacrament",
      location: "Savannah, Georgia",
      date: "May 2023 - July 2023",
      description: "Managed device inventory and provided technical support across the school.",
      responsibilities: [
        "Managed and tracked 300+ devices, achieving 100% inventory accuracy through streamlined processes",
        "Configured and updated 50+ devices while reducing classroom tech issues through proactive support"
      ],
      skills: ["IT Support", "Inventory Management", "Troubleshooting"],
      lessons: "Discovered the importance of proactive maintenance in educational technology environments."
    },
    {
      id: 4,
      title: "Website Maintainer",
      company: "BUGS @ NYU",
      organization: "BUGS @ NYU",
      location: "New York, New York",
      date: "January 2024 - Present",
      description: "Maintaining and updating the organization's website.",
      responsibilities: [
        "Maintaining and updating the organization's website to ensure functionality and accessibility"
      ],
      skills: ["Web Development", "HTML/CSS", "Content Management"],
      lessons: "Learned the importance of continuous maintenance for web platforms."
    },
    {
      id: 5,
      title: "Mathematics Tutor",
      company: "America Reads*America Counts",
      organization: "America Reads*America Counts",
      location: "New York City Metropolitan Area",
      date: "September 2023 - April 2024",
      description: "Tutored students to improve their mathematics skills and test scores.",
      responsibilities: [
        "Tutored 60+ students through individual and group sessions, helping to improve test scores by 5%"
      ],
      skills: ["Teaching", "Mathematics", "Communication"],
      lessons: "Discovered effective ways to communicate complex concepts to diverse learners."
    }
  ];
  
  export default experienceData;
  
  // Helper function to get a subset of experiences for CareerPath
  export const getHighlightedExperiences = () => {
    // Return only the experiences you want to show in the CareerPath component
    // For example, return the first 3 experiences
    //return experienceData.slice(0, 3);
  return experienceData;
  };
  
  // Return all experiences for the Experience component
  export const getAllExperiences = () => {
    return experienceData;
  };