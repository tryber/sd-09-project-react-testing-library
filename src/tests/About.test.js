import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('testing ABout page', () => {
  it('verifica se a página contem informacoes do about', () => {
    const { getByText } = render(<About />);
    const aboutText = getByText(/About Pokédex/i);
    expect(aboutText).toBeInTheDocument();
  });
  it('verifica se tela ABout tem h2', () => {
    const { getByRole } = render(<About />);
    const headingH2 = getByRole('heading', { text: /About Pokédex/ });
    expect(headingH2).toBeInTheDocument('');
  });
  it('verifica se tela ABout tem 2 spans', () => {
    const { getAllByText } = render(<About />);
    const paragraphs = getAllByText(/Pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  it('verifica se tela ABout tem imagem do gameBoy', () => {
    const { getByAltText } = render(<About />);
    const expectedimagePath = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByAltText(/Pokédex/i);
    expect(image.src).toBe(expectedimagePath);
    expect(image.alt).toBe('Pokédex');
  });
});
