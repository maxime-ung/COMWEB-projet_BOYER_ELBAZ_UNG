import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <main className="conteneur">
        <form className="formulaire">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input type="text" id="username" name="username" placeholder="Entrez votre nom" />

          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" placeholder="Entrez votre mot de passe" />

          <button type="submit">Envoyer</button>
        </form>
      </main>
    </>
  )
}

export default App


