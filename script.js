// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function () {
   let form = document.querySelector("form");

   let pilotNameInput = document.querySelector("input[name=pilotName]");
   let copilotNameInput = document.querySelector("input[name=copilotName]");
   let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
   let cargoMassInput = document.querySelector("input[name=cargoMass]");

   form.addEventListener("submit", function (event) {

      // Make sure all fields are entered
      if (pilotNameInput.value === ""
         || copilotNameInput.value === ""
         || fuelLevelInput.value === ""
         || cargoMassInput.value === ""
      ) {
         alert("All fields are required!");
         event.preventDefault();
      };

      // Make sure the name fields are texts
      // nameInput's value is a not "not a number" (name value is a number, show alert)
      if (!isNaN(pilotNameInput.value)
         || !isNaN(copilotNameInput.value)
      ) {
         alert("Names must be text");
         event.preventDefault();
      };

      // Make sure the Fuel Level & Cargo Mass are numbers
      // fuel & cargo input value is not a number, show alert
      if (isNaN(fuelLevelInput.value)
         || isNaN(cargoMassInput.value)
      ) {
         alert("Fuel Level and Cargo Mass must be numbers");
         event.preventDefault();
      };

      // Updating shuttle's requirement to include pilot's & copilot's name
      document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} Ready`;
      document.getElementById("copilotStatus").innerHTML = `Co-Pilot ${pilotNameInput.value} Ready`;

      if (fuelLevelInput.value < 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("fuelStatus").innerHTML = `Not enough fuel for the journey!`;
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
      } else if (cargoMassInput.value > 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("cargoStatus").innerHTML = `Too much mass for take off!`;
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
      } else {
         document.getElementById("launchStatus").innerHTML = "Shuttle ready for launch";
         document.getElementById("launchStatus").style.color = "green";
      }

      event.preventDefault();
   });

   fetch("https://handlers.education.launchcode.org/static/planets.json")
   .then(function(response) {
      return response.json();
   }).then(function(json) {
      let div = document.getElementById("missionTarget");
      let randomDestination = Math.floor(Math.random() * json.length);
      div.innerHTML = `
      <h2>Mission Destination</h2>
      <ol>
         <li>Name: ${json[randomDestination].name}</li>
         <li>Diameter: ${json[randomDestination].diameter}</li>
         <li>Star: ${json[randomDestination].star}</li>
         <li>Distance from Earth: ${json[randomDestination].distance}</li>
         <li>Number of Moons: ${json[randomDestination].moons}</li>
      </ol>
      <img src="${json[randomDestination].image}">
      `;
   });
});
