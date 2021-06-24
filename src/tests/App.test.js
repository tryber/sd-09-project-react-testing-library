import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes na pagina App', () => {
  it('Página principal Pokédex é renderizada ao carregar no caminho de URL /', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Pokédex/i)).toBeInTheDocument();
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('Topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/About/i)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  it('Aplicação é redirecionada para a página inicial, ao clicar em Home', () => {
    const { getByText } = renderWithRouter(<App />);
    userEvent.click(getByText(/Home/i));
    expect(getByText(/Pokédex/i)).toBeInTheDocument();
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('Aplicação é redirecionada para a página About, ao clicar em About', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    userEvent.click(getByText(/About/i));
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
    // tirando a prova do expect acima
    const elementPokedex = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(elementPokedex).toBeInTheDocument();
  });

  it('Aplicação é redirecionada para a página Favoritados, ao clicar em Favorite', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    userEvent.click(getByText(/Favorite Pokémons/i));
    const elementFavorite = getByRole('heading', { level: 2, name: 'Favorite pokémons' });
    expect(elementFavorite).toBeInTheDocument();
  });

  it('Aplicação é redirecionada para a página Not Found, em URL desconhecida.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/url_desconhecida');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
