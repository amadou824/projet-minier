fetch("data/echantillons.csv")
    .then(response => response.text())
    .then(data => traiterCSV(data))
    .catch(error => console.error("Erreur chargement CSV :", error));

function traiterCSV(contenu) {
    const lignes = contenu.trim().split("\n");
    const entetes = lignes[0].split(",").map(e => e.trim());

    const echantillons = [];

    for (let i = 1; i < lignes.length; i++) {
        const valeurs = lignes[i].split(",");
        const objet = {};

        for (let j = 0; j < entetes.length; j++) {
            objet[entetes[j]] = valeurs[j] ? valeurs[j].trim() : null;
        }

        echantillons.push(objet);
    }

    analyserEchantillons(echantillons);
}


/*function analyserEchantillons(echantillons) {
    const fer = echantillons.filter(e => e.type_minerai === "fer");
    const bauxite = echantillons.filter(e => e.type_minerai === "bauxite");

    const sortie = document.getElementById("resultat");

    sortie.textContent =
        "Échantillons Fer :\n" +
        JSON.stringify(fer, null, 2) +
        "\n\nÉchantillons Bauxite :\n" +
        JSON.stringify(bauxite, null, 2);
}REMPLACEMENT   :*/ 
function analyserEchantillons(echantillons) {
    const stats = {};

    echantillons.forEach(e => {
        const zone = e.zone;

        if (!stats[zone]) {
            stats[zone] = {
                fer: { somme: 0, count: 0 },
                bauxite: { somme: 0, count: 0 }
            };
        }

        if (e.type_minerai === "fer" && e.Fe) {
            stats[zone].fer.somme += parseFloat(e.Fe);
            stats[zone].fer.count++;
        }

        if (e.type_minerai === "bauxite" && e.Al2O3) {
            stats[zone].bauxite.somme += parseFloat(e.Al2O3);
            stats[zone].bauxite.count++;
        }
    });

    let resultat = "TENEURS MOYENNES PAR ZONE\n\n";

    for (const zone in stats) {
        const fer = stats[zone].fer;
        const bauxite = stats[zone].bauxite;

        resultat += `Zone : ${zone}\n`;

    if (fer.count > 0) {
        const moyFe = fer.somme / fer.count;
        resultat += `  Fer (Fe %) : ${moyFe.toFixed(2)} → ${classerFer(moyFe)}\n`;
    } else {
        resultat += `  Fer (Fe %) : N/A\n`;
    }

    if (bauxite.count > 0) {
        const moyAl = bauxite.somme / bauxite.count;
        resultat += `  Bauxite (Al₂O₃ %) : ${moyAl.toFixed(2)} → ${classerBauxite(moyAl)}\n`;
    } else {
        resultat += `  Bauxite (Al₂O₃ %) : N/A\n`;
    }

    resultat += "\n";

    }

    document.getElementById("resultat").textContent = resultat;
}

function classerFer(teneur) {
    if (teneur >= 62) return "Riche";
    if (teneur >= 55) return "Moyen";
    return "Pauvre";
}

function classerBauxite(teneur) {
    if (teneur >= 48) return "Riche";
    if (teneur >= 40) return "Moyen";
    return "Pauvre";
}
/* EXEMPLE D'UTILISATION DES FONCTIONS DE CLASSIFICATION*/
