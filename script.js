let countries = [];
let currentIndex = 0;
let shuffledCountries = [];
let incorrectAnswers = [];

async function loadCountries() {
  const res = await fetch('countries.json');
  countries = await res.json();

  shuffledCountries = shuffleArray([...countries]);

  const datalist = document.getElementById('countries');
  datalist.innerHTML = '';
  countries.forEach(c => {
    const option = document.createElement('option');
    option.value = c.name;
    datalist.appendChild(option);
  });

  incorrectAnswers = [];
  updateIncorrectAnswersList();

  loadNextFlag();
}

function shuffleArray(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function loadNextFlag() {
  if (currentIndex >= shuffledCountries.length) {
    document.getElementById('flag').src = '';
    document.getElementById('result').textContent = "🎉 You've completed all flags!";
    document.getElementById('progress').textContent = '';
    document.getElementById('show-answer').textContent = '';
    return;
  }

  const currentCountry = shuffledCountries[currentIndex];
  const flagUrl = `https://flagcdn.com/w320/${currentCountry.code}.png`;

  document.getElementById('flag').src = flagUrl;
  document.getElementById('guess').value = '';
  document.getElementById('result').textContent = '';
  document.getElementById('show-answer').textContent = '';
  document.getElementById('progress').textContent = `${currentIndex + 1} / ${shuffledCountries.length}`;
}

function checkAnswer() {
  const guessInput = document.getElementById('guess');
  const guess = guessInput.value.trim().toLowerCase();
  const correct = shuffledCountries[currentIndex].name.toLowerCase();
  const result = document.getElementById('result');

  if (guess === correct) {
    result.textContent = "✅ Correct!";
    currentIndex++;
    setTimeout(loadNextFlag, 1000);
  } else {
    result.textContent = "❌ Try again!";
    if (!incorrectAnswers.some(e => e.correct === shuffledCountries[currentIndex].name)) {
      incorrectAnswers.push({
        guess: guessInput.value || 'blank',
        correct: shuffledCountries[currentIndex].name
      });
      updateIncorrectAnswersList();
    }
  }
}

function updateIncorrectAnswersList() {
  const list = document.getElementById('incorrect-list');
  list.innerHTML = '';

  if (incorrectAnswers.length === 0) {
    list.innerHTML = '<li>No incorrect answers yet.</li>';
    return;
  }

  incorrectAnswers.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `❌ ${item.guess} → ✅ ${item.correct}`;
    list.appendChild(li);
  });
}

window.showAnswer = function() {
  if (currentIndex < shuffledCountries.length) {
    const correct = shuffledCountries[currentIndex].name;
    document.getElementById('show-answer').textContent = `Answer: ${correct}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('guess').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  });

  loadCountries();
});
