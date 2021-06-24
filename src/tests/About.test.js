import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testes na pagina About', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const elementPokedexH2 = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(elementPokedexH2).toBeInTheDocument();
  });

  it('teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const elementP1 = getByText(/This application simulates a Pokédex/i);
    const elementP2 = getByText(/One can filter Pokémons by type, and see/i);
    expect(elementP1).toBeInTheDocument();
    expect(elementP2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imgsrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const elementImg = getByRole('img');
    expect(elementImg.src).toBe(imgsrc);
  });
});
