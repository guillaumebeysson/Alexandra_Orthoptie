document.getElementById("startMotsFlashingPersonnalise").addEventListener("click", function () {
    // Récupérer les valeurs sélectionnées dans les select
    var lettersNumbers = document.getElementById("NombreDeLettres").value;
    var wordsNumbers = document.getElementById("NombreDeMots").value;
    var secondsNumbers = document.getElementById("NombreDeSecondes").value;

    // Construire l'URL avec les paramètres
    var url = "motsFlashingPersonnalise.html?lettres=" + lettersNumbers + "&mots=" + wordsNumbers + "&secondes=" + secondsNumbers;

    // Rediriger vers la page motsFlashingPersonnalise.html avec les paramètres d'URL
    window.location.href = url;
});

window.onscroll = function () {
    growShrinkBackUp();
};
function growShrinkBackUp() {
    var Backup = document.getElementById("back-up");
    if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
    ) {
        Backup.style.bottom = "20px";
        Backup.style.right = "20px";
    } else {
        Backup.style.bottom = "20px";
        Backup.style.right = "-60px";
    }
}