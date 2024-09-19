document.getElementById('calculateBtn').addEventListener('click', function() {
    const angles = document.getElementById('angles').value.split(',').map(a => parseFloat(a.trim()));
    const distances = document.getElementById('distances').value.split(',').map(d => parseFloat(d.trim()));
    const coordsA = document.getElementById('coordsA').value.split(',').map(c => parseFloat(c.trim()));
    const coordsB = document.getElementById('coordsB').value.split(',').map(c => parseFloat(c.trim()));

    if (angles.length < 2 || distances.length < 1 || coordsA.length !== 2 || coordsB.length !== 2) {
        alert('Please enter valid inputs.');
        return;
    }

    // Calculate bearings
    let bearings = angles.map((angle, index) => (index === 0 ? angle : (angle + angles[index - 1]) % 360));

    // Calculate latitudes and departures
    let latitudes = [];
    let departures = [];
    for (let i = 0; i < distances.length; i++) {
        const bearingRad = (bearings[i] * Math.PI) / 180;
        latitudes.push(distances[i] * Math.cos(bearingRad));
        departures.push(distances[i] * Math.sin(bearingRad));
    }

    // Calculate coordinates of stations
    const latA = coordsA[0];
    const lonA = coordsA[1];
    const latB = coordsB[0];
    const lonB = coordsB[1];

    let results = `<h3>Bearings:</h3><p>${bearings.join(', ')}</p>`;
    results += `<h3>Latitudes:</h3><p>${latitudes.join(', ')}</p>`;
    results += `<h3>Departures:</h3><p>${departures.join(', ')}</p>`;

    // Example calculation for new coordinates (assuming planar projection for simplicity)
    // In reality, you'd need to convert latitude/longitude to a Cartesian coordinate system for accurate results
    results += `<h3>New Coordinates:</h3><p>Station A: (${latA}, ${lonA})<br>Station B: (${latB}, ${lonB})</p>`;

    document.getElementById('results').innerHTML = results;
});
