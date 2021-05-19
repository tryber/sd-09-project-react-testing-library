import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito 7, o último', () => {
  test('Se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const { queryByText, getByRole } = renderWithRouter(<App />);

    userEvent.click(queryByText(/more details/i));

    expect(queryByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    expect(queryByText(/more details/i)).not.toBeInTheDocument();
    expect(getByRole('heading', { level: 2, name: 'Summary' }));
    expect(queryByText(/this intelligent pokémon roasts hard/i)).toBeInTheDocument();
  });

  test('Se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { queryByText, queryAllByAltText, getByRole } = renderWithRouter(<App />);

    userEvent.click(queryByText(/more details/i));

    expect(queryByText(/game locations/i)).toBeInTheDocument();

    const gameLocationsHeader = getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    });

    expect(gameLocationsHeader).toBeInTheDocument();

    const locations = queryAllByAltText(/pikachu location/i);
    expect(locations.length).toEqual(2);
    expect(locations[0]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(locations[1]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });
  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { queryByText } = renderWithRouter(<App />);
    userEvent.click(queryByText(/more details/i));
    expect(queryByText(/pokémon favoritado/i)).toBeInTheDocument();
  });
});
