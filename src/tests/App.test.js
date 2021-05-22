import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('Testes para o componente <App />', () => {
  it('Verifica de o texto `Pokédex` foi renderizado', () => {
    renderWithRouter(<App />);

    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Verifica se o primeiro link possui o texto `Home`', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByText(/Home/i);
    const linkAbout = screen.getByText(/About/i);
    const linkFavorite = screen.getByText(/Favorite Pokémons/i);

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });
});
