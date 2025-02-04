
const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const trackContainer = new PIXI.Container();
app.stage.addChild(trackContainer);

function drawTrack(trackData) {
    console.log("Drawing track...");
    trackContainer.removeChildren();
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(5, 0xffffff);
    
    let x = 400, y = 300;
    let angle = 0;
    graphics.moveTo(x, y);

    trackData.track.connections.forEach(segment => {
        console.log("Processing segment:", segment);
        if (segment.type === "straight") {
            x += Math.cos(angle) * segment.length;
            y += Math.sin(angle) * segment.length;
            graphics.lineTo(x, y);
        } else if (segment.type === "curved") {
            const curveRadius = segment.radius;
            const arcCenterX = x + Math.cos(angle + Math.PI / 2) * curveRadius;
            const arcCenterY = y + Math.sin(angle + Math.PI / 2) * curveRadius;
            graphics.arc(arcCenterX, arcCenterY, curveRadius, angle, angle + Math.PI / 2);
            angle += Math.PI / 2;
            x = arcCenterX + Math.cos(angle) * curveRadius;
            y = arcCenterY + Math.sin(angle) * curveRadius;
        } else {
            console.error("Unknown segment type:", segment.type);
        }
    });
    
    trackContainer.addChild(graphics);
}

async function loadTrackData() {
    try {
        console.log("Fetching track data...");
        const response = await fetch('/static/connections.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Track data loaded:", data);
        drawTrack(data);
    } catch (error) {
        console.error("Error loading track data:", error);
    }
}

loadTrackData();
