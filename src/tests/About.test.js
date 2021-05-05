import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('2. Testa o componente <About.js />.', () => {
  it('Testa se a página contém um <h2> com o texto "About Pokédex".', () => {
    const { getByRole } = renderWithRouter(<About />);

    const heading = getByRole('heading');

    expect(heading.nodeName).toBe('H2');
    expect(heading.innerHTML).toBe('About Pokédex');
    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const paragraphs = getAllByText(/Pokémons/i);
    console.log(paragraphs.length);

    expect(paragraphs.length).toBe(2);
  });

  it('Testa se a página contém uma determinada imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const pokedexImg = getByAltText('Pokédex');

    const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImg.src).toBe(src);
    expect(pokedexImg).toBeInTheDocument();
  });
});
