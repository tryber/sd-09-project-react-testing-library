import React from 'react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('test About.js component', () => {
  it('test if a heading is rendered', () => {
    const { getByRole, getByText } = renderWithRouter(<About />);
    const about = getByRole('heading', { level: 2, name: 'About Pokédex' });
    const text = [
      'This application simulates a Pokédex',
      ' a digital encyclopedia containing all Pokémons',
    ];

    const p1 = getByText(text.join());
    const text2 = [
      'One can filter Pokémons by type',
      ' and see more details for each one of them',
    ];
    const p2 = getByText(text2.join());

    expect(about).toBeInTheDocument();
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('test if there are 2 paragraphs', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const paragraphs = getAllByText(/Pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  it('test if there is a pokédex image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
