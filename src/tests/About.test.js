import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testando About.js', () => {
  test('Testando se renderiza um elemento h2 corretamente', () => {
    const { getByRole } = renderWithRouter(<About />);

    const h2 = getByRole('heading', { level: 2, name: /About Pokédex/i });

    expect(h2).toBeInTheDocument();
  });
  test('Testando de renderiza dois paragrafos corretamente', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const paragraphs = getAllByText(/Pokémons/i);
    expect(paragraphs.length).toBe(2);
  });
  test('Testando src da Img', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const img = getByAltText(/Pokédex/i);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
