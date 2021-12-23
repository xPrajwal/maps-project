// https://developers.google.com/maps/documentation/javascript/
// https://mapstyle.withgoogle.com/

const resetButton = document.querySelector("#reset-button");
let map;
var isInBoundary = false, //isInBoundarying the chosen location
  question = 0,
  correctAnswer = 0,
  incorrectAnswer = 0;
  highScore = 0;
  
function initMap() {
  // Initializing map using google's sdk
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.240, lng: -118.527 },
    zoom: 16.5, //zoom level of the map
    scrollwheel: false, //disables use of scroll wheel on the map
    scaleControl: false, //disables the zoom in/out feature of the map
    draggable: false, // map is fixed to the cordinates specified using "center" parameter above
    disableDefaultUI: true
  });
  // Specifying parameters for a restrictive view of the map by disabling labels 
  var styles = {
    default: null,
    partial_view: [
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]
  };

  // Modifying the map using the style specified above
  map.setOptions({ styles: styles["partial_view"] });

  // Co-ordinates for Sustainability Center
  var sustainabilityCenter = [
    { lat: 34.240871553685736, lng: -118.52674717021348 },
    { lat: 34.240871553685736, lng: -118.52645346833046 },
    { lat: 34.24074849195223, lng: -118.52645212722597 },
    { lat: 34.240747937619695, lng: -118.52649705422634 },
    { lat: 34.24077343691273, lng: -118.5264950425696 },
    { lat: 34.240772328247985, lng: -118.52665262234702},
    { lat: 34.24072132965348, lng: -118.52665396345152 },
    { lat:34.24072077532074, lng: -118.52674582910899 }
  ];

  var sustainabilityCenterPlot = new google.maps.Polygon({
    paths: sustainabilityCenter,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "green",
    strokeColor: "#FF0000",
    fillOpacity: 0.2
  });

  // Co-ordinates for Jacaranda Hall
  var jacarandaHall = [
    { lat: 34.24101723251721, lng:-118.52946083927947},
    { lat: 34.241021667163324, lng: -118.52908264780837},
    { lat: 34.24109705611157, lng: -118.52907996559935},
    { lat: 34.24109483879052, lng: -118.52875005389052},
    { lat: 34.24102831913205, lng: -118.52875273609953},
    { lat: 34.24102610180922, lng: -118.52784883166152},
    { lat: 34.242077106294545, lng: -118.52784346724349},
    { lat: 34.242077106294545, lng: -118.52873664284544},
    { lat: 34.24193298198324, lng: -118.52901827479201},
    { lat: 34.24186036540984, lng: -118.52920468831854},
    { lat: 34.241721229662886, lng: -118.52936427975493},
    { lat:  34.24156213790948, lng: -118.5294487693389},
    { lat: 34.24134096106975, lng: -118.52944742823439}
  ];

  var jacarandaHallPlot = new google.maps.Polygon({
    paths: jacarandaHall,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "green",
    strokeColor: "#FF0000",
    fillOpacity: 0.35
  });

  // Co-ordinates forMatador Square
  var matadorSquare = [
    { lat: 34.23972384140916, lng: -118.52815619790327 },
    { lat: 34.239715224475866, lng: -118.52743177115715 }, 
    { lat: 34.239198206863904, lng: -118.52743307408296 }, 
    { lat: 34.239198206863904, lng: -118.52814577449685 } 
  ];

  var matadorSquarePlot = new google.maps.Polygon({
    paths: matadorSquare,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "green",
    strokeColor: "#FF0000", 
    fillOpacity: 0.35
  });

  //Co-ordinates for Sierra Hall
  var sierraHall = [
    { lat: 34.2384491988106, lng: -118.53137605197102 },
    { lat: 34.23845051727853, lng: -118.53004594623708 }, 
    { lat: 34.23811958106296, lng: -118.53005073079007 },
    { lat: 34.23812089953651, lng: -118.53137924167304 }
  ]; 

  var sierraHallPlot = new google.maps.Polygon({
    paths: sierraHall,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "green",
    strokeColor: "#FF0000",
    fillOpacity: 0.35
  });
  //Co-ordinates for Campus Store 
  var campusStore = [
    { lat: 34.2377562976809, lng: -118.52836690865797 },
    { lat: 34.23775408027191, lng: -118.52774865948868 },
    { lat: 34.2376221443316, lng:  -118.5277446361752 },
    { lat: 34.23762325303785,  lng: -118.5276963564136 },
    { lat: 34.237005701400136, lng: -118.52769099199566 },
    { lat: 34.237010136257496, lng: -118.52805309020759 },
    { lat: 34.23723853109536,  lng: -118.52805979573003 },
    { lat: 34.23724296594043, lng:-118.52836556755348 } 
  ];

  var campusStorePlot = new google.maps.Polygon({
    paths: campusStore,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "green",
    strokeColor: "#FF0000",
    fillOpacity: 0.35
  });

  // Green Tint function
  function greenTint(border) {
    border.setOptions({ strokeColor: "green" });
  }

  // Adding the double click listener to the maps
  //https://developers.google.com/maps/documentation/javascript/events
  google.maps.event.addListener(map, "dblclick", function(e) {
    question++;

    // Sustainability Center
    if (question == 1) {
      if (
        google.maps.geometry.poly.containsLocation(e.latLng, sustainabilityCenterPlot) ==
        true
      ) {
        isInBoundary = true;
      } else {
        isInBoundary = false;
      }

      if (isInBoundary == true) {
        greenTint(sustainabilityCenterPlot);
        document.getElementById("a1").style.color = "green";
        document.getElementById("a1").innerHTML =
          "Correct Answer";
        correctAnswer++;
      } else {
        sustainabilityCenterPlot.setOptions({ fillColor: "red" });
        document.getElementById("a1").style.color = "red";
        document.getElementById("a1").innerHTML =
          "Incorrect Answer";
        incorrectAnswer++;
      }

      sustainabilityCenterPlot.setMap(map);
      document.getElementById("q2").innerHTML =
        "Q2. Where is Jacaranda Hall?";
    }

    // Jacaranda Hall
    else if (question == 2) {
      if (
        google.maps.geometry.poly.containsLocation(
          e.latLng,
          jacarandaHallPlot
        ) == true
      ) {
        isInBoundary = true;
      } else {
        isInBoundary = false;
      }

      if (isInBoundary == true) {
        greenTint(jacarandaHallPlot);
        document.getElementById("a2").style.color = "green";
        document.getElementById("a2").innerHTML =
          "Correct Answer";
        correctAnswer++;
      } else {
        jacarandaHallPlot.setOptions({ fillColor: "red" });
        document.getElementById("a2").style.color = "red";
        document.getElementById("a2").innerHTML =
          "Incorrect Answer";
        incorrectAnswer++;
      }
      jacarandaHallPlot.setMap(map);
      document.getElementById("q3").innerHTML =
        "Q3. Where is Matador Square?"; 
    }

    // Matador Square
    else if (question === 3) {
      if (
        google.maps.geometry.poly.containsLocation(e.latLng, matadorSquarePlot) ==
        true
      ) {
        isInBoundary = true;
      } else {
        isInBoundary = false; 
      }

      if (isInBoundary == true) {
        greenTint(matadorSquarePlot); 
        document.getElementById("a3").style.color = "green"; 
        document.getElementById("a3").innerHTML =
          "Correct Answer"; 
        correctAnswer++; 
      } else {
        // if isInBoundary is false
        matadorSquarePlot.setOptions({ fillColor: "red" }); 
        document.getElementById("a3").style.color = "red"; 
        document.getElementById("a3").innerHTML =
          "Incorrect Answer"; 
        incorrectAnswer++; 
      }

      matadorSquarePlot.setMap(map); 
      document.getElementById("q4").innerHTML =
        "Q4. Where is Sierra Hall?"; 
    }

    // Sierra Hall
    else if (question == 4) {
      if (
        google.maps.geometry.poly.containsLocation(e.latLng, sierraHallPlot) ==
        true
      ) {
        isInBoundary = true;
      } else {
        isInBoundary = false;
      }

      if (isInBoundary == true) {
        greenTint(sierraHallPlot);
        document.getElementById("a4").style.color = "green";
        document.getElementById("a4").innerHTML =
          "Correct Answer";
        correctAnswer++;
      } else {
        sierraHallPlot.setOptions({ fillColor: "red" });
        document.getElementById("a4").style.color = "red";
        document.getElementById("a4").innerHTML =
          "Incorrect Answer";
        incorrectAnswer++;
      }

      sierraHallPlot.setMap(map);
      document.getElementById("q5").innerHTML =
        "Q5. Where is the Campus Store";
    }

    // Campus Store
    else if (question == 5) {
      if (
        google.maps.geometry.poly.containsLocation(
          e.latLng,
          campusStorePlot
        ) == true
      ) {
        isInBoundary = true;
      } else {
        isInBoundary = false;
      }

      if (isInBoundary == true) {
        greenTint(campusStorePlot);
        document.getElementById("a5").style.color = "green";
        document.getElementById("a5").innerHTML =
          "Correct Answer";
        correctAnswer++;
      } else {
        campusStorePlot.setOptions({ fillColor: "red" });
        document.getElementById("a5").style.color = "red";
        document.getElementById("a5").innerHTML =
          "Incorrect Answer";
        incorrectAnswer++;
      }
      campusStorePlot.setMap(map);
    }

    if (correctAnswer > highScore){
      highScore = correctAnswer;
    }
    document.querySelector("#correct-answers").innerHTML = "Correct Answers: <br> " + correctAnswer;
    document.querySelector("#incorrect-answers").innerHTML = "Incorrect Answers: <br> " + incorrectAnswer;
    document.querySelector("#high-score").innerHTML = "High Score : <br>" + highScore;
  });
}

//Reset values
function reset() {
  //resetting counters
  question = 0; 
  correctAnswer = 0; 
  incorrectAnswer = 0;
  // restting the questions
  document.querySelector("#q2").innerHTML = "";
  document.querySelector("#q3").innerHTML = "";
  document.querySelector("#q4").innerHTML = "";
  document.querySelector("#q5").innerHTML = "";
  // resetting the answers
  document.querySelector("#a1").innerHTML = "";
  document.querySelector("#a2").innerHTML = "";
  document.querySelector("#a3").innerHTML = "";
  document.querySelector("#a4").innerHTML = "";
  document.querySelector("#a5").innerHTML = "";
  // resetting results
  document.querySelector("#correct-answers").innerHTML = "Correct Answers: <br> " + correctAnswer;
  document.querySelector("#incorrect-answers").innerHTML = "Incorrect Answers: <br> " + incorrectAnswer;
  // initialzing the map again removing the tints on the map from the previous attempt
  initMap(); 
}

//Reset Button event listener
resetButton.addEventListener("click", reset);
