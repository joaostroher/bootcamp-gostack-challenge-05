import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import {
  Loading,
  Owner,
  IssueList,
  IssuesFilters,
  IssuesFiltersButton,
  IssueListPagination,
  IssueListPaginationButton,
} from './styles';
import Container from '../../components/Container';

export default function Repository({ match }) {
  const [repository, setRepository] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState([]);
  const [filter, setFilter] = useState('open');
  const [page, setPage] = useState(1);
  const repoName = decodeURIComponent(match.params.repository);

  const getIssuesRequest = useCallback(() => {
    return api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
        page,
      },
    });
  }, [repoName, filter, page]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [resRepository, resIssue] = await Promise.all([
        api.get(`/repos/${repoName}`),
        getIssuesRequest(),
      ]);
      setRepository(resRepository.data);
      setIssues(resIssue.data);
      setLoading(false);
    }
    fetchData();
  }, [match, repoName, getIssuesRequest]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await getIssuesRequest();
      setIssues(response.data);
      setLoading(false);
    }
    fetchData();
  }, [filter, page, getIssuesRequest]);

  useEffect(() => setPage(1), [match, filter]);

  if (loading) {
    return <Loading>Carregando...</Loading>;
  }
  return (
    <Container>
      <Owner>
        <Link to="/">Voltar aos repositórios</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>
      <IssueList>
        <h2>Issues</h2>
        <IssuesFilters>
          <IssuesFiltersButton
            isSelected={filter === 'open'}
            onClick={() => setFilter('open')}
          >
            Abertas
          </IssuesFiltersButton>
          <IssuesFiltersButton
            isSelected={filter === 'closed'}
            onClick={() => setFilter('closed')}
          >
            Fechadas
          </IssuesFiltersButton>
          <IssuesFiltersButton
            isSelected={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            Todas
          </IssuesFiltersButton>
        </IssuesFilters>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {issue.title}
                </a>
                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
        <IssueListPagination>
          <IssueListPaginationButton
            type="button"
            disabled={page === 1}
            onClick={() => setPage(Math.max(1, page - 1))}
          >
            Página Anterior
          </IssueListPaginationButton>
          <IssueListPaginationButton
            type="button"
            disabled={issues.length < 5}
            onClick={() => setPage(page + 1)}
          >
            Próxima Página
          </IssueListPaginationButton>
        </IssueListPagination>
      </IssueList>
    </Container>
  );
}
Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
