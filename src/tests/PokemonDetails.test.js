import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('testando <Pokemon Details />', () => {
  test('testando se informações detalhadas são mostradas', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);
    const h2Pikachu = getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(h2Pikachu).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const summary = getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();
    const pikachuSummary = getByText(pokemons[0].summary);
    expect(pikachuSummary).toBeInTheDocument();
  });
  test('Testando localizações do pokémon', () => {
    const { getByRole, getByText, getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);
    const h2Locations = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(h2Locations).toBeInTheDocument();
    pokemons[0].foundAt.forEach((element) => {
      const nameLocation = getByText(element.location);
      expect(nameLocation).toBeInTheDocument();
      const imgLocation = getAllByAltText('Pikachu location');
      expect(imgLocation[0]).toBeInTheDocument();
      expect(imgLocation[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(imgLocation[1]).toBeInTheDocument();
      expect(imgLocation[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
      const favorite = getByRole('checkbox', { name: /pokémon favoritado/i });
      expect(favorite).toBeInTheDocument();
    });
  });
});
