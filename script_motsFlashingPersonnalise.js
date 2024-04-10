document.getElementById("startButton").addEventListener("click", function () {
  var countdownValue = 3;
  var countdownElement = document.getElementById("countdown");
  var lettersElement = document.getElementById("letters");
  var messageElement = document.getElementById("message");
  var letterSeries;
  const urlParams = new URLSearchParams(window.location.search);
  const lettersNumbers = urlParams.get('lettres');
  let wordsNumbers = urlParams.get('mots');
  const secondsNumbers = urlParams.get('secondes');
  const nameFileLetters = "mots" + lettersNumbers + "lettres" + ".txt"

  if (wordsNumbers == "infini") {
    wordsNumbers = 500
  }

  // Lire le fichier "mots.txt"
  fetch(nameFileLetters)
    .then(response => response.text())
    .then(data => {
      // Extraire les mots du fichier
      const mots = data.split('\n').filter(Boolean); // Séparer les mots par saut de ligne

      // Choisir 10 mots aléatoires
      const motsAleatoires = [];
      for (let i = 0; i < wordsNumbers; i++) {
        const randomIndex = Math.floor(Math.random() * mots.length);
        motsAleatoires.push(mots[randomIndex]);
      }

      // Mettre les 10 mots aléatoires dans la variable letterSeries
      letterSeries = motsAleatoires;

      // Afficher les mots dans la console (à des fins de débogage)
      console.log(letterSeries);

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
          }, secondsNumbers); // durée d'affichage des lettres 1s
        }
      }

      updateCountdown();
      var intervalIdCountdown = setInterval(updateCountdown, 1000);
    })
    .catch(error => console.error("Erreur lors de la lecture du fichier:", error));
});