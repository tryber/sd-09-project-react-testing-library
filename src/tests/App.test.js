import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('MemoryRouter', () => {
  const expectedFavPokemonsText = 'Favorite Pokémons';
  const renderApp = () => renderWithRouter(<App />);
  it('Teste se a página principal da Pokédex é renderizada', () => {
    const { getByText } = renderApp();
    const home = getByText(/pokémons/);

    expect(home).toBeInTheDocument();
  });
  it('Teste se a aplicação contém um conjunto de links de navegação.', () => {
    const { getAllByRole } = renderApp();
    const listLinks = getAllByRole('link');
    const lengthLinks = 4;

    expect(listLinks.length).toBe(lengthLinks);

    expect(listLinks[0]).toBeInTheDocument();
    expect(listLinks[0].innerHTML).toBe('Home');

    expect(listLinks[1]).toBeInTheDocument();
    expect(listLinks[1].innerHTML).toBe('About');

    expect(listLinks[2]).toBeInTheDocument();
    expect(listLinks[2].innerHTML).toBe(expectedFavPokemonsText);

    expect(listLinks[3]).toBeInTheDocument();
    expect(listLinks[3].innerHTML).toBe('More details');
  });
  it('test links - Home - About - Favorite Pokémons', () => {
    const { getByText } = renderApp();
    const home = getByText('Home');
    const about = getByText('About');
    const favPokemons = getByText(expectedFavPokemonsText);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPokemons).toBeInTheDocument();
  });
  it('test links /about , /favorites e /NotFound', () => {
    const { getByText, history } = renderApp();
    const home = getByText('Home');
    const about = getByText('About');
    const favovirites = getByText(expectedFavPokemonsText);

    history.push('/invalidurlroute');

    expect(home.getAttribute('href')).toBe('/');
    expect(about.getAttribute('href')).toBe('/about');
    expect(favovirites.getAttribute('href')).toBe('/favorites');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
