import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Test <About />', () => {
  const paragraphs = [
    'This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons',
    'One can filter Pokémons by type, and see more details for each one of them',
  ];

  it('renders a heading level 2 written "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test('if page contains two paragraphs', () => {
    const { getByText } = renderWithRouter(<About />);

    paragraphs.forEach((p) => (
      expect(getByText(p)).toBeInTheDocument()
    ));
  });

  it('renders an image of a Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img', { name: /Pokédex/i });

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
