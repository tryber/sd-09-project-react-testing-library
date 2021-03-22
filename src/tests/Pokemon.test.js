import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

test('Teste se é renderizado um card com as informações de determinado pokémon',
  () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const pokeName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokeImg = getByRole('img');
    expect(pokeName).toHaveTextContent(/pikachu/i);
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokeImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg.alt).toBe('Pikachu sprite');
  });

test('Checa link de detalhes tem a URL certa do pkm e exibe o card do pkm certo', () => {
  const { queryByText, history, getByTestId } = renderWithRouter(<App />);
  userEvent.click(queryByText('More details'));
  const pathName = history.location.pathname;
  expect(pathName).toBe('/pokemons/25');
  const pokemonName = getByTestId('pokemon-name');
  const pokemonType = getByTestId('pokemonType');
  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonName).toHaveTextContent(/pikachu/i);
  expect(pokemonType).toHaveTextContent(/electric/i);
  expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getAllByRole, getByText } = renderWithRouter(<App />);
  userEvent.click(getByText('More details'));
  userEvent.click(getByText('Pokémon favoritado?'));
  const favoriteStar = getAllByRole('img');
  expect(favoriteStar[1].src).toContain('/star-icon.svg');
  expect(favoriteStar[1].alt).toBe('Pikachu is marked as favorite');
});
