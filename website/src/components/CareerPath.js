import React, { useState, useEffect, useRef } from 'react';
import '../styles/careerpath.css';
import { getHighlightedExperiences } from './shared/ExperienceData';

const CareerPath = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const nodeRefs = useRef([]);
  const containerRef = useRef(null);
  
  // Original pastel colors for normal state
  const gradientColors = [
    'rgba(255, 158, 177, 0.8)', // Pink
    'rgba(179, 212, 255, 0.8)', // Blue
    'rgba(187, 255, 203, 0.8)', // Light green
    'rgba(255, 223, 165, 0.8)', // Peach
    'rgba(209, 178, 255, 0.8)'  // Lavender
  ];
  
  // Brighter colors for hover state (same color families)
  const hoverColors = [
    'rgba(255, 105, 180, 0.9)', // Brighter pink
    'rgba(100, 181, 246, 0.9)', // Brighter blue
    'rgba(129, 233, 150, 0.9)', // Brighter green
    'rgba(255, 190, 92, 0.9)',  // Brighter peach
    'rgba(186, 104, 255, 0.9)'  // Brighter lavender
  ];
  
  // Get career data from shared source
  const careerNodes = getHighlightedExperiences();
  
  // Sort nodes by date (most recent first)
  // We assume the dates are in a format like "Month Year - Present" or "Month Year - Month Year"
  const sortedNodes = [...careerNodes].sort((a, b) => {
    // Extract the start date from each node
    const getStartDate = (dateStr) => {
      const parts = dateStr.split(' - ')[0].trim().split(' ');
      const month = parts[0];
      const year = parseInt(parts[1]);
      
      // Map month names to numbers
      const months = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
      };
      
      return new Date(year, months[month] || 0);
    };
    
    // Compare dates (most recent first)
    return getStartDate(b.date) - getStartDate(a.date);
  });
  
  // Get color for a node based on its index
  const getNodeColor = (index, isHovered) => {
    if (isHovered) {
      return hoverColors[index % hoverColors.length];
    }
    return gradientColors[index % gradientColors.length];
  };
  
  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
  };
  
  // Initialize node positions with chronological ordering
  useEffect(() => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = Math.max(window.innerHeight, 50 + (sortedNodes.length * 200) + 50); // 50px padding at top and bottom
    
    // Set container height to accommodate all nodes
    containerRef.current.style.height = `${containerHeight}px`;
    
    // Width of each node card plus some margin
    const nodeWidth = 340; // Width
    
    // Available horizontal space
    const availableWidth = containerWidth - nodeWidth - 40; // 20px padding on each side
    
    // Position nodes chronologically from top to bottom
    nodeRefs.current.forEach((node, index) => {
      if (!node) return;
      
      // Calculate vertical position based on chronology with reduced spacing
      // Adjust the multiplier (120 instead of previous calculation) to bring them closer
      const verticalPosition = index === 0 
        ? 50 // First node close to title
        : 50 + (index * 200); // Reduced vertical spacing between nodes
      
      // Randomize horizontal position but ensure it fits within container
      // Use a different pattern for odd/even indices for visual interest
      let horizontalPosition;
      if (index % 2 === 0) {
        // Even indices - left side with some randomness
        horizontalPosition = Math.random() * (availableWidth * 0.4) + 20;
      } else {
        // Odd indices - right side with some randomness
        horizontalPosition = availableWidth * 0.6 + Math.random() * (availableWidth * 0.4) + 20;
      }
      
      // Set position
      node.style.left = `${horizontalPosition}px`;
      node.style.top = `${verticalPosition}px`;
      
      // Create complex random movement parameters for this node
      node.dataset.rangeX = (Math.random() * 10 + 5).toFixed(1); // 5-15px X range
      node.dataset.rangeY = (Math.random() * 10 + 5).toFixed(1); // 5-15px Y range
      node.dataset.speedX1 = (Math.random() * 0.0005 + 0.0002).toFixed(6); // Primary X frequency
      node.dataset.speedY1 = (Math.random() * 0.0005 + 0.0002).toFixed(6); // Primary Y frequency
      node.dataset.speedX2 = (Math.random() * 0.001 + 0.0005).toFixed(6); // Secondary X frequency
      node.dataset.speedY2 = (Math.random() * 0.001 + 0.0005).toFixed(6); // Secondary Y frequency
      node.dataset.phaseX = (Math.random() * 6.28).toFixed(2); // Random phase offset (0-2π)
      node.dataset.phaseY = (Math.random() * 6.28).toFixed(2); // Random phase offset (0-2π)
    });
    
    // Start the animation
    const frameIds = startFloatingAnimation();
    
    return () => {
      // Clean up animations
      frameIds.forEach(id => cancelAnimationFrame(id));
    };
  }, [sortedNodes.length]);
  
  // More natural floating animation function
  const startFloatingAnimation = () => {
    const frameIds = [];
    
    nodeRefs.current.forEach((node, index) => {
      if (!node) return;
      
      const animate = () => {
        if (!node) return;
        
        const rangeX = parseFloat(node.dataset.rangeX);
        const rangeY = parseFloat(node.dataset.rangeY);
        const speedX1 = parseFloat(node.dataset.speedX1);
        const speedY1 = parseFloat(node.dataset.speedY1);
        const speedX2 = parseFloat(node.dataset.speedX2);
        const speedY2 = parseFloat(node.dataset.speedY2);
        const phaseX = parseFloat(node.dataset.phaseX);
        const phaseY = parseFloat(node.dataset.phaseY);
        
        // Current time
        const now = Date.now();
        
        // Create more complex, natural movement by combining multiple wave patterns
        // Primary wave + secondary wave + slight random noise
        const offsetX = 
          Math.sin(now * speedX1 + phaseX) * rangeX * 0.7 + 
          Math.sin(now * speedX2 + phaseX * 2) * rangeX * 0.3 +
          Math.sin(now * 0.001 + index) * 2; // Small random noise
        
        const offsetY = 
          Math.cos(now * speedY1 + phaseY) * rangeY * 0.7 + 
          Math.cos(now * speedY2 + phaseY * 2) * rangeY * 0.3 +
          Math.cos(now * 0.001 + index * 2) * 2; // Small random noise
        
        // Apply the movement
        node.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        
        // Continue animation
        frameIds[index] = requestAnimationFrame(animate);
      };
      
      // Start animation for this node
      animate();
    });
    
    // Return the frame IDs for cleanup
    return frameIds;
  };
  
  // Intersection Observer for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    
    const currentNodeRefs = nodeRefs.current;
    
    currentNodeRefs.forEach((node) => {
      if (node) observer.observe(node);
    });
    
    return () => {
      currentNodeRefs.forEach((node) => {
        if (node) observer.unobserve(node);
      });
    };
  }, []);
  
  return (
    <section id="career-path" className="career-path-section">
      <h2 className="section-title">
        <span className="highlight">Curious</span> about my experience?
      </h2>
      
      <div className="flow-container" ref={containerRef}>
        <div className="career-nodes">
          {sortedNodes.map((node, index) => {
            const isHovered = hoveredNode === node.id;
            const nodeColor = getNodeColor(index, isHovered);
            const companyColor = gradientColors[index % gradientColors.length].replace('0.8', '1');
            
            return (
              <div 
                key={node.id}
                ref={(el) => (nodeRefs.current[index] = el)}
                className={`career-node ${activeNode === node.id ? 'active' : ''}`}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="node-content">
                  <h3 className="node-title">{node.title}</h3>
                  <div 
                    className="node-aura" 
                    style={{ backgroundColor: nodeColor }}
                  ></div>
                  <h4 className="node-organization" style={{ color: companyColor }}>
                    {node.organization}
                  </h4>
                  <p className="node-date">{node.date}</p>
                  <p className="node-description">{node.description}</p>
                  
                  <div className="node-details">
                    <div className="skills">
                      {node.skills.map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                    <p className="node-lesson">{node.lessons}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerPath;