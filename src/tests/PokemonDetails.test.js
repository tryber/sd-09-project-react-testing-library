import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Requirement 7: Component PokemonDetails', () => {
  it('Tests pokemon informations render', () => {
    const { queryByText, getByRole } = renderWithRouter(<App />);
    userEvent.click(queryByText(/More Details/i));
    expect(queryByText(/Pikachu Details/i)).toBeInTheDocument();
    expect(queryByText(/More Details/i)).not.toBeInTheDocument();
    expect(getByRole('heading', {
      level: 2, name: /Summary/i,
    })).toBeInTheDocument();
    const paragraph = queryByText(/This intelligent Pokémon/i);
    expect(paragraph).toBeInTheDocument();
  });
  it('Tests maps section render', () => {
    const { getAllByRole, getByText, getByRole } = renderWithRouter(<App />);
    userEvent.click(getByText(/More Details/i));
    expect(getByRole('heading', {
      level: 2, name: /Game Locations of Pikachu/i,
    })).toBeInTheDocument();
    const imgs = getAllByRole('img').filter((img) => img.alt === 'Pikachu location');
    expect(imgs.length).toBe(2);
    expect(imgs[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgs[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Tests whether it is possible to favor the pokemon', () => {
    const { getByText, queryAllByRole, getByLabelText } = renderWithRouter(<App />);
    userEvent.click(getByText(/More Details/i));
    const checkBox = getByLabelText('Pokémon favoritado?');
    if (!(checkBox.checked)) {
      userEvent.click(checkBox);
    }
    expect(queryAllByRole('img')
      .filter((img) => img.alt === 'Pikachu is marked as favorite').length).toBe(1);
    userEvent.click(checkBox);
    expect(queryAllByRole('img')
      .filter((img) => img.alt === 'Pikachu is marked as favorite').length).toBe(0);
  });
});
