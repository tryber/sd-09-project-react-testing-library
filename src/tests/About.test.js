import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Requirement 02', () => {
  it('renders About Pokedéx', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutTitle = getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });

    expect(aboutTitle).toBeInTheDocument();
  });

  it('has info about the pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const p1 = getByText(/this application simulates a pokédex,/i);
    const p2 = getByText(/one can filter pokémons by type,/i);

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('has two <p> on the page', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const paragraphs = getAllByText(/Pokémons/);
    expect(paragraphs.length).toBe(2);
  });

  it('src of the image has the specified path', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    const path = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(path);
  });
});
