import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Testando a página About', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutText = getByText(/This application simulates a Pokédex/i);

    expect(aboutText).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutHeading = getByRole('heading');

    expect(aboutHeading).toBeInTheDocument();
    expect(aboutHeading.innerHTML).toBe('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const paragraphs = getAllByText(/Pokémons/i);

    expect(paragraphs.length).toBe(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutPokedexImage = getByRole('img');
    const pokedexImageURL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(aboutPokedexImage).toBeInTheDocument();
    expect(aboutPokedexImage.getAttribute('src')).toBe(pokedexImageURL);
  });
});
