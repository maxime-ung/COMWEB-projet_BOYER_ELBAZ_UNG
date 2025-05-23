import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

// Composant Bouton
function Bouton(props) 
{
  const action4 = () => {props.action3(props.label);}; // Appelle la fonction passée en props avec le label (Élève ou Professeur)
  return (<button onClick={action4}>{props.label}</button>);
}

// Composant Navbar
function Navbar(props) 
{
  return (
    <div>
      <img
        src="https://static.vecteezy.com/ti/vecteur-libre/p1/14861990-creation-de-logo-sp-initiale-sp-lettre-logo-design-monogramme-vector-design-pro-vecteur-vectoriel.jpg"
        alt="Logo SuperPronote"  
        width="200"                    
        height="auto"                      
      />
      <div>
        <Bouton label="Eleve" action3={props.action2} />
        <Bouton label="Professeur" action3={props.action2} />
      </div>
    </div>
  );
}

// Composant Contenu : Affiche le formulaire selon la page actuelle (Élève ou Professeur)
function Contenu(props) {

  if (!["Eleve", "Professeur"].includes(props.pageActuelle)) 
    {return null;}

  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const soumissionFormulaire = (event) => {
    event.preventDefault(); // Empêche le rechargement complet de la page
    if ((props.pageActuelle === "Eleve" && identifiant && motDePasse) || 
        (props.pageActuelle === "Professeur" && motDePasse))
          {props.actionFormulaire(identifiant, motDePasse);} // Envoie les identifiants au serveur
    else 
      {alert('Veuillez remplir tous les champs.');}
  };


  if (props.pageActuelle === "Eleve") 
  {
    return (
      <div className="page">
        <div className="contenu">
          <h1>Espace Élève</h1>
          <form onSubmit={soumissionFormulaire}>
            <div className="champ">
              <label>Identifiant :</label>
              <input type="text" value={identifiant} onChange={(event) => setIdentifiant(event.target.value)} required />
            </div>
            <div className="champ">
              <label>Mot de passe :</label>
              <input type="password" value={motDePasse} onChange={(event) => setMotDePasse(event.target.value)} required />
            </div>
            <button type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    );
  } 
  else if (props.pageActuelle === "Professeur") 
    {
      return (
        <div className="page">
          <div className="contenu">
            <h1>Espace Professeur</h1>
            <form onSubmit={soumissionFormulaire}>
              <div className="champ">
                <label>Mot de passe :</label>
                <input type="password" value={motDePasse} onChange={(event) => setMotDePasse(event.target.value)} required />
              </div>
              <button type="submit">Se connecter</button>
            </form>
          </div>
        </div>
      );
    } 
    else 
    {
      return (
        <div className="page">
          <p>Page inconnue</p>
        </div>
      );
    }
  }


// Composant principal App
function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {setMessage("Bienvenue sur SuperPronote");}, []);

  // Fonction pour changer de page
  function action1(x) 
    {setPage(x);}

  // Met à jour le titre de la page quand "page" change
  useEffect(() => {document.title = `La page : ${page}`;}, [page]);


   // Fonction pour envoyer les identifiants à l'API et récupérer les données
    const fetchFormulaire = (identifiant, motDePasse) => {
      
      //let url = "http://localhost:8080/api.php"; // Interrogation API localhost
      let url = "https://mung001.zzz.bordeaux-inp.fr/api.php"; // Interrogation API zzz
      if (page === "Eleve") 
        {url += `?identifiant=${encodeURIComponent(identifiant)}&motDePasse=${encodeURIComponent(motDePasse)}`;} 
      else if (page === "Professeur") 
        {url += `?motDePasse=${encodeURIComponent(motDePasse)}`;} // pas d’identifiant pour le prof
 
      console.log("URL envoyée à l'API :", url);
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.error) 
            {alert(data.error);} 
          else 
          {setData(data);}
        })
        .catch(error => {
          console.error('Erreur:', error);
          alert('Erreur serveur.');
        });
    };

  return (
    <>
      <Navbar action2={action1} />
      {page === "" && <h1>{message}</h1>}
      <Contenu pageActuelle={page} actionFormulaire={fetchFormulaire} />
      { ["Eleve", "Professeur"].includes(page) && (
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Note</th>
            <th>Matière</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <th>{item.name}</th>
                <th>{item.note}</th>
                <th>{item.subject}</th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Aucune donnée à afficher</td>
            </tr>
          )}
        </tbody>
      </table>
      )}
    </>
  );
}

export default App;
