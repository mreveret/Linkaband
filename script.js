/*
 * affiche la div toShow et toShow2 qui sont en hidden
 */

function affiche() {
	document.getElementById ('toShow').style.display = 'block';
	document.getElementById ('toShow2').style.display = 'block';
}

/*
 * Genere un entier random 
 * @param {number} max valeur max de l'entier genere
 */

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

/*
 * Defini le type d'artiste (dj, groupe de musique ou musicien)
 * @param {object} elem possede les donnees de la variable correspondante dans variables.js
 * @param {string} alt string dans laquelle on stock et retourne le type d'artiste
 */

function defineType(elem,alt) {
	let dj = 0;
	let i = 0;
	while (elem.styles[i]) {
		if (Object.values(elem.styles[i]) == "STYLE.DJ")
		{
			dj = 1;
			break;
		}
		else
			i++;
	}
	if (dj === 1)
	{
		alt = alt.concat(" ","DJ");
		return alt;
	}
	else
	{
		if (elem.nbmembres > 2)
			alt = alt.concat(" ","groupe de musique");
		else
			alt = alt.concat(" ","musicien");
		return alt;
	}
}

/*
 * Recupere la liste des styles de musique d'un artiste et les retourne en miniscule et concatenes
 * @param {object} elem possede les donnees de la variable correspondante dans variables.js
 * @param {string} alt string dans laquelle on concatene la liste des styles de musique
 */

function getStyles(elem,alt)
{
	let i = 0;
	let sub = "test";

	while (elem.styles[i]) {
		sub = String(Object.values(elem.styles[i]));
		sub = sub.substr(6);
		sub = sub.toLowerCase();
		alt = alt.concat (" ",sub);
		i++;
	}
	return alt;
}

/*
 * Defini l'alt complet en fonction des probabilitees demandees par le sujet et de l'artiste selectione
 * @param {number} value correspond a l'attribut value de l'<option> selectionee
 */

function defineAlt(value) {
	let alt = "";
	let rand = 0;
	let elem = 0;
	var type = ['Recherche','Devis','Tarifs','Prix','Reservation','Cherche'];

	if (value == 1)
		elem = artiste1;
	if (value == 2)
		elem = artiste2;
	if (value == 3)
		elem = artiste3;
	if (value == 4)
		elem = artiste4;
	if (value == 5)
		elem = artiste5;
	rand = getRandomInt(6);
	alt = alt + type[rand];
	alt = defineType(elem,alt);
	rand = getRandomInt(2);
	if (rand === 0)
		alt = alt.concat(" ",elem.localisation);
	else
		alt = getStyles(elem,alt);
	return alt;
}

/*
 * Creer le badge avec l'image, l'alt complet defini avant et redirige sur linkaband.com
 * @param {number} val correspond a l'attribut value de l'<option> selectionee
 * @param {string} alt string stockant l'alt complet a mettre pour le badge
 */

function createBadge(val,alt)
{
	let elem = 0;
	let ret1 = "&lt!--badge--&gt &lta href='https://linkaband.com' target='_blank'&gt &ltimg src='";
	let ret2= "' alt ='";
	let ret3= "' style='width:200px; height:200px;'/&gt &lt/a&gt";
	let img = "https://www.caucus.fr/wp-content/uploads/2015/08/2956862e14290964afa37f521f43ac74_large.jpeg";
	return(ret1 + img + ret2 + alt + ret3);
}

/*
 * Appelle les fonctions precedentes pour creer l'alt et le badge puis les ajoute dans le code html de index.html
 */

function defineOptionAndPrint() {
	let test = 0;
	let val;
	let alt;

	test = document.getElementById('liste');
	val = test.options[test.selectedIndex].value;
	test = document.getElementById('toShow');
	alt = defineAlt(val);
	test.innerHTML = alt;
	test = document.getElementById('toShow2');
	test.innerHTML = createBadge(val,alt);
	affiche();
}

