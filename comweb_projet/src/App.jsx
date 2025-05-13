import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function Bouton({ label, action3 }) {
  return (
    <button onClick={() => action3(label)}> {label} </button>
  );
}

function Navbar({ action2 }) {
  return (
    <div>
      <img src={reactLogo} alt="Logo React" />
      <Bouton label="Élève" action3={action2} />
      <Bouton label="Professeur" action3={action2} />
    </div>
  );
}

function Contenu({ pageActuelle, actionFormulaire }) {
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (identifiant && motDePasse) {
      // console.log("Formulaire envoyé avec :", identifiant, motDePasse);
      actionFormulaire(identifiant, motDePasse);
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  if (pageActuelle === "Élève") {
    return (
      <div className="page">
        <div className="contenu">
          <h1>Espace Élève</h1>
          <form onSubmit={handleSubmit}>
            <div className="champ">
              <label>Identifiant :</label>
              <input type="text" value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} required />
            </div>
            <div className="champ">
              <label>Mot de passe :</label>
              <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required />
            </div>
            <button type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    );
  } else if (pageActuelle === "Professeur") {
    return (
      <div className="page">
        <div className="contenu">
          <h1>Espace Professeur</h1>
          <form>
            <div className="champ">
              <label>Mot de passe :</label>
              <input type="password" required />
            </div>
            <button type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="page">
        <p>Page inconnue</p>
      </div>
    );
  }
}

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState("Élève");

  const fetchFormulaire = (identifiant, motDePasse) => {
    const url = `http://localhost:8080/api.php?identifiant=${encodeURIComponent(identifiant)}&motDePasse=${encodeURIComponent(motDePasse)}`;
    console.log("URL envoyée à l'API :", url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          setData(data);
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur serveur.');
      });
  };

  return (
    <>
      <Navbar action2={setPage} />
      <Contenu pageActuelle={page} actionFormulaire={fetchFormulaire} />
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
    </>
  );
}

export default App;
