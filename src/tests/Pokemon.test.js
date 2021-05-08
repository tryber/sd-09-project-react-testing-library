import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('6. Teste o componente <Pokemon.js />', () => {
  it('Test if a card with the information of a certain Pokémon is rendered', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const namePokemon = getByTestId('pokemon-name');
    const typePokemon = getByTestId('pokemonType');
    const averageWeightPokemon = getByTestId('pokemon-weight');
    const imagePokemon = getByRole('img');

    expect(namePokemon.textContent).toBe('Pikachu');
    expect(typePokemon.textContent).toBe('Electric');
    expect(averageWeightPokemon.textContent).toBe('Average weight: 6.0 kg');
    expect(imagePokemon.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagePokemon.alt).toBe('Pikachu sprite');
  });

  it('Pokémon card contains a navigation link to view the details', () => {
    const { getByRole } = renderWithRouter(<App />);

    const linkMoreDetails = getByRole('link', {
      name: /more details/i,
    });

    expect(linkMoreDetails.href).toBe('http://localhost/pokemons/25');
  });

  it('Tests if you click on the Pokémon navigation link, URL changes', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkMoreDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);
    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  it('Test if there is a star icon in your favorite Pokémon', () => {
    const { getByRole, getAllByRole, getByLabelText } = renderWithRouter(<App />);

    const linkMoreDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const favoritePokemon = getByLabelText(/favoritado/i);
    userEvent.click(favoritePokemon);

    const image = getAllByRole('img')[1];
    expect(image.src).toBe('http://localhost/star-icon.svg');
    expect(image.alt).toBe('Pikachu is marked as favorite');
  });
});
