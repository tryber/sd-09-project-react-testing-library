import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRoute';

describe('Testa requisito 1 componente App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Testa se renderiza os links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const favorite = getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página about', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText(/About/i);
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favorite = getByText(/Favorite Pokémons/i);
    userEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página NotFound', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/notfound');
    expect(history.location.pathname).toBe('/notfound');
    const notfound = getByText(/not found/);
    expect(notfound).toBeInTheDocument();
  });
});
