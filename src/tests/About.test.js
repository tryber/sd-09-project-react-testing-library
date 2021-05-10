import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste do componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const regex = new RegExp('This application simulates a Pokédex', 'i');
    renderWithRouter(<About />);
    expect(screen.getByText(regex)).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const h2Element = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(h2Element).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs).toHaveLength(2);
  });

  it('Teste se a página contém a imagem da Pokedex', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
