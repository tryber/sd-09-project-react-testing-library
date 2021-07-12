import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Componente About.js', () => {
  it('A página contém as informações sobre a Pokédex.',
    () => {
    // acessa o elemento
      renderWithRouter(<About />);
      const aboutPokedex = screen.getByText('About Pokédex');
      // faça o teste
      expect(aboutPokedex).toBeInTheDocument();
    });

  it('A página contém um heading h2 com o texto About Pokédex',
    () => {
      // acessa o elemento
      renderWithRouter(<About />);
      const aboutParagraph = screen.getByRole('heading', {
        level: 2,
        name: /About Pokédex/i,
      });
      // faça o teste
      expect(aboutParagraph).toBeInTheDocument();
    });

  it('A página contém dois parágrafos com texto sobre a Pokédex.',
    () => {
      // acessa o elemento
      renderWithRouter(<About />);
      const aboutTexts = screen.getAllByText(/Pokémons/i);
      // faça o teste
      expect(aboutTexts.length).toBe(2);
    });

  it('A página contém a imagem de uma Pokédex', () => {
    // acessa o elemento
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    // faça o teste
    expect((image).src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
