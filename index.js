// Initializing all elements constants
const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

// Default Location
let target = "Rudraprayag";


// Function to fetch Data from weather API
const fetchData = async (target) => {
  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=c767a62b7c024a3eb72141554221607&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();
    // Destructuring
    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

    // Calling update DOM function
    updateDom(temp_c, name, icon, localtime, text);
  } catch (error) {
    alert("Location Not Found");
  }
};

// To update DOM
function updateDom(temperate, city, emoji, time, text) {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getDayFullName(new Date(exactDate).getDay());
  temperateField.innerText = temperate;
  cityField.innerText = city;
  emojiField.src = emoji;
  dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`;
  weatherField.innerText = text;
}

fetchData(target);

// Function to get the name of day
function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";
      break;
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;

    default:
      break;
  }
}

// To search the location
form.addEventListener("submit", (e) => {
  e.preventDefault();
  target = searchField.value;
  fetchData(target);
});

document.querySelector("button").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    // code for enter
    target = searchField.value;
    fetchData(target);
  }
});
