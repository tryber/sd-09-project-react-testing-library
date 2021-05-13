import React from 'react';
import renderWithRouter from './help-test/renderWithRouter';
import About from '../components/About';

describe('About page', () => {
  test('should contain an h2 heading with the text About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading.textContent).toBe('About Pokédex');
  });

  test('should contain two paragraphs with text about Pokédex.', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const paragraphs = getAllByText(/Pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  test('should contain the correct image of a Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    expect(image.src)
      .toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
