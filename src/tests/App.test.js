import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Test component App', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('App contém links de navegação Home, About e Favorite Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('Link Home redireciona para pagina "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('Home'));
    expect(history.location.pathname).toBe('/');
  });

  it('Link About redireciona para pagina "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('About'));
    expect(history.location.pathname).toBe('/about');
  });

  it('Link Home redireciona para pagina "/favorites"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('Favorite Pokémons'));
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Entrar em pagina desconhecida redireciona para not found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/no-page');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
