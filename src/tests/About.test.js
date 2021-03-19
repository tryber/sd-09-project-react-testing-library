import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

afterEach(cleanup);

describe('About.js tests', () => {
  it('should contain info about Pokédex', () => {
    renderWithRouter(<About />);
    expect(screen.queryAllByText(/Pokédex/)).not.toHaveLength(0);
  });
  it('should contain a heading with "About Pokédex"', () => {
    renderWithRouter(<About />);
    const pokedexHeading = screen
      .getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(pokedexHeading).toBeInTheDocument();
  });
  it('should have two descriptive paragraphs', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/(\w+ ){3,}/);
    expect(paragraphs).toHaveLength(2);
  });
  it('should have a Pokédex image', () => {
    renderWithRouter(<About />);
    const imgSrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', imgSrc);
  });
});
