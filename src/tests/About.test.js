import React from 'react';
import RenderWithRouter from '../services/RenderWithRouter';
import About from '../components/About';

describe('Testa o componente <About.js />', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = RenderWithRouter(<About />);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = RenderWithRouter(<About />);
    const p1 = getByText(/This application simulates a Pokédex/i);
    const p2 = getByText(/One can filter Pokémons by type/i);
    [p1, p2].forEach((p) => expect(p).toBeInTheDocument());
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByAltText } = RenderWithRouter(<About />);
    const image = getByAltText(/Pokédex/i);
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
