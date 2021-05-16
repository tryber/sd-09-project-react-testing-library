import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('testa a tela about', () => {
  test('renders a reading with the text `About Pokedex`', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });

  it('verifica se há dois paragrafos', () => {
    const { getByText } = renderWithRouter(<About />);
    const p1 = getByText(/this application simulates a pokédex/i);
    expect(p1).toBeInTheDocument();
    const p2 = getByText(/one can filter pokémons by type/i);
    expect(p2).toBeInTheDocument();
  });

  it('verifica se tem a imagem', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
