<?php
header("Access-Control-Allow-Origin: *");

// Vérification des paramètres
if (isset($_GET['identifiant']) && isset($_GET['motDePasse'])) {

$identifiant = $_GET['identifiant'];
$motDePasse = $_GET['motDePasse'];

// Connexion à la base de données
$host = 'localhost';
$dbname = 'notes';
$username = 'root';
$password = '';

try {
$bdd = new PDO('mysql:host=' . $host . ';dbname=' . $dbname . ';charset=utf8', $username, $password);
} catch (Exception $e) {
die(json_encode(['error' => 'Erreur de connexion à la base de données']));
}

// Préparation de la requête
$requete = $bdd->prepare('SELECT * FROM Notes WHERE name = :identifiant AND mdp = :motDePasse');

// Exécution de la requête
$requete->execute([
'identifiant' => $identifiant,
'motDePasse' => $motDePasse
]);

// Récupération des résultats
$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);

if ($resultats) {
echo json_encode($resultats);
} else {
echo json_encode(['error' => 'Identifiant ou mot de passe incorrect']);
}

} else {
echo json_encode(['error' => 'Paramètres manquants']);
}
?>