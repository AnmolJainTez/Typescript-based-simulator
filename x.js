function extractSegmentData() {
    let segmentData = {}; // Store segment details with segmentId as keys

    trackConfigInternalxx.track.connections.forEach(segment => {
        segmentData[segment.from] = {
            connectionFrom : segment.from,
            connectionTo: segment.to,
            type: segment.type,
            direction: segment.direction,
            nrOfCoordinates: segment.nrOfCoordinates,
        };

        // If it's a straight segment, store its length
        if (segment.type === "straight") {
            segmentData[segment.from].length = segment.length;
        }

        // If it's a curved segment, store its radius
        if (segment.type === "curved") {
            segmentData[segment.from].radius = segment.radius;
        }
    });

    return segmentData;
}

// Sample JSON Data
const trackConfigInternalxx = {
    "track": {
        "initialPositionX": -500,
        "initialPositionY": 0,
        "radius": 225.0,
        "straightLength": 250.0,
        "connections": [
            {
                "from": "S1-M-Q1",
                "to": "S2-M-Q1",
                "type": "curved",
                "radius": 225.0,
                "direction": "northeast",
                "nrOfCoordinates": 500
            },
            {
                "from": "S2-M-Q1",
                "to": "S3-M-Q1",
                "type": "straight",
                "length": 250.0,
                "direction": "east",
                "nrOfCoordinates": 400
            },
            {
                "from": "S3-M-Q1",
                "to": "S4-M-Q1",
                "type": "straight",
                "length": 250.0,
                "direction": "east",
                "nrOfCoordinates": 400
            },
            {
                "from": "S4-M-Q1",
                "to": "S5-M-Q1",
                "type": "curved",
                "radius": 225.0,
                "direction": "southeast",
                "nrOfCoordinates": 500
            },
            {
                "from": "S5-M-Q1",
                "to": "S6-M-Q1",
                "type": "curved",
                "radius": 225.0,
                "direction": "southwest",
                "nrOfCoordinates": 500
            },
            {
                "from": "S6-M-Q1",
                "to": "S7-M-Q1",
                "type": "straight",
                "length": 250.0,
                "direction": "west",
                "nrOfCoordinates": 400
            },
            {
                "from": "S7-M-Q1",
                "to": "S8-M-Q1",
                "type": "straight",
                "length": 250.0,
                "direction": "west",
                "nrOfCoordinates": 400
            },
            {
                "from": "S8-M-Q1",
                "to": "S1-M-Q1",
                "type": "curved",
                "radius": 225.0,
                "direction": "northwest",
                "nrOfCoordinates": 500
            }
        ]
    }
}
