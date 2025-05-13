import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'

function Bouton(props) {

  const action4 = () => {props.action3(props.label)}


  return (<button onClick={action4}> {props.label} </button>);
}

function Navbar(props){

  return (<div>
    <img src={reactLogo} /> <Bouton label="Élève" action3={props.action2}/>  <Bouton label="Professeur" action3={props.action2}/> </div>);
}


function Contenu(props) {
  if (props.pageActuelle === "Élève") {
    return (
      <div className="page">
        <div className="contenu">
          <h1>Espace Élève</h1>
          <form>
            <div className="champ">
              <label>Identifiant :</label>
              <input type="text" name="identifiant" required />
            </div>
            <div className="champ">
              <label>Mot de passe :</label>
              <input type="password" name="motDePasse" required />
            </div>
            <button type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    );
  } else if (props.pageActuelle === "Professeur") {
    return (
      <div className="page">
        <div className="contenu">
          <h1>Espace Professeur</h1>
          <form>
            <div className="champ">
              <label>Mot de passe :</label>
              <input type="password" name="motDePasse" required />
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
  const [data,setData]=useState([])

  useEffect(()=>{
    fetch("http://localhost/test.php").then((response)=>response.json()).then((data)=>{
      setData(data)
    })
  },[])

  console.log("data",data)

  const [page,setPage] = useState("élève");


  function action1(x){
    
    setPage(x);
    console.log(x);
  }

  useEffect(() => {document.title= `La page : ${page}`;}, [page]);

  return (
    <>
    <Navbar action2={action1} />
    <Contenu pageActuelle={page} />
    <table>
    <thead>
              <th>Nom</th>
              <th>Note</th>
              <th>Matière</th>
            </thead>
            <tbody>
            {
         data && data.map((item)=>(
         
            <tr key={item.id}> 
              <th>{item.name}</th>
              <th>{item.note}</th>
              <th>{item.subject}</th>
            
            </tr>
            
        ))
      }
            </tbody>
    </table>
      
    </>
  );
}

export default App;
