import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/careerpath.css';
import { getHighlightedExperiences } from '../data/ExperienceData';

const CareerPath = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [positions, setPositions] = useState({});
  const containerRef = useRef(null);
  const nodeData = useRef([]);
  const animationRef = useRef(null);
  const linesRef = useRef(null);
  const linesData = useRef([]);
  const initialized = useRef(false);

  // Z-index values
  const Z_INDEX = {
    BASE: 1,
    HOVER: 5,
    ACTIVE: 10
  };

  // Enhanced pastel colors with better contrast against white
  const gradientColors = [
    'rgba(219, 95, 120, 0.85)',  // Deeper pink
    'rgba(86, 145, 227, 0.85)',  // Deeper blue
    'rgba(95, 195, 116, 0.85)',  // Deeper green
    'rgba(244, 169, 65, 0.85)',  // Deeper peach/orange
    'rgba(156, 106, 222, 0.85)'  // Deeper lavender
  ];

  // Enhanced brighter colors for hover states
  const hoverColors = [
    'rgba(231, 76, 106, 0.95)',  // Brighter pink
    'rgba(63, 134, 230, 0.95)',  // Brighter blue
    'rgba(67, 181, 91, 0.95)',   // Brighter green
    'rgba(255, 153, 31, 0.95)',  // Brighter orange
    'rgba(138, 78, 214, 0.95)'   // Brighter lavender
  ];

  // Get career data from shared source
  const careerNodes = getHighlightedExperiences();

  // Sort nodes by date (most recent first)
  const sortedNodes = [...careerNodes].sort((a, b) => {
    const getStartDate = (dateStr) => {
      const parts = dateStr.split(' - ')[0].trim().split(' ');
      const month = parts[0];
      const year = parseInt(parts[1] || '2023');

      const months = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
      };

      return new Date(year, months[month] || 0);
    };

    return getStartDate(b.date) - getStartDate(a.date);
  });

  // Get color for a node based on its index
  const getNodeColor = (index, isHovered) => {
    if (isHovered) {
      return hoverColors[index % hoverColors.length];
    }
    return gradientColors[index % gradientColors.length];
  };

  // Handle node click
  const handleNodeClick = useCallback((id) => {
    setActiveNode(prevActive => prevActive === id ? null : id);
  }, []);

  // Update line styles on hover
  const updateConnectionLinesForHover = useCallback((hoveredId) => {
    if (!linesRef.current) return;
    
    const lines = linesRef.current.querySelectorAll('path');
    if (!lines.length) return;
 
    if (hoveredId === null) {
      // Reset all lines to base state
      lines.forEach(line => {
        try {
          line.setAttribute('stroke', 'rgba(200, 200, 200, 0.5)');
          line.setAttribute('stroke-width', '1');
        } catch (e) {}
      });
      return;
    }
 
    // First, reset all lines to base state
    lines.forEach(line => {
      try {
        line.setAttribute('stroke', 'rgba(200, 200, 200, 0.5)');
        line.setAttribute('stroke-width', '1');
      } catch (e) {}
    });
 
    // Then, highlight lines connected to the hovered node
    lines.forEach(line => {
      try {
        const fromId = line.getAttribute('data-from');
        const toId = line.getAttribute('data-to');
        if (fromId === hoveredId.toString() || toId === hoveredId.toString()) {
          line.setAttribute('stroke', 'rgba(200, 200, 200, 0.9)');
          line.setAttribute('stroke-width', '2');
        }
      } catch (e) {}
    });
  }, []);
 
  // Handle node hover
  const handleNodeHover = useCallback((id, isEntering) => {
    setHoveredNode(isEntering ? id : null);
    updateConnectionLinesForHover(isEntering ? id : null);
  }, [updateConnectionLinesForHover]);

  // Update zigzag line positions
  const updateLinePositions = useCallback(() => {
    if (!linesData.current.length) return;
    
    linesData.current.forEach(({ pathElement, fromId, toId }) => {
      if (!pathElement) return;
      
      const fromNode = nodeData.current.find(n => n && n.id === fromId);
      const toNode = nodeData.current.find(n => n && n.id === toId);
      if (!fromNode || !toNode) return;

      // Calculate path points
      const x1 = fromNode.x + fromNode.width / 2;
      const y1 = fromNode.y + fromNode.height / 2;
      const x2 = toNode.x + toNode.width / 2;
      const y2 = toNode.y + toNode.height / 2;
      
      // Create zigzag path
      const midY = (y1 + y2) / 2;
      
      const path = `M ${x1} ${y1} V ${midY} H ${x2} V ${y2}`;

      try {
        pathElement.setAttribute('d', path);
      } catch (e) {
        // Silent error handling
      }
    });
  }, []);

  // Draw zigzag connection lines between nodes
  const drawConnectionLines = useCallback(() => {
    if (!linesRef.current || nodeData.current.length < 2) return;

    console.log("Drawing zigzag connection lines between nodes...");

    // Clear existing lines
    try {
      while (linesRef.current && linesRef.current.firstChild) {
        linesRef.current.removeChild(linesRef.current.firstChild);
      }
    } catch (e) {
      console.warn('Error clearing SVG lines:', e);
    }
    
    linesData.current = [];

    // Sort nodes by chronological order
    const sortedNodeData = [...nodeData.current]
      .filter(Boolean)
      .sort((a, b) => a.index - b.index);

    // Create zigzag paths between nodes
    for (let i = 0; i < sortedNodeData.length - 1; i++) {
      const currentNode = sortedNodeData[i];
      const nextNode = sortedNodeData[i + 1];
      if (!currentNode || !nextNode) continue;

      try {
        // Create a path element for zigzag lines
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('vector-effect', 'non-scaling-stroke');
        path.setAttribute('stroke', 'rgba(200, 200, 200, 0.3)');
        path.setAttribute('stroke-width', '1');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-dasharray', '4,4');
        path.setAttribute('data-from', currentNode.id);
        path.setAttribute('data-to', nextNode.id);
        path.setAttribute('style', 'pointer-events: none; visibility: visible;');

        // Calculate path points
        const x1 = currentNode.x + currentNode.width / 2;
        const y1 = currentNode.y + currentNode.height / 2;
        const x2 = nextNode.x + nextNode.width / 2;
        const y2 = nextNode.y + nextNode.height / 2;
        
        // Create zigzag path
        const midY = (y1 + y2) / 2;
        const path_d = `M ${x1} ${y1} V ${midY} H ${x2} V ${y2}`;
        
        path.setAttribute('d', path_d);

        if (linesRef.current) {
          linesRef.current.appendChild(path);
          linesData.current.push({
            pathElement: path,
            fromId: currentNode.id,
            toId: nextNode.id
          });
        }
      } catch (e) {
        console.warn('Error creating zigzag path:', e);
      }
    }

    console.log(`Created ${linesData.current.length} zigzag connection lines`);
  }, []);

  // Check if two rectangles overlap (for collision detection)
  const checkRectangleOverlap = useCallback((rectA, rectB) => {
    return (
      rectA.x < rectB.x + rectB.width &&
      rectA.x + rectA.width > rectB.x &&
      rectA.y < rectB.y + rectB.height &&
      rectA.y + rectA.height > rectB.y
    );
  }, []);

  // Directly update DOM for animations without going through React state
  const updateNodePositionsInDOM = useCallback(() => {
    nodeData.current.forEach(node => {
      if (!node) return;
      
      const nodeElement = document.getElementById(`career-node-${node.id}`);
      if (!nodeElement) return;

      try {
        nodeElement.style.left = `${node.x}px`;
        nodeElement.style.top = `${node.y}px`;
      } catch (e) {
        console.warn("Error updating node position:", e);
      }
    });
  }, []);

  // Floating animation with collision detection
  const startFloatingAnimation = useCallback(() => {
    let frameCount = 0;
    console.log("Starting floating animation...");
    
    const animate = () => {
      if (!containerRef.current) {
        console.log("Container not available, stopping animation");
        return;
      }

      frameCount++;
      if (frameCount % 100 === 0) {
        console.log(`Animation running: frame ${frameCount}`);
      }

      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      // Update positions based on velocities
      nodeData.current.forEach(node => {
        if (!node) return;

        node.x += node.vx;
        node.y += node.vy;

        // Boundary detection
        if (node.x < 0) {
          node.x = 0;
          node.vx = Math.abs(node.vx) * 0.9;
        } else if (node.x > containerWidth - node.width) {
          node.x = containerWidth - node.width;
          node.vx = -Math.abs(node.vx) * 0.9;
        }
        if (node.y < 0) {
          node.y = 0;
          node.vy = Math.abs(node.vy) * 0.9;
        } else if (node.y > containerHeight - node.height) {
          node.y = containerHeight - node.height;
          node.vy = -Math.abs(node.vy) * 0.9;
        }

        // Random forces for natural movement
        node.vx += (Math.random() - 0.5) * 0.02;
        node.vy += (Math.random() - 0.5) * 0.02;

        // Drag
        node.vx *= 0.997;
        node.vy *= 0.997;

        // Limit max speed
        const maxSpeed = 0.8;
        const currentSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (currentSpeed > maxSpeed) {
          node.vx = (node.vx / currentSpeed) * maxSpeed;
          node.vy = (node.vy / currentSpeed) * maxSpeed;
        }
      });

      // Handle collisions
      for (let i = 0; i < nodeData.current.length; i++) {
        for (let j = i + 1; j < nodeData.current.length; j++) {
          const nodeA = nodeData.current[i];
          const nodeB = nodeData.current[j];
          if (!nodeA || !nodeB) continue;

          if (checkRectangleOverlap(nodeA, nodeB)) {
            const centerAX = nodeA.x + nodeA.width / 2;
            const centerAY = nodeA.y + nodeA.height / 2;
            const centerBX = nodeB.x + nodeB.width / 2;
            const centerBY = nodeB.y + nodeB.height / 2;

            const dx = centerBX - centerAX;
            const dy = centerBY - centerAY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance === 0) continue; // Avoid division by zero

            const nx = dx / distance;
            const ny = dy / distance;

            const relVelocityX = nodeB.vx - nodeA.vx;
            const relVelocityY = nodeB.vy - nodeA.vy;
            const velocityAlongNormal = relVelocityX * nx + relVelocityY * ny;
            if (velocityAlongNormal > 0) continue;

            const restitution = 0.3;
            const impulseScalar =
              -(1 + restitution) * velocityAlongNormal /
              (1 / nodeA.mass + 1 / nodeB.mass);

            const impulseX = impulseScalar * nx;
            const impulseY = impulseScalar * ny;

            nodeA.vx -= impulseX / nodeA.mass;
            nodeA.vy -= impulseY / nodeA.mass;
            nodeB.vx += impulseX / nodeB.mass;
            nodeB.vy += impulseY / nodeB.mass;

            // Positional correction
            const percent = 0.8;
            const correction = Math.max(0.01, 0.05);
            const correctionX = nx * correction * percent;
            const correctionY = ny * correction * percent;

            nodeA.x -= correctionX;
            nodeA.y -= correctionY;
            nodeB.x += correctionX;
            nodeB.y += correctionY;
          }
        }
      }

      // Apply new positions to DOM
      updateNodePositionsInDOM();

      // Update line positions
      updateLinePositions();

      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation loop
    animationRef.current = requestAnimationFrame(animate);
    
    // Return cleanup function
    return () => {
      console.log("Cleaning up animation");
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [updateLinePositions, checkRectangleOverlap, updateNodePositionsInDOM]);

  // Initialize node positions and start animation
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Ensure we initialize only once
    if (initialized.current) return;
    
    console.log("Initializing CareerPath component...");
    
    // Set container height based on number of nodes
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = Math.max(
      window.innerHeight,
      50 + sortedNodes.length * 200 + 50
    );
    containerRef.current.style.height = `${containerHeight}px`;

    // Node dimensions
    const nodeWidth = 340;
    const nodeHeight = 180;
    
    // Calculate available width for positioning with more spread
    const availableWidth = containerWidth - nodeWidth - 40;

    // Initialize node data with consistent positions
    const initialPositions = {};
    
    // Wait for DOM to be ready
    setTimeout(() => {
      nodeData.current = sortedNodes.map((node, index) => {
        // Vertical position: evenly spaced without random variance
        const verticalPosition = 50 + index * 220; // Increased vertical spacing

        // Horizontal position: alternate between left and right sides with more spread
        let horizontalPosition;
        if (index % 2 === 0) {
          // Left side - 10% from left edge (more to the left)
          horizontalPosition = 0.1 * availableWidth;
        } else {
          // Right side - 80% from left edge (more to the right)
          horizontalPosition = 0.8 * availableWidth;
        }

        // Make sure we don't go off screen
        horizontalPosition = Math.max(
          0,
          Math.min(containerWidth - nodeWidth, horizontalPosition)
        );

        // Store initial position
        initialPositions[node.id] = { x: horizontalPosition, y: verticalPosition };

        // Set initial velocity based on position (nodes will move away from their starting side)
        // Left side nodes move right, right side nodes move left
        const directionMultiplier = index % 2 === 0 ? 1 : -1;
        const vx = 0.2 * directionMultiplier;
        const vy = 0.1; // Small downward drift

        // Return node data object
        return {
          id: node.id,
          index: index,
          x: horizontalPosition,
          y: verticalPosition,
          width: nodeWidth,
          height: nodeHeight,
          vx,
          vy,
          mass: 1 + Math.sin(index) * 0.2
        };
      });

      // Update positions state to trigger render with initial positions
      setPositions(initialPositions);

      console.log(`Initialized ${nodeData.current.length} nodes`);

      // Create SVG for lines (below nodes)
      if (!linesRef.current && containerRef.current) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '0'; // behind the floating nodes
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.style.display = 'block';
        svg.style.backgroundColor = 'transparent';
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttribute('aria-hidden', 'true');
        svg.style.overflow = 'visible';
        containerRef.current.appendChild(svg);
        linesRef.current = svg;
        
        console.log("Created SVG container for lines");
      }

      // Draw lines after a short delay to ensure DOM is ready
      setTimeout(() => {
        drawConnectionLines();
        
        // Start animation with a small delay
        setTimeout(() => {
          startFloatingAnimation();
        }, 200);
      }, 100);
    }, 100);

    // Mark as initialized
    initialized.current = true;

    // Cleanup function
    return () => {
      // Clean up animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      // Remove SVG element
      if (linesRef.current && container && container.contains(linesRef.current)) {
        try {
          container.removeChild(linesRef.current);
        } catch (e) {
          console.warn("Could not remove SVG element:", e);
        }
      }
      linesRef.current = null;
    };
  }, [sortedNodes, drawConnectionLines, startFloatingAnimation]);

  // Intersection Observer for fade-in effect
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

    // Wait for DOM to be ready
    const timeoutId = setTimeout(() => {
      const nodes = document.querySelectorAll('.career-node');
      nodes.forEach(node => {
        observer.observe(node);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
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
            const isActive = activeNode === node.id;
            const nodeColor = getNodeColor(index, isHovered);
            const companyColor = gradientColors[index % gradientColors.length].replace('0.85', '1');
            
            // Get position from state
            const position = positions[node.id] || { x: 0, y: 0 };

            return (
              <div
                key={node.id}
                id={`career-node-${node.id}`}
                className={`career-node ${isActive ? 'active' : ''}`}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => handleNodeHover(node.id, true)}
                onMouseLeave={() => handleNodeHover(node.id, false)}
                style={{
                  position: 'absolute',
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  transition: 'box-shadow 0.3s ease',
                  zIndex: isActive
                    ? Z_INDEX.ACTIVE
                    : isHovered
                    ? Z_INDEX.HOVER
                    : Z_INDEX.BASE
                }}
              >
                <div className="node-content">
                  <h3 className="node-title">{node.title}</h3>
                  <div className="node-aura" style={{ backgroundColor: nodeColor }}></div>
                  <h4 className="node-organization" style={{ color: companyColor }}>
                    {node.organization}
                  </h4>
                  <p className="node-date">{node.date}</p>
                  <p className="node-description">{node.description}</p>
                  <div className="node-details">
                    <div className="skills">
                      {node.skills.map((skill) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
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