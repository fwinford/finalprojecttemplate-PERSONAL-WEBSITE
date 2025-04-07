// src/data/socialLinks.js
import { FaLinkedinIn, FaGithub, FaFileAlt } from 'react-icons/fa';

const socialLinks = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/faith-winford/',
    icon: FaLinkedinIn,
    ariaLabel: 'Visit my LinkedIn profile'
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/fwinford',
    icon: FaGithub,
    ariaLabel: 'Check out my GitHub repositories'
  },
  {
    id: 'resume',
    name: 'Resume',
    url: 'website/src/assets/F-Winford.pdf', // Update with your actual resume path
    icon: FaFileAlt,
    ariaLabel: 'View my resume'
  }
];

export default socialLinks;