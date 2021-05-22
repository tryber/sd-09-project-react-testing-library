import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste do component About', () => {
  it('Contém heading', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/about');
    const heading = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument('About Pokédex');
  });

  it('Contém dois parágrafos', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const primeiro = getByText(/This application simulates/);
    const segundo = getByText(/One can filter Pokémons/);
    expect(primeiro).toBeInTheDocument();
    expect(segundo).toBeInTheDocument();
  });

  it('Contém uma img específica ', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/about');
    const image = getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
