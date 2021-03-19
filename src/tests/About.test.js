import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa a página About', () => {
  it('tests if pokedex details are displayed', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedexDetails = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(pokedexDetails).toBeInTheDocument();
  });
  it('tests if specific image is present', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imagePokedex = getByRole('img');
    expect(imagePokedex).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
  it('tests if there are 2 p tags with relevant info', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const pList = getAllByText(/Pokémons/);
    expect(pList).toHaveLength(2);
  });
});
