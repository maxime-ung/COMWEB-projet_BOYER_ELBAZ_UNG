<?php
// API conforme au cours COMWEB - projet avec 2 bases : eleves et professeurs

// Autoriser accès depuis React (CORS)
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

// Paramètres communs de connexion
$host = 'localhost';
$username = 'root';
$password = '';

// Vérification que les bons paramètres sont passés dans l'URL
if (!isset($_GET['action']) || !isset($_GET['name'])) {
    echo json_encode(['error' => 'Paramètres manquants']);
    exit();
}

// Lecture des paramètres GET
$action = $_GET['action'];
$name = $_GET['name'];

// Connexion à la base de données selon besoin
try {
    if ($action === 'getNotesEleve') {
        $bdd = new PDO('mysql:host='.$host.';dbname=eleves;charset=utf8', $username, $password);
    } elseif ($action === 'getInfosProf') {
        $bdd = new PDO('mysql:host='.$host.';dbname=professeurs;charset=utf8', $username, $password);
    } else {
        echo json_encode(['error' => 'Action inconnue']);
        exit();
    }
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

// Exécuter la bonne requête SQL selon l'action
if ($action === 'getNotesEleve') {
    $sql = "SELECT subject, note FROM Notes WHERE name = :name";
    $stmt = $bdd->prepare($sql);
    $stmt->execute(['name' => $name]);
    $notes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($notes);
    exit();
}

if ($action === 'getInfosProf') {
    $sql = "SELECT prenom, matiere FROM professeurs WHERE nom = :name";
    $stmt = $bdd->prepare($sql);
    $stmt->execute(['name' => $name]);
    $infos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($infos);
    exit();
}

// Si aucune action correcte n'a été reconnue (sécurité supplémentaire)
echo json_encode(['error' => 'Action non reconnue']);
exit();
?>
