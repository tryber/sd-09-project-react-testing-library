import React from 'react';
import { About } from '../components';
import renderWithRouter from '../helper/renderWithRouter';

describe('Requirement 2: Component About tests', () => {
  it('Renders About page', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });
  it('Renders h2 About Pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);
    expect(getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    })).toBeInTheDocument();
  });
  it('Renders paragraphs About Pokedex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    expect(getAllByText(/Pokémons/).length).toBe(2);
  });
  it('Renders pokedex img', () => {
    const { getByRole } = renderWithRouter(<About />);
    expect(getByRole('img').src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
