import React from 'react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Testando o componente <About.js />', () => {
  test('Testa se a página contém as informações sobre a Pokédex.', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const aboutPokedexParagraphs = getAllByText(/Pokédex/i);

    expect(aboutPokedexParagraphs.length).toBe(2);
  });

  test('Testa se a página contém um heading h2 com o texto "About Pokédex"', () => {
    const { getByRole, getByText } = renderWithRouter(<About />);

    const headingH2 = getByRole('heading', {
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();

    const headingH2Text = getByText('About Pokédex');
    expect(headingH2Text).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const paragraphs = getAllByText(/Pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  test('Testa se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByRole } = renderWithRouter(<About />);

    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
