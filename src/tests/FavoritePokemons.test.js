import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

const renderWithHistory = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{ component }</Router>), history,
  };
};

test('Testa se é exibido a mensagem que o pokemon favorito não foi encontrado', () => {
  const { getByText } = render(<FavoritePokemons />);

  const favoriteNotFound = getByText('No favorite pokemon found');
  expect(favoriteNotFound).toBeInTheDocument();
});

test('Testa se todos os cards pokemon favoritados são exibidos', () => {
  const { getByText, getByRole, queryByText } = renderWithHistory(<App />);

  const moreDetails = getByText('More details');
  expect(moreDetails).toBeInTheDocument();
  userEvent.click(moreDetails);
  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  const favoritePokemons = getByText('Favorite Pokémons');
  userEvent.click(favoritePokemons);
  const favoriteNotFound = queryByText('No favorite pokemon found');
  expect(favoriteNotFound).toBeNull();
});
