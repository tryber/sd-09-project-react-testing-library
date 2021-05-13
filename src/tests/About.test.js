import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('requisito 2, testa componente About', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutInfo = getByText(/This application simulates a Pokédex/i);
    expect(aboutInfo).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutHeading = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutHeading).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(/This application simulates a Pokédex/i);
    expect(paragraph1).toBeInTheDocument();

    const paragraph2 = getByText(/One can filter Pokémons by type/i);
    expect(paragraph2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
