import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testando o componente <About />', () => {
  it('Verifica se a página contém o texto "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);

    const textHeading = getByRole('heading', { level: 2 });

    expect(textHeading).toBeInTheDocument();
    expect(textHeading).toHaveTextContent('About Pokédex');
  });

  it('Verifica se a página contém dois parágrafos', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const lengthParagraph = getAllByText(/Pokémons/i);

    expect(lengthParagraph.length).toBe(2);
  });

  it('Verifica se a página contém uma imagem', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imageURL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const image = getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imageURL);
  });
});
