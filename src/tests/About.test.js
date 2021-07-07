import React from 'react';
import About from '../components/About';
import RenderWithRouter from '../services/RenderWithRouter';

describe('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  it('Testa se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = RenderWithRouter(<About />);
    const abtPokedex = getByText('About Pokédex');
    expect(abtPokedex).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = RenderWithRouter(<About />);
    const p1g = getByText('This application simulates a Pokédex', { exact: false });
    const p2g = getByText('One can filter Pokémons by type, and see m', { exact: false });
    expect(p1g).toBeInTheDocument();
    expect(p2g).toBeInTheDocument();
  });

  it('Testa se a página contém uma imagem de uma Pokédex', () => {
    const { getByRole } = RenderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
