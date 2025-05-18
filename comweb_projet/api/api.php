<?php
header("Access-Control-Allow-Origin: *");

// Récupération des paramètres GET facultatifs (issus du formulaire React)
$identifiant = $_GET['identifiant'] ?? null;
$motDePasse = $_GET['motDePasse'] ?? null;

// Connexion à la base de données version full localhost
$host = 'localhost';
$dbname = 'notes';
$username = 'root';
$password = '';

// Connexion à la base de données version zzz
/*$host = 'localhost';
$dbname = 'mung001';
$username = 'mung001';
$password = 'sibdd@B_INP27';*/

try 
    {$bdd = new PDO('mysql:host=' . $host . ';dbname=' . $dbname . ';charset=utf8', $username, $password);} 
catch (Exception $e) 
    {die(json_encode(['error' => 'Erreur de connexion à la base de données']));}

// Page professeurs : si seul le mot de passe est fourni et correspond à celui des professeur
if (!$identifiant && $motDePasse === 'prof123') 
{
    $requete = $bdd->query('SELECT * FROM `Notes`');
    $resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($resultats);
}

// Page élèves : si identifiant et mot de passe sont fournis et correspondent à celui d'un élève de la BDD
elseif ($identifiant && $motDePasse) 
{
    $requete = $bdd->prepare('SELECT * FROM Notes WHERE name = :identifiant AND mdp = :motDePasse');
    $requete->execute([
        'identifiant' => $identifiant,
        'motDePasse' => $motDePasse
    ]);

    $resultats = $requete->fetchAll(PDO::FETCH_ASSOC);

    if ($resultats) 
        {echo json_encode($resultats);} // Envoie des résultats si présents
    else 
        {echo json_encode(['error' => 'Identifiant ou mot de passe incorrect']);}

} 

else 
    {echo json_encode(['error' => 'Paramètres manquants']);}
?>