function setupTrack(app, trackConfig) {
    let currentX = trackConfig.initialPositionX;
    let currentY = trackConfig.initialPositionY;

    trackConfig.connections.forEach(segment => {
        let imageFile;
        let rotation = 0; // Default rotation in radians

        // Determine the image file and rotation based on the segment type and direction
        if (segment.type === "curved") {
            imageFile = './images/curved_' + segment.radius + '.jpg';
            switch (segment.direction) {
                case 'northeast':
                    rotation = 0; // Assuming 0 radians for northeast
                    break;
                case 'southeast':
                    rotation = Math.PI / 2; // Rotate 90 degrees
                    break;
                case 'southwest':
                    rotation = Math.PI; // Rotate 180 degrees
                    break;
                case 'northwest':
                    rotation = 1.5 * Math.PI; // Rotate 270 degrees
                    break;
            }
        } else if (segment.type === "straight") {
            imageFile = './images/straight_' + segment.length + '.jpg';
            if (segment.direction === 'east' || segment.direction === 'west') {
                rotation = (segment.direction === 'east') ? 0 : Math.PI; // Rotate 180 degrees if west
            }
        }

        // Load and position the image
        addSegmentImage(app, imageFile, currentX, currentY, rotation);
        
        // Calculate the new position based on the direction and type
        if (segment.type === "curved") {
            // Just an example, actual calculation depends on how you want to position these
            currentX += segment.radius * Math.cos(rotation);
            currentY += segment.radius * Math.sin(rotation);
        } else if (segment.type === "straight") {
            currentX += segment.length * Math.cos(rotation);
            currentY += segment.length * Math.sin(rotation);
        }
    });
}

function addSegmentImage(app, imagePath, posX, posY, rotation) {
    app.loader.add(imagePath).load(() => {
        let segmentImage = new PIXI.Sprite(app.loader.resources[imagePath].texture);
        segmentImage.anchor.set(0.5);
        segmentImage.x = posX;
        segmentImage.y = posY;
        segmentImage.rotation = rotation;
        app.stage.addChild(segmentImage);
    });
}
