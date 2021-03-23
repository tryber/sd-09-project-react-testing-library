import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutTxt = getByText(/This application simulates/i);

    expect(aboutTxt).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const headingTxt = getByRole('heading');

    expect(headingTxt).toBeInTheDocument();
    expect(headingTxt.innerHTML).toBe('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const paragrafos = getAllByText(/Pokémons/i);

    expect(paragrafos.length).toBe(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedexImg = getByRole('img');
    const imgUrl = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.getAttribute('src')).toBe(imgUrl);
  });
});
