// import { OutlineFilter } from 'pixi-filters';
// import { OutlineFilter } from "@pixi/filter-outline";

let trackData = {
    originX: 0 ,  // This will be updated dynamically
    originY: 0 ,  // This will be updated dynamically
    trackSegments: [] // Array to store all pushed current data
};

let trackCoordinateSystem = {
    startX: 0,
    startY: 0,
    totalNrOfCoordinates: 0,
    segmentCoordinates: []
};
let currentIdx = 0;

function getTrackData() {
    return trackData;
}

function setupTrack(app, trackConfig) {
    console.log('Track configuration loaded:', trackConfig);
    trackData.originX = app.screen.width / 2;
    trackData.originY = app.screen.height / 2;

    trackCoordinateSystem.startX = trackConfig.track.initialPositionX;
    trackCoordinateSystem.startY = trackConfig.track.initialPositionY;

    let currentX = trackConfig.track.initialPositionX;
    let currentY = trackConfig.track.initialPositionY;
    console.log('Initial position:', currentX, currentY);

    let imagesToLoad = new Set();
    trackConfig.track.connections.forEach(segment => {
        if (segment.type === "curved") {
            imagesToLoad.add('./images/curved_250_200.png');
        } else if (segment.type === "straight") {
            imagesToLoad.add('./images/straight_250_50.jpg');
        }
    });

    let loader = new PIXI.Loader(); // ✅ Correctly use a separate loader

    imagesToLoad.forEach(imagePath => loader.add(imagePath));
    // console.log('Images to load:', imagesToLoad);


    trackConfig.track.connections.forEach(segment => {
        let rotation = 0;

        if (segment.type === "curved") {
            switch (segment.direction) {
                case 'northeast': rotation = 0; break;
                case 'southeast': rotation = Math.PI / 2; break;
                case 'southwest': rotation = Math.PI; break;
                case 'northwest': rotation = 1.5 * Math.PI; break;
            }
        } else if (segment.type === "straight") {
            if (segment.direction === 'east' || segment.direction === 'west') {
                rotation = 0;
            }
        }

        // Adjust position based on direction
        if (segment.type === "curved" && segment.direction === "northeast") {
            currentX += 100; currentY -= 125;
        } else if (segment.type === "straight" && segment.direction === "east") {
            currentX += segment.length / 2;
        } else if (segment.type === "straight" && segment.direction === "west") {
            currentX -= segment.length / 2;
        } else if (segment.type === "curved" && segment.direction === "southeast") {
            currentX += 125; currentY += 100;
        } else if (segment.type === "curved" && segment.direction === "southwest") {
            currentX -= 100; currentY += 125;
        } else if (segment.type === "curved" && segment.direction === "northwest") {
            currentX -= 125; currentY -= 100;
        }

        trackData.trackSegments.push({
            segmentId: segment.from,
            connectionTo: segment.to,
            type: segment.type,
            relativePositionX: currentX,
            relativePositionY: currentY,
            rotation: rotation
        });

        trackCoordinateSystem.segmentCoordinates.push({
            segmentId: segment.from,
            connectionTo: segment.to,
            coordinateStartIdx: currentIdx,
            coordinateEndIdx: currentIdx + segment.nrOfCoordinates - 1
        });

        currentIdx += segment.nrOfCoordinates;
        trackCoordinateSystem.totalNrOfCoordinates = currentIdx;

        // Further position updates
        if (segment.type === "curved" && segment.direction === "northeast") {
            currentX += 125; currentY -= 100;
        } else if (segment.type === "straight" && segment.direction === "east") {
            currentX += segment.length / 2;
        } else if (segment.type === "straight" && segment.direction === "west") {
            currentX -= segment.length / 2;
        } else if (segment.type === "curved" && segment.direction === "southeast") {
            currentX += 100; currentY += 125;
        } else if (segment.type === "curved" && segment.direction === "southwest") {
            currentX -= 125; currentY += 100;
        } else if (segment.type === "curved" && segment.direction === "northwest") {
            currentX -= 100; currentY -= 125;
        }
    });

    loader.load(() => { // ✅ Using the correct loader
        trackConfig.track.connections.forEach(segment => {
            let imageFile;
            let rotation = 0;

            if (segment.type === "curved") {
                imageFile = './images/curved_250_200.png';
                switch (segment.direction) {
                    case 'northeast': rotation = 0; break;
                    case 'southeast': rotation = Math.PI / 2; break;
                    case 'southwest': rotation = Math.PI; break;
                    case 'northwest': rotation = 1.5 * Math.PI; break;
                }
            } else if (segment.type === "straight") {
                imageFile = './images/straight_250_50.jpg';
                if (segment.direction === 'east' || segment.direction === 'west') {
                    rotation = 0;
                }
            }

            // Adjust position based on direction
            if (segment.type === "curved" && segment.direction === "northeast") {
                currentX += 100; currentY -= 125;
            } else if (segment.type === "straight" && segment.direction === "east") {
                currentX += segment.length / 2;
            } else if (segment.type === "straight" && segment.direction === "west") {
                currentX -= segment.length / 2;
            } else if (segment.type === "curved" && segment.direction === "southeast") {
                currentX += 125; currentY += 100;
            } else if (segment.type === "curved" && segment.direction === "southwest") {
                currentX -= 100; currentY += 125;
            } else if (segment.type === "curved" && segment.direction === "northwest") {
                currentX -= 125; currentY -= 100;
            }

            // ✅ Pass `loader.resources` instead of `app.loader.resources`
            addSegmentImage(app, loader.resources, imageFile, currentX, currentY, rotation);

            // Further position updates
            if (segment.type === "curved" && segment.direction === "northeast") {
                currentX += 125; currentY -= 100;
            } else if (segment.type === "straight" && segment.direction === "east") {
                currentX += segment.length / 2;
            } else if (segment.type === "straight" && segment.direction === "west") {
                currentX -= segment.length / 2;
            } else if (segment.type === "curved" && segment.direction === "southeast") {
                currentX += 100; currentY += 125;
            } else if (segment.type === "curved" && segment.direction === "southwest") {
                currentX -= 125; currentY += 100;
            } else if (segment.type === "curved" && segment.direction === "northwest") {
                currentX -= 100; currentY -= 125;
            }
        });
    });
}

function addSegmentImage(app, resources, imagePath, posX, posY, rotation) {
    // console.log('Adding image:', imagePath, posX, posY, rotation);
    let segmentImage = new PIXI.Sprite(resources[imagePath].texture); // ✅ Use correct resource reference
    segmentImage.anchor.set(0.5);
    segmentImage.x = app.screen.width / 2 + posX;
    segmentImage.y = app.screen.height / 2 + posY;
    segmentImage.rotation = rotation;
    if (PIXI.filters && PIXI.filters.OutlineFilter) {
        let outlineFilter = new PIXI.filters.OutlineFilter(1, 0xff0000);
        segmentImage.filters = [outlineFilter];
    } else {
        console.error("OutlineFilter is not available. Check pixi-filters.js loading.");
    }

    app.stage.addChild(segmentImage);
}
