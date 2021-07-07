import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Test Component PokemonDetails', () => {
  it('should contain Detail text in name tag', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const moreDetailsButton = screen.getByText('More details');
    userEvent.click(moreDetailsButton);
    const pokemonName = screen.getAllByRole('heading', { level: 2 });

    expect(pokemonName[0].innerHTML).toBe('Pikachu Details');
    expect(pokemonName[1].innerHTML).toBe('Summary');

    const poke = screen.getByText(/This/);
    expect(poke.innerHTML).toContain('This intelligent');

    expect(pokemonName[2].innerHTML).toBe('Game Locations of Pikachu');

    const locations = screen.getAllByText(/Kanto/);
    const imgLocations = screen.getAllByAltText('Pikachu location');
    expect(locations.length).toBe(2);
    expect(locations[0].innerHTML).toBe('Kanto Viridian Forest');
    expect(imgLocations[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1].innerHTML).toBe('Kanto Power Plant');
    expect(imgLocations[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const favorite = screen.getByLabelText('Pokémon favoritado?');
    const tag = favorite.parentNode;
    expect(tag.firstChild.textContent).toBe('Pokémon favoritado?');
  });
});
