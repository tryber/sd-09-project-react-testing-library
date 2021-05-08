import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Requisito 02 - About.js', () => {
  it('Testa se a pág contém informações sobre a "Pokédex".', () => {
    const { getByText } = renderWithRouter(<About />);

    const info = getByText(/This application simulates a Pokédex/i);
    expect(info).toBeInTheDocument();
  });

  it('Testa se a pág contém um heading "h2" com "About Pokédex".', () => {
    const { getByRole } = renderWithRouter(<About />);

    const title = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(title).toBeInTheDocument();
  });

  it('Testa se a pág contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const paragraphs = getAllByText(/Pokémons/i);

    expect(paragraphs.length).toBe(2);
  });

  it('Testa se a pág contém a imagem de uma Pokédex com url expecífica', () => {
    const { getByRole } = renderWithRouter(<About />);

    const image = getByRole('img');

    expect(image.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
