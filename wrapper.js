

function findSegmentByIndex(idxNumber) {
    for (let i = 0; i < trackCoordinateSystem.segmentCoordinates.length; i++) {
        let segment = trackCoordinateSystem.segmentCoordinates[i];
        // console.log("Checking segment:", segment);
        if (idxNumber >= segment.coordinateStartIdx && idxNumber <= segment.coordinateEndIdx) {
            // console.log("Found segment:", segment);
            return segment;
        }
    }

    console.warn("No matching segment found for index:", idxNumber);
    return null;
}


function getCoordinateFromIndex(idxNumber, trackConfigDataInternal) {
    let segment = findSegmentByIndex(idxNumber);
    if (!segment) {
        console.error("Index out of range or segment not found");
        return null;
    }
    
    let trackSegment = trackData.trackSegments.find(s => s.segmentId === segment.segmentId);
    if (!trackSegment) {
        console.error("Segment data not found for segmentId:", segment.segmentId);
        return null;
    }

    // console.log("Found segment data:", trackSegment);    
    
    proportion = (idxNumber - segment.coordinateStartIdx) / (segment.coordinateEndIdx - segment.coordinateStartIdx);
    proportion_angle = proportion * 0.5 * Math.PI;
    // console.log("Proportion:", proportion);

    s = extractSegmentData();

    let matchingSegment = s[trackSegment.segmentId] || null;
    // console.log("Matching segment:", matchingSegment);  
    
    
    // Here you can define interpolation logic based on the segment type
    let relativeX = trackSegment.relativePositionX; // Example adjustment
    let relativeY = trackSegment.relativePositionY; // Example adjustment
    
    if (trackSegment.type === "curved") {
        // Adjust position based on direction
        if (matchingSegment.direction === "northeast") {
            relativeX = relativeX + (125) - (225*Math.cos(proportion_angle));
            relativeY = relativeY + (125) - (225*Math.sin(proportion_angle));
        } else if (matchingSegment.direction === "southeast") {
            relativeX = relativeX - (125) + (225*Math.sin(proportion_angle));
            relativeY = relativeY + (125) - (225*Math.cos(proportion_angle));
        } else if (matchingSegment.direction === "southwest") {
            relativeX = relativeX - (125) + (225*Math.cos(proportion_angle));
            relativeY = relativeY - (125) + (225*Math.sin(proportion_angle));
        } else if (matchingSegment.direction === "northwest") {
            relativeX = relativeX + (125) - (225*Math.cos(proportion_angle));
            relativeY = relativeY - (125) + (225*Math.sin(proportion_angle));
        } 
    } else if (trackSegment.type === "straight") {
        if (matchingSegment.direction === "east") {
            relativeX = relativeX - (125) + proportion * 250;
        } else if (matchingSegment.direction === "west") {
            relativeX = relativeX + (125) - proportion * 250;
        }
    }


    return {
        x: relativeX + trackData.originX,
        y: relativeY + trackData.originY,
        segmentId: segment.segmentId
    };
}

function drawLinesForStoppingPositions(app, stoppingPositions) {
    stoppingPositions.stoppingPositions.forEach(position => {
        let startCoord = getCoordinateFromIndex(position.coordinateStartIdx);
        let endCoord = getCoordinateFromIndex(position.coordinateEndIdx);
        console.log("Drawing line between:", startCoord, endCoord);

        const graphics_x = new PIXI.Graphics();
        graphics_x.lineStyle(20, 0x000000, 1); // Red line with width 2

        graphics_x.moveTo(startCoord.x, startCoord.y);
        graphics_x.lineTo(endCoord.x, endCoord.y);
        app.stage.addChild(graphics_x);

        for (let i = 0; i < trackCoordinateSystem.totalNrOfCoordinates; i += 100) {
            let dotCoord = getCoordinateFromIndex(i);
            if (dotCoord) {
                drawDot(app, dotCoord);
            }
        }

        console.log('Loading track data...', trackCoordinateSystem.totalNrOfCoordinates);

    });  
}

function drawDot(app, coord) {
    const dot = new PIXI.Graphics();
    dot.beginFill(0x0000ff); // Red color
    dot.drawCircle(coord.x, coord.y, 2); // Small circle (radius 5)
    dot.endFill();
    app.stage.addChild(dot);
}

function drawPurpleBallsForMovers(app, movers) {
    movers.movers.forEach(mover => {
        let coord = getCoordinateFromIndex(mover.startIndex);
        if (coord) {
            drawPurpleBall(app, coord);
        }
    });
}

function drawPurpleBall(app, coord) {
    const ball = new PIXI.Graphics();
    ball.beginFill(0x800080); // Purple color
    ball.drawCircle(coord.x, coord.y, 10); // Circle with radius 10
    ball.endFill();
    app.stage.addChild(ball);
}
