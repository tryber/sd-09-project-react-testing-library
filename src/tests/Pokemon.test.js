import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('É renderizado um card com as informações de determinado pokémon.', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);

  expect(getByTestId(/pokemon-name/i)).toContainHTML('Pikachu');
  expect(getByTestId(/pokemonType/i)).toContainHTML('Electric');
  expect(getByTestId(/pokemon-weight/i)).toContainHTML('Average weight: 6.0 kg');
  expect(getByAltText(/pikachu\ssprite/i).src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('O card do Pokémon contém um link de nav para exibir detalhes.', () => {
  const { getByRole } = renderWithRouter(<App />);

  const moreDetailsLink = getByRole('link', { name: 'More details' });
  expect(moreDetailsLink).toBeDefined();
});

test('Ao clicar no link de navegação do Pokémon, é redirecionado para Detalhes', () => {
  const { history, getByRole } = renderWithRouter(<App />);

  const moreDetailsLink = getByRole('link', { name: 'More details' });
  userEvent.click(moreDetailsLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('Existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  history.push('/pokemons/25');
  const favoriteChecked = getByRole('checkbox');
  userEvent.click(favoriteChecked);
  const favoriteIcon = getByRole('img', { name: 'Pikachu is marked as favorite' });
  expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
});
