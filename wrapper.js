

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

    console.log("Found segment data:", trackSegment);
    
    proportion = (idxNumber - segment.coordinateStartIdx) / (segment.coordinateEndIdx - segment.coordinateStartIdx);

    // let matchingSegment = trackConfigDataInternal.track.connections.find(connection => 
    //     connection.from === trackSegment.segmentId
    // );
    // console.log("Matching segment:", trackConfigDataInternal);   
    
    
    // Here you can define interpolation logic based on the segment type
    let relativeX = trackSegment.relativePositionX; // Example adjustment
    let relativeY = trackSegment.relativePositionY; // Example adjustment
    
    if (trackSegment.type === "curved") {
        // Adjust position based on direction
        
    } else if (trackSegment.type === "straight") {
        if (trackSegment.direction === "east") {
            relativeX = relativeX - (125) + proportion * 250;
        } else if (trackSegment.direction === "west") {
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
        
        if (startCoord && endCoord) {
            console.log(`Drawing line from (${startCoord.x}, ${startCoord.y}) to (${endCoord.x}, ${endCoord.y})`);
            // Replace this with actual drawing logic using PIXI or canvas
        }
    });
}