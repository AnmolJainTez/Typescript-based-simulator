const trackConfig = {
  initialPositionX: -500,
  initialPositionY: 0,
  radius: 225.0,
  straightLength: 250.0,
  connections: [
      { from: "S1-M-Q1", to: "S2-M-Q1", type: "curved", radius: 225.0, direction: "northeast" },
      { from: "S2-M-Q1", to: "S3-M-Q1", type: "straight", length: 250.0, direction: "east" },
      { from: "S3-M-Q1", to: "S4-M-Q1", type: "straight", length: 250.0, direction: "east" },
      { from: "S4-M-Q1", to: "S5-M-Q1", type: "curved", radius: 225.0, direction: "southeast" },
      { from: "S5-M-Q1", to: "S6-M-Q1", type: "curved", radius: 225.0, direction: "southwest" },
      { from: "S6-M-Q1", to: "S7-M-Q1", type: "straight", length: 250.0, direction: "west" },
      { from: "S7-M-Q1", to: "S8-M-Q1", type: "straight", length: 250.0, direction: "west" },
      { from: "S8-M-Q1", to: "S1-M-Q1", type: "curved", radius: 225.0, direction: "northwest" }
  ]
};

const container = document.getElementById('track-container');
let posX = trackConfig.initialPositionX;
let posY = trackConfig.initialPositionY;

trackConfig.connections.forEach((segment, index) => {
  const img = document.createElement('img');
  img.classList.add('track');
  img.src = segment.type === 'curved' ? './../images/curved_250_200.png' : 'straight_250_50.jpg';
  img.style.left = `${posX}px`;
  img.style.top = `${posY}px`;

  // Adjusting the rotation based on direction
  switch(segment.direction) {
      case 'northeast':
      case 'northwest':
      case 'southeast':
      case 'southwest':
          img.style.transform = `rotate(${directionToAngle(segment.direction)}deg)`;
          break;
      case 'east':
      case 'west':
          img.style.transform = `rotate(${directionToAngle(segment.direction)}deg)`;
          break;
  }

  container.appendChild(img);

  // Calculate next position
  switch(segment.direction) {
      case 'east':
          posX += segment.length;
          break;
      case 'west':
          posX -= segment.length;
          break;
      case 'northeast':
      case 'southeast':
          posX += Math.cos(Math.PI / 4) * segment.radius; // Adjust calculation for curved
          posY += Math.sin(Math.PI / 4) * segment.radius; // segments
          break;
      case 'northwest':
      case 'southwest':
          posX -= Math.cos(Math.PI / 4) * segment.radius;
          posY -= Math.sin(Math.PI / 4) * segment.radius;
          break;
  }
});

function directionToAngle(direction) {
  switch (direction) {
      case 'east': return 0;
      case 'northeast': return 45;
      case 'southeast': return 135;
      case 'south': return 180;
      case 'southwest': return 225;
      case 'west': return 270;
      case 'northwest': return 315;
      default: return 0;
  }
}
