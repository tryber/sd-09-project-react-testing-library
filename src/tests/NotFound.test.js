import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

// Requisito 4

const renderWithHistory = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{ component }</Router>), history,
  };
};

test('Testa se a página contém um h2 com o texto Page Requested no found', () => {
  const { getByRole, history } = renderWithHistory(<NotFound />);

  history.push('/xablau');

  const notFound = getByRole('heading', { level: 2 });
  expect(notFound).toBeInTheDocument();
  expect(notFound).toHaveTextContent('Page requested not found');
});

test('Testa se a página possui uma imagem na Pokédex', () => {
  const { getAllByRole } = render(<NotFound />);

  const images = getAllByRole('img');
  expect(images[1]).toBeInTheDocument();
  expect(images[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
