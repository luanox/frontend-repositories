import React, { useState, useEffect} from "react";

import "./styles.css";
import api from './services/api'

function App() {

  const [repositories, setRepositorie] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositorie(response.data)
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })

    
    const repository = response.data;

    setRepositorie([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    repositories.splice(repositories
      .findIndex((repository) => repository.id === id), 1);
      setRepositorie([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
