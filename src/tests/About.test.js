import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testing About component', () => {
  it('verify if the page have the informations of Pokédex', () => {
    const { getByText } = render(<About />);
    const description = getByText(/This application simulates/i);

    expect(description).toBeInTheDocument();
  });

  it('verify if the page have a H2 title with write `About Pokédex`', () => {
    const { getByRole } = render(<About />);
    const pageTitleH2 = getByRole('heading', { level: 2 });

    expect(pageTitleH2.textContent).toBe('About Pokédex');
  });

  it('verify if the page have 2 paragraphs', () => {
    const { getAllByText } = render(<About />);
    // Ajustado após verificar o ok do avaliador
    // PR de referência IvanRafael
    // Acredito que o melhor seria usar o getAllByTitle
    const paragraphs = getAllByText(/pokémons/i);

    expect(paragraphs.length).toBe(2);
  });

  it('test if the page have a specyfic image of Pokedéx', () => {
    const { getByRole } = render(<About />);
    const pokedexImage = getByRole('img');
    const imagePath = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImage.src).toBe(imagePath);
  });
});
