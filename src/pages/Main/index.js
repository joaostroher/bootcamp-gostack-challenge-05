import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, SubmitButton, List, RepoInput } from './styles';
import Container from '../../components/Container';

import api from '../../services/api';

// import { Container } from './styles';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [newRepo]);

  useEffect(() => {
    const r = JSON.parse(localStorage.getItem('repositories'));
    if (r) setRepositories(r);
  }, []);

  useEffect(() => {
    if (repositories)
      localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (repositories.find(repository => repository.name === newRepo))
        throw new Error('Repositório duplicado');
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };
      setRepositories([...repositories, data]);
      setNewRepo('');
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>
      <Form onSubmit={handleSubmit}>
        <RepoInput
          type="text"
          placeholder="Adicionar Repositório"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          hasError={error}
        />
        <SubmitButton isLoading={loading}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>
      <List>
        {repositories.map(repository => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
