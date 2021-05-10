import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('Test component About', () => {
  it('Página contém informações sobre Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const info = getByText(
      'This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons',
    );
    expect(info).toBeInTheDocument();
  });

  it('Página contém h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    expect(getByRole('heading')).toBeInTheDocument();
    expect(getByRole('heading').textContent).toBe('About Pokédex');
  });

  it('Página contém 2 paragrafos com o texto Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);

    expect(getAllByText(/Pokédex/).length).toBe(2);
  });

  it('Página contém imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    expect(getByRole('img').src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
