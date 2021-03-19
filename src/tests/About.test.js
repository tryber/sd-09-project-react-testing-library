import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o component About', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const aboutHeaading = getByText(/About Pokédex/i);
    expect(aboutHeaading).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { queryAllByText } = renderWithRouter(<About />);

    const paragraphs = queryAllByText(/Pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const imgUrl = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { getByRole } = renderWithRouter(<About />);

    const aboutImg = getByRole('img');
    expect(aboutImg.src).toBe(imgUrl);
  });
});
