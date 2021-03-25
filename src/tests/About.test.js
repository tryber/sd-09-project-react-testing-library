import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente About', () => {
  // it('Testa se a página contém informações sobre a pokedex', () => {

  // });

  it('Testa se a página contém um h2 com o texto About Pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutText = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutText).toBeInTheDocument();
  });

  it('Testa se a aplicação possui 2 parágrafos', () => {
    const { getByText } = renderWithRouter(<About />);
    const p1 = getByText(/This application simulates a Pokédex/i);
    expect(p1).toBeInTheDocument();
    const p2 = getByText(/One can filter Pokémons by type/i);
    expect(p2).toBeInTheDocument();
  });

  it('Testa se a aplicação possui uma imagem específica', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
