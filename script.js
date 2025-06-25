let countries = [];
let currentIndex = 0;
let shuffledCountries = [];

async function loadCountries() {
  const res = await fetch('countries.json');
  countries = await res.json();

  // Shuffle the countries array
  shuffledCountries = countries.sort(() => 0.5 - Math.random());

  const datalist = document.getElementById('countries');
  countries.forEach(c => {
    const option = document.createElement('option');
    option.value = c.name;
    datalist.appendChild(option);
  });

  loadNextFlag();
}

function loadNextFlag() {
  if (currentIndex >= shuffledCountries.length) {
    document.getElementById('flag').src = '';
    document.getElementById('result').textContent = "🎉 You've completed all flags!";
    document.getElementById('progress').textContent = '';
    return;
  }

  const currentCountry = shuffledCountries[currentIndex];
  const flagUrl = `https://flagcdn.com/w320/${currentCountry.code}.png`;
  document.getElementById('flag').src = flagUrl;
  document.getElementById('guess').value = '';
  document.getElementById('result').textContent = '';
  document.getElementById('progress').textContent = `${currentIndex + 1}/${shuffledCountries.length}`;
}

function checkAnswer() {
  const guess = document.getElementById('guess').value.trim().toLowerCase();
  const correct = shuffledCountries[currentIndex].name.toLowerCase();
  const result = document.getElementById('result');

  if (guess === correct) {
    result.textContent = "✅ Correct!";
    currentIndex++;
    setTimeout(loadNextFlag, 1000);
  } else {
    result.textContent = "❌ Try again!";
  }
}

// Enter key triggers submission
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('guess').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  });

  loadCountries();
});
