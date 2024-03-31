document.getElementById("startButton").addEventListener("click", function () {
  var countdownValue = 3;
  var countdownElement = document.getElementById("countdown");
  var lettersElement = document.getElementById("letters");
  var messageElement = document.getElementById("message");

  // Définir les séries de lettres
  var letterSeries = [
    "USURPER",
    "VACARME",
    "VACCINS",
    "VAINCRE",
    "VALEURS",
    "VALSEUR",
    "VAMPIRE",
    "VANILLE",
    "VANTAIL",
    "VAPOTER",
  ];
  var seriesIndex = 0;

  function updateCountdown() {
    countdownElement.innerText = countdownValue;
    countdownValue--;

    if (countdownValue < 0) {
      clearInterval(intervalIdCountdown);
      countdownElement.style.display = "none"; // Cacher la div countdown

      setTimeout(function () {
        lettersElement.style.display = "flex"; // Activer la div letters
        displayNextSeries();
      }, 1000); // Afficher la série suivante après 1 seconde
    }
  }

  function displayLetters(letters) {
    lettersElement.innerText = letters;
  }

  function clearLetters() {
    lettersElement.innerText = "";
  }

  function displayNextSeries() {
    if (seriesIndex < letterSeries.length) {
      displayLetters(letterSeries[seriesIndex]);
      setTimeout(function () {
        clearLetters();
        seriesIndex++;
        if (seriesIndex < letterSeries.length) {
          setTimeout(displayNextSeries, 3000); // Attendez 3 secondes entre les séries
        } else {
          lettersElement.style.display = "none";
          setTimeout(function () {
            messageElement.style.display = "flex";
            messageElement.innerText = "Terminé";
          }, 2000); // Afficher "Terminé" après 2s
        }
      }, 1000); // durée d'affichage des lettres 1s
    }
  }

  updateCountdown();
  var intervalIdCountdown = setInterval(updateCountdown, 1000);
  showWinModal();
});

function showWinModal() {
  const modal = document.getElementById("winModal");
  const elapsedTimeSpan = document.getElementById("elapsedTime");
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculer le temps écoulé en secondes
  elapsedTimeSpan.textContent = elapsedTime;
  modal.style.display = "block";
  // confetti
  if (window.confetti) {
    var count = 200;
    var defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }
}
