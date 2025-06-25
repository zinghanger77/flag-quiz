let countries = [];
let currentCountry = null;

async function loadCountries() {
  const res = await fetch('countries.json');
  countries = await res.json();

  const datalist = document.getElementById('countries');
  countries.forEach(c => {
    const option = document.createElement('option');
    option.value = c.name;
    datalist.appendChild(option);
  });

  loadRandomFlag();
}

function loadRandomFlag() {
  currentCountry = countries[Math.floor(Math.random() * countries.length)];
  const flagUrl = `https://flagcdn.com/w320/${currentCountry.code}.png`;
  document.getElementById('flag').src = flagUrl;
  document.getElementById('guess').value = '';
  document.getElementById('result').textContent = '';
}

function checkAnswer() {
  const guess = document.getElementById('guess').value.trim().toLowerCase();
  const correct = currentCountry.name.toLowerCase();
  const result = document.getElementById('result');

  if (guess === correct) {
    result.textContent = "✅ Correct!";
    setTimeout(loadRandomFlag, 1500);
  } else {
    result.textContent = "❌ Try again!";
  }
}

loadCountries();
