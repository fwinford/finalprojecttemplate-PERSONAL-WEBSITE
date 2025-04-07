import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/careerpath.css';
import { getHighlightedExperiences } from '../data/ExperienceData';

const CareerPath = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const nodeRefs = useRef([]);
  const containerRef = useRef(null);
  const nodeData = useRef([]);
  const animationRef = useRef(null);
  const linesRef = useRef(null); // Reference to SVG element for lines
  const linesData = useRef([]);  // Stores array of { lineElement, fromId, toId }

  // Z-index values for different node states
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
      const year = parseInt(parts[1]);

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

  // Handle node click: just set activeNode in state
  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
  };

  // Handle node hover: just set hoveredNode in state and update lines
  const handleNodeHover = (id, isEntering) => {
    setHoveredNode(isEntering ? id : null);
    updateConnectionLinesForHover(isEntering ? id : null);
  };

  // Draw connection lines between chronological nodes (create once)
  const drawConnectionLines = useCallback(() => {
    if (!linesRef.current || nodeData.current.length < 2) return;

    // Clear existing lines from the SVG element
    while (linesRef.current.firstChild) {
      linesRef.current.removeChild(linesRef.current.firstChild);
    }
    linesData.current = [];

    // Sort nodes by chronological order (same as sortedNodes)
    const sortedNodeData = [...nodeData.current]
      .sort((a, b) => a.id - b.id)
      .filter(Boolean);

    // Create a line between each node and the next one
    for (let i = 0; i < sortedNodeData.length - 1; i++) {
      const currentNode = sortedNodeData[i];
      const nextNode = sortedNodeData[i + 1];
      if (!currentNode || !nextNode) continue;

      // Create a <line> in the SVG
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('stroke', 'rgba(200, 200, 200, 0.3)');
      line.setAttribute('stroke-width', '1');
      line.setAttribute('stroke-dasharray', '4,4');
      line.setAttribute('data-from', currentNode.id);
      line.setAttribute('data-to', nextNode.id);

      // Append to the SVG
      linesRef.current.appendChild(line);

      // Save the line element with its associated node IDs
      linesData.current.push({
        lineElement: line,
        fromId: currentNode.id,
        toId: nextNode.id
      });
    }
  }, []);

  // Update line endpoints so they follow the nodes
  const updateLinePositions = useCallback(() => {
    linesData.current.forEach(({ lineElement, fromId, toId }) => {
      const fromNode = nodeData.current.find(n => n.id === fromId);
      const toNode = nodeData.current.find(n => n.id === toId);
      if (!fromNode || !toNode) return;

      const x1 = fromNode.x + fromNode.width / 2;
      const y1 = fromNode.y + fromNode.height / 2;
      const x2 = toNode.x + toNode.width / 2;
      const y2 = toNode.y + toNode.height / 2;

      lineElement.setAttribute('x1', x1);
      lineElement.setAttribute('y1', y1);
      lineElement.setAttribute('x2', x2);
      lineElement.setAttribute('y2', y2);
    });
  }, []);

  const updateConnectionLinesForHover = (hoveredId) => {
    if (!linesRef.current) return;
    const lines = linesRef.current.querySelectorAll('line');

    if (hoveredId === null) {
      // Reset all lines to base state with a darker base opacity
      lines.forEach(line => {
        line.setAttribute('stroke', 'rgba(200, 200, 200, 0.5)');
        line.setAttribute('stroke-width', '1');
      });
      return;
    }

    // For hovered state: first, set all lines to the base state
    lines.forEach(line => {
      line.setAttribute('stroke', 'rgba(200, 200, 200, 0.5)');
      line.setAttribute('stroke-width', '1');
    });

    // Then, darken the two lines: the one starting at the hovered node and the next one
    lines.forEach(line => {
      const fromId = parseInt(line.getAttribute('data-from'), 10);
      if (fromId === hoveredId || fromId === hoveredId + 1) {
        line.setAttribute('stroke', 'rgba(200, 200, 200, 0.9)');
        line.setAttribute('stroke-width', '2');
      }
    });
  };

  // Check if two rectangles overlap (for collision detection)
  const checkRectangleOverlap = (rectA, rectB) => {
    return (
      rectA.x < rectB.x + rectB.width &&
      rectA.x + rectA.width > rectB.x &&
      rectA.y < rectB.y + rectB.height &&
      rectA.y + rectA.height > rectB.y
    );
  };

  // Floating animation (with collisions)
  const startFloatingAnimation = useCallback(() => {
    const animate = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      // Update positions based on velocities
      nodeData.current.forEach(node => {
        if (!node || !node.node) return;

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
      nodeData.current.forEach(node => {
        if (!node || !node.node) return;
        node.node.style.left = `${node.x}px`;
        node.node.style.top = `${node.y}px`;
      });

      // Update line endpoints so they follow the node movements
      updateLinePositions();

      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, [updateLinePositions]);

  // Initialize node positions, lines, and start animation
  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = Math.max(
      window.innerHeight,
      50 + sortedNodes.length * 200 + 50
    );
    containerRef.current.style.height = `${containerHeight}px`;

    const nodeWidth = 340;
    const nodeHeight = 180;
    const availableWidth = containerWidth - nodeWidth - 40;

    nodeData.current = nodeRefs.current.map((node, index) => {
      if (!node) return null;

      const verticalVariance = Math.random() * 60 - 30;
      const verticalPosition =
        index === 0
          ? 50 + verticalVariance
          : 50 + index * 200 + verticalVariance;

      let horizontalPosition;
      if (index % 2 === 0) {
        // Even indices - left-ish
        horizontalPosition = (0.05 + Math.random() * 0.3) * availableWidth;
      } else {
        // Odd indices - right-ish
        horizontalPosition = (0.65 + Math.random() * 0.3) * availableWidth;
      }

      horizontalPosition = Math.max(
        0,
        Math.min(containerWidth - nodeWidth, horizontalPosition)
      );

      node.style.left = `${horizontalPosition}px`;
      node.style.top = `${verticalPosition}px`;
      node.style.zIndex = Z_INDEX.BASE;

      const angle = (index * 2.5) % (2 * Math.PI);
      const speed = 0.4 + (index % 3) * 0.1;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      return {
        id: index,
        x: horizontalPosition,
        y: verticalPosition,
        width: nodeWidth,
        height: nodeHeight,
        vx,
        vy,
        mass: 1 + Math.sin(index) * 0.2,
        node
      };
    }).filter(Boolean);

    // Create SVG for lines (below nodes)
    if (!linesRef.current) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.style.position = 'absolute';
      svg.style.top = '0';
      svg.style.left = '0';
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.pointerEvents = 'none';
      svg.style.zIndex = '0'; // behind the floating nodes
      containerRef.current.appendChild(svg);
      linesRef.current = svg;
    }

    // Draw lines once at init
    drawConnectionLines();

    // Start animation
    startFloatingAnimation();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (linesRef.current && containerRef.current) {
        containerRef.current.removeChild(linesRef.current);
      }
    };
  }, [
    sortedNodes.length,
    Z_INDEX.BASE,
    drawConnectionLines,
    startFloatingAnimation
  ]);

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
            const isActive = activeNode === node.id;
            const nodeColor = getNodeColor(index, isHovered);
            const companyColor = gradientColors[index % gradientColors.length].replace('0.85', '1');

            return (
              <div
                key={node.id}
                ref={(el) => (nodeRefs.current[index] = el)}
                className={`career-node ${isActive ? 'active' : ''}`}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => handleNodeHover(node.id, true)}
                onMouseLeave={() => handleNodeHover(node.id, false)}
                style={{
                  position: 'absolute',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
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