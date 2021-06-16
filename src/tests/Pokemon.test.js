import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('testa o component Pokemon.js', () => {
  test('testa o card com as infos de cada Pokemon', () => {
    const { getByTestId, getByRole, history } = renderWithRouter(<App />);
    const pokeName = getByTestId('pokemon-name').textContent;
    const pokeType = getByTestId('pokemonType').textContent;
    const pokeObj = pokemons.find((pokemon) => (
      pokemon.name === pokeName
    ));
    expect(pokeType).toBe(`${pokeObj.type}`);

    const pokeWeight = getByTestId('pokemon-weight').textContent;
    const { averageWeight: { value, measurementUnit } } = pokeObj;
    expect(pokeWeight).toBe(`Average weight: ${value} ${measurementUnit}`);

    const pokeImg = getByRole('img', { alt: `${pokeName} sprite` });
    expect(pokeImg.src).toBe(`${pokeObj.image}`);
    expect(pokeImg.alt).toBe(`${pokeName} sprite`);

    const detailsLink = getByRole('link', { name: 'More details' });
    expect(detailsLink.href).toBe(`http://localhost/pokemons/${pokeObj.id}`);
    fireEvent.click(detailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${pokeObj.id}`);

    const favQuestion = getByRole('checkbox', { checked: false });
    expect(favQuestion).not.toBeChecked();
    fireEvent.click(favQuestion);
    expect(favQuestion).toBeChecked();

    const starFavorite = getByRole('img', { name: `${pokeName} is marked as favorite` });
    expect(starFavorite.src).toBe('http://localhost/star-icon.svg');
  });
});
