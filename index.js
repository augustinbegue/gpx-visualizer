window.onload = function () {
  const dropbox = document.getElementById("dropbox");

  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", drop, false);

  const fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("ride");

  fileSelect.addEventListener(
    "click",
    function (e) {
      if (fileElem) {
        fileElem.click();
      }
      e.preventDefault();
    },
    false
  );
};

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;

  loadFile(files);
}

function loadFile(files) {
  const gpxFile = files[0];
  const fileInfo = document.getElementsByClassName("file-info")[0];

  fileInfo.innerHTML = `Name: ${gpxFile.name} | Size: ${returnFileSize(gpxFile.size)}`;

  fr = new FileReader();
  fr.onload = function () {
    processFile(fr.result);
  };
  fr.readAsText(gpxFile);
}

function processFile(xmlStr) {
  const gpxData = parseXml(xmlStr);

  const speedData = computeSpeed(gpxData);
  console.log(speedData);

  const speedDataHighlights = computeHighlights(speedData);
  console.log(speedDataHighlights);

  printHighlights(gpxData, speedDataHighlights);

  const map = generateMap(gpxData, speedData, speedDataHighlights);

  addControls(map);

  initVisualisation(map, speedData, speedDataHighlights);
}

function formatTime(totalTime) {
  let hours = Math.floor(totalTime);
  let minutes = Math.floor((totalTime - hours) * 60);
  let seconds = Math.floor(((totalTime - hours) * 60 - minutes) * 60);
  return {
    hours,
    minutes,
    seconds,
  };
}

function computeSpeed(gpxData) {
  const result = [];

  for (let i = 0; i < gpxData.segments.length; i++) {
    const segment = gpxData.segments[i];

    for (let j = 1; j < segment.length; j++) {
      const locData1 = segment[j - 1];
      const locData2 = segment[j];

      const d = getSegDistance(locData1.loc[0], locData1.loc[1], locData2.loc[0], locData2.loc[1], locData1.ele, locData2.ele);

      const seg = getSegSpeed(d, locData1.time, locData2.time);

      result.push({
        computed: seg,
        loc1: locData1,
        loc2: locData2,
      });
    }
  }

  return result;
}

function getSegDistance(lat1, lon1, lat2, lon2, ele1, ele2) {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // in metres

  Δh = ele2 - ele1;

  if (Δh != 0) {
    d = Math.sqrt(Math.pow(d, 2) + Math.pow(Δh, 2));
  }

  return parseInt(d);
}

function getSegSpeed(d, time1, time2) {
  const Δt = time2 / 1000 - time1 / 1000; // Time in seconds
  const v = d / Δt; // Speed in m.s-1
  const kph = v * 3.6; // Speed in km.h-1

  return {
    speed: parseInt(kph),
    time: parseInt(Δt),
    distance: parseInt(d),
  };
}

function computeHighlights(result) {
  let totalTime = 0,
    movingTime = 0,
    distance = 0,
    avgSpeed = 0,
    avgMovingSpeed = 0,
    maxSpeed = 0,
    maxSpeedIndex = 0;

  for (let i = 0; i < result.length; i++) {
    const seg = result[i].computed;

    if (isNaN(seg.time) || isNaN(seg.speed) || isNaN(seg.distance)) continue;

    distance += seg.distance;

    totalTime += seg.time;
    avgSpeed += seg.speed * seg.time;

    if (seg.speed > 5) {
      avgMovingSpeed += seg.speed * seg.time;
      movingTime += seg.time;
    }

    let j,
      maxAvg = 0,
      maxAvgTime = 0;
    for (j = i - 5; j <= i + 5; j++) {
      let tempseg;

      if (!result[j]) break;

      tempseg = result[j].computed;
      maxAvg += tempseg.speed * tempseg.time;
      maxAvgTime += tempseg.time;
    }

    let newMaxSpeed = maxAvg / maxAvgTime;

    if (newMaxSpeed > maxSpeed && !isNaN(newMaxSpeed)) {
      maxSpeed = newMaxSpeed;
      maxSpeedIndex = i;
    }
  }

  avgSpeed /= totalTime;
  avgMovingSpeed /= movingTime;
  totalTime /= 3600;
  movingTime /= 3600;

  return {
    totalTime,
    movingTime,
    distance,
    avgSpeed,
    avgMovingSpeed,
    maxSpeed,
    maxSpeedIndex,
  };
}

function printHighlights(gpxData, speedDataHighlights) {
  document.getElementById("gpx").style.display = "block";
  document.getElementById("gpxName").innerHTML = gpxData.name;
  document.getElementById("gpxSegs").innerHTML = gpxData.segments.length;

  let time = formatTime(speedDataHighlights.totalTime);
  document.getElementById("totalTime").innerHTML = `${time.hours}h ${time.minutes}m ${time.seconds}s`;

  time = formatTime(speedDataHighlights.movingTime);
  document.getElementById("movingTime").innerHTML = `${time.hours}h ${time.minutes}m ${time.seconds}s`;

  document.getElementById("distance").innerHTML = speedDataHighlights.distance / 1000 + " km";

  document.getElementById("avgSpeed").innerHTML = Math.round(speedDataHighlights.avgSpeed * 100) / 100 + " km/h";

  document.getElementById("avgMovingSpeed").innerHTML = Math.round(speedDataHighlights.avgMovingSpeed * 100) / 100 + " km/h";

  document.getElementById("maxSpeed").innerHTML = Math.round(speedDataHighlights.maxSpeed * 100) / 100 + " km/h";
}

function generateMap(gpxData, speedData, speedDataHighlights) {
  const map = initMap(); // Set map to use openstreetmap data

  // Define and place highlights markers
  placeMarkers(map, gpxData, speedData, speedDataHighlights);

  // Trace ride path from LatLng points
  drawPath(gpxData, map);

  return map;
}

function initMap() {
  document.getElementById('mapBox').style.display = "block";
  document.getElementById('mapContainer').innerHTML = '<div id="rideMap"></div>';

  const map = L.map("rideMap");
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: "mapbox/outdoors-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoidGFndWVvIiwiYSI6ImNrZGJsaXJsMjAxbTEyenFxdmVkYzlnd2wifQ.SiWFEZcc5ekqRDlfp7HzSg",
  }).addTo(map); // Set map to use openstreetmap data

  return map;
}

function drawPath(gpxData, map) {
  let latlngs = [];
  for (let i = 0; i < gpxData.segments.length; i++) {
    const segment = gpxData.segments[i];

    for (let j = 1; j < segment.length; j++) {
      const locData = segment[j];

      latlngs.push(locData.loc);
    }
  }

  const ridePath = L.polyline(latlngs, {
    color: "hsl(348, 86%, 61%)",
  }).addTo(map);
  // zoom the map to the path
  map.fitBounds(ridePath.getBounds());
}

function placeMarkers(map, gpxData, speedData, speedDataHighlights) {
  const startPoint = gpxData.segments[0][0].loc;
  const endPoint = gpxData.segments[gpxData.segments.length - 1][gpxData.segments[gpxData.segments.length - 1].length - 1].loc;
  const maxSpeedPoint = speedData[speedDataHighlights.maxSpeedIndex].loc1.loc;

  const gpxMarker = L.icon({
    iconUrl: 'assets/map-marker-alt-solid.svg',

    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 30], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
  });
  
  const startMarker = L.marker(startPoint, {icon: gpxMarker}).addTo(map).bindPopup("<b>Start</b>");

  const endMarker = L.marker(endPoint, {icon: gpxMarker}).addTo(map).bindPopup("<b>Finish</b>");

  const maxSpeedMarker = L.marker(maxSpeedPoint, {icon: gpxMarker})
    .addTo(map)
    .bindPopup("<b>Max Speed</b><br>" + Math.round(speedDataHighlights.maxSpeed * 100) / 100 + " km/h");
}

function addControls(map) {
  addSpeedControl(map);
  
  addElevationControl(map);
}

function addElevationControl(map) {
  L.Control.ElevationControl = L.Control.extend({
    onAdd: function (map) {
      let elevationContainer = L.DomUtil.create('div', 'elevation');

      let elevationText = L.DomUtil.create('span', 'elevation-text', elevationContainer);
      let elevationLegend = L.DomUtil.create('span', 'elevation-legend', elevationContainer);

      elevationText.innerText = "0";
      elevationLegend.innerText = "m";
      elevationText.id = "elevation";

      return elevationContainer;
    },

    onRemove: function (map) {
      // Nothing to do here
    }
  });

  L.control.elevationControl = function (opts) {
    return new L.Control.ElevationControl(opts);
  };

  L.control.elevationControl({ position: 'bottomright' }).addTo(map);
}

function addSpeedControl(map) {
  L.Control.SpeedControl = L.Control.extend({
    onAdd: function (map) {
      let speedometerContainer = L.DomUtil.create('div', 'speedometer');

      let speedometerText = L.DomUtil.create('span', 'speedometer-text', speedometerContainer);
      let speedometerLegend = L.DomUtil.create('span', 'speedometer-legend heading', speedometerContainer);

      speedometerText.innerText = "0";
      speedometerLegend.innerText = "km/h";
      speedometerText.id = "speedometer";

      return speedometerContainer;
    },

    onRemove: function (map) {
      // Nothing to do here
    }
  });

  L.control.speedControl = function (opts) {
    return new L.Control.SpeedControl(opts);
  };

  L.control.speedControl({ position: 'bottomleft' }).addTo(map);
}

function initVisualisation(map, speedData, speedDataHighlights) {
  const startButton = document.getElementById("startVisualisation");
  startButton.addEventListener("click", function(e) {
    startVisualisation(map, speedData, speedDataHighlights);
  })
}

function startVisualisation(map, speedData) {
  let i = 1;
  const speedSelector = document.getElementById("speedSelector")
  let animationSpeed = speedSelector.options[speedSelector.selectedIndex].value;
  const centerCursor = document.getElementById("centerCursor")
  centerCursor.style.display = 'block';

  map.setView(speedData[0].loc1.loc, 16, {animate: false});

  function animate() {
    animationSpeed = speedSelector.options[speedSelector.selectedIndex].value;
    const e = speedData[i];
    if (!e) {
      return;
    }
  
    map.panTo(e.loc2.loc, {animate: true, duration: e.computed.time / animationSpeed, noMoveStart: true, easeLinearity: 1});
    i++;

    displayLiveSpeed(Math.round(e.computed.speed), e.computed.time, animationSpeed);

    displayLiveElevation(Math.round(e.loc2.ele), e.computed.time, animationSpeed)
  
    let timeout = (e.computed.time * 1000) / animationSpeed;
  
    console.log(timeout);
  
    setTimeout(animate, timeout);
  }

  setTimeout(animate, (speedData[0].computed.time * 1000) / animationSpeed);
}

function displayLiveElevation(computedElevation, duration, animationSpeed) {
  const elevationSpan = document.getElementById("elevation");

  if (duration > (0.2 / animationSpeed)) {
    elevationSpan.innerHTML = computedElevation;
  }
}

function displayLiveSpeed(computedSpeed, duration, animationSpeed) {
  const liveSpeedSpan = document.getElementById("speedometer");
  const currentSpeed = liveSpeedSpan.innerText;
  let sign, difference;

  if (currentSpeed > computedSpeed) {
    sign = -1;
    difference = currentSpeed - computedSpeed;
  } else {
    sign = 1;
    difference = computedSpeed - currentSpeed;
  }

  if (difference === 0) {
    return;
  }

  if (duration > (0.2 / animationSpeed)) {
    if (animationSpeed > 10 || difference < 2) {
      return liveSpeedSpan.innerHTML = computedSpeed;
    }

    // Smooth speed display is animation speed is slower than 10 or difference higher than 1
    let interval = setInterval(
      function(){
        let displayedSpeed = parseInt(liveSpeedSpan.innerText);
        
        if (displayedSpeed === computedSpeed || displayedSpeed < 0) {
          liveSpeedSpan.innerHTML = computedSpeed;
          clearInterval(interval);
        }

        if (sign > 0) {
          displayedSpeed++;
        } else {
          displayedSpeed--;
        }

        liveSpeedSpan.innerHTML = displayedSpeed;
      },
      (((duration - 0.5) / animationSpeed ) / difference) * 1000);
  }  
}

function parseXml(xmlstr) {
  const doc = new DOMParser().parseFromString(xmlstr, "text/xml");
  return parseGpxData(doc.documentElement);
}

function parseGpxData(node, result) {
  if (!result)
    result = {
      segments: [],
    };

  switch (node.nodeName) {
    case "name":
      result.name = node.textContent;
      break;

    case "trkseg":
      let segment = [];
      result.segments.push(segment);
      for (let i = 0; i < node.childNodes.length; i++) {
        let snode = node.childNodes[i];
        if (snode.nodeName == "trkpt") {
          let trkpt = {
            loc: [parseFloat(snode.attributes["lat"].value), parseFloat(snode.attributes["lon"].value)],
          };
          for (let j = 0; j < snode.childNodes.length; j++) {
            let ssnode = snode.childNodes[j];
            switch (ssnode.nodeName) {
              case "time":
                trkpt.time = new Date(ssnode.childNodes[0].data);
                break;
              case "ele":
                trkpt.ele = parseFloat(ssnode.childNodes[0].data);
                break;
            }
          }
          segment.push(trkpt);
        }
      }
      break;
  }

  for (var i = 0; i < node.childNodes.length; i++) {
    parseGpxData(node.childNodes[i], result);
  }
  return result;
}

function returnFileSize(number) {
  if (number < 1024) {
    return number + " octets";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + " Ko";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + " Mo";
  }
}
