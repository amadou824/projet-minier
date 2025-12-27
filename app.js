fetch("data/echantillons.csv")
    .then(response => response.text())
    .then(data => traiterCSV(data))
    .catch(error => console.error("Erreur chargement CSV :", error));

function traiterCSV(contenu) {
    const lignes = contenu.trim().split("\n");
    const entetes = lignes[0].split(",");

    const echantillons = [];

    for (let i = 1; i < lignes.length; i++) {
        const valeurs = lignes[i].split(",");
        const objet = {};

        for (let j = 0; j < entetes.length; j++) {
            objet[entetes[j]] = valeurs[j] || null;
        }

        echantillons.push(objet);
    }

    analyserEchantillons(echantillons);
}

function analyserEchantillons(echantillons) {
    const fer = echantillons.filter(e => e.type_minerai === "fer");
    const bauxite = echantillons.filter(e => e.type_minerai === "bauxite");

    const sortie = document.getElementById("resultat");

    sortie.textContent =
        "Échantillons Fer :\n" +
        JSON.stringify(fer, null, 2) +
        "\n\nÉchantillons Bauxite :\n" +
        JSON.stringify(bauxite, null, 2);
}
