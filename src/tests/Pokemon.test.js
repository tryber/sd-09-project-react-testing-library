import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testando <pokemon />', () => {
  test('testando informações sobre pokemon', () => {
    const {
      getByRole,
      getByTestId,
      getByAltText,
      getByText,
    } = renderWithRouter(<App />);
    const buttonProx = getByRole('button', { name: /próximo pokémon/i });
    pokemons.forEach((pokemon) => {
      const name = getByTestId('pokemon-name');
      const type = getByTestId('pokemonType');
      const weight = getByTestId('pokemon-weight');
      const img = getByAltText(`${pokemon.name} sprite`);
      const { value, measurementUnit } = pokemon.averageWeight;
      const textWeight = `Average weight: ${value} ${measurementUnit}`;
      const details = getByText(/more details/i);
      expect(name.textContent).toBe(pokemon.name);
      expect(type.textContent).toBe(pokemon.type);
      expect(weight.textContent).toBe(textWeight);
      expect(img).toBeInTheDocument();
      expect(img.src).toBe(`${pokemon.image}`);
      expect(details.href).toBe(`http://localhost/pokemons/${pokemon.id}`);
      userEvent.click(buttonProx);
    });
  });
  test('testando pagina de detalhes', () => {
    const { getByAltText, history, getByText } = renderWithRouter(<App />);
    const details = getByText(/more details/i);
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favorite = getByText(/pokémon favoritado/i);
    userEvent.click(favorite);
    const pikachuStar = getByAltText(/pikachu is marked as favorite/i);
    expect(pikachuStar).toBeInTheDocument();
    expect(pikachuStar.src).toBe('http://localhost/star-icon.svg');
  });
});
