function setupTrack(app, trackConfig) {
    console.log('Track configuration loaded:', trackConfig);

    let currentX = trackConfig.track.initialPositionX;
    let currentY = trackConfig.track.initialPositionY;
    console.log('Initial position:', currentX, currentY);

    // Preload all required images
    let imagesToLoad = new Set();
    trackConfig.track.connections.forEach(segment => {
        if (segment.type === "curved") {
            imagesToLoad.add('./images/curved_250_200.png');
        } else if (segment.type === "straight") {
            imagesToLoad.add('./images/straight_250_50.jpg');
        }
    });

    // Convert set to an array and add to loader
    imagesToLoad.forEach(imagePath => app.loader.add(imagePath));
    console.log('Images to load:', imagesToLoad);

    app.loader.load(() => {
        trackConfig.track.connections.forEach(segment => {
            let imageFile;
            let rotation = 0; // Default rotation in radians

            if (segment.type === "curved") {
                imageFile = './images/curved_250_200.png';
                switch (segment.direction) {
                    case 'northeast':
                        rotation = 0;
                        break;
                    case 'southeast':
                        rotation = Math.PI / 2;
                        break;
                    case 'southwest':
                        rotation = Math.PI;
                        break;
                    case 'northwest':
                        rotation = 1.5 * Math.PI;
                        break;
                }
            } else if (segment.type === "straight") {
                imageFile = './images/straight_250_50.jpg';
                if (segment.direction === 'east' || segment.direction === 'west') {
                    rotation = 0;
                }
            }

            if (segment.type === "curved" && segment.direction === "northeast") {
                currentX += 100;
                currentY -= 125;
            } else if (segment.type === "straight" && segment.direction === "east") {
                currentX += segment.length / 2;
                currentY += 0;
            } else if (segment.type === "straight" && segment.direction === "west") {
                currentX -= segment.length / 2;
                currentY += 0;
            } else if (segment.type === "curved" && segment.direction === "southeast") {
                currentX += 125;
                currentY += 100;
            } else if (segment.type === "curved" && segment.direction === "southwest") {
                currentX -= 100;
                currentY += 125;
            } else if (segment.type === "curved" && segment.direction === "northwest") {
                currentX -= 125;
                currentY -= 100;
            }

            // Add preloaded image to stage
            addSegmentImage(app, imageFile, currentX, currentY, rotation);

            // // Calculate new position
            if (segment.type === "curved" && segment.direction === "northeast") {
                currentX += 125;
                currentY -= 100;
            } else if (segment.type === "straight" && segment.direction === "east") {
                currentX += segment.length / 2;
            } else if (segment.type === "straight" && segment.direction === "west") {
                currentX -= segment.length / 2;
            } else if (segment.type === "curved" && segment.direction === "southeast") {
                currentX += 100;
                currentY += 125;
            } else if (segment.type === "curved" && segment.direction === "southwest") {
                currentX -= 125;
                currentY += 100;
            } else if (segment.type === "curved" && segment.direction === "northwest") {
                currentX -= 100;
                currentY -= 125;
            }
        });
    });
}

function addSegmentImage(app, imagePath, posX, posY, rotation) {
    console.log('Adding image:', imagePath, posX, posY, rotation);
    let segmentImage = new PIXI.Sprite(app.loader.resources[imagePath].texture);
    segmentImage.anchor.set(0.5);
    segmentImage.x = app.screen.width / 2 + posX;
    segmentImage.y = app.screen.height / 2 +posY;
    segmentImage.rotation = rotation;
    app.stage.addChild(segmentImage);
}
