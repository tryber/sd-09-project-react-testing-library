import React from 'react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../services/RenderWithRouter';
import data from '../data';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  test('Testa se renderiza informações de determinado pokémon.', () => {
    const { getByTestId, getByAltText } = RenderWithRouter(<App />);
    const title = getByTestId(/pokemon-name/i);
    const type = getByTestId(/pokemonType/i);
    const weight = getByTestId(/pokemon-weight/i);
    const img = getByAltText(/Pikachu sprite/i);
    expect(title).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Testa se contém um link de navegação para exibir detalhes', () => {
    const { getByText, history, getByRole } = RenderWithRouter(<App />);
    const link = getByText(/More details/i);
    const pokemonId = data[0].id;
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const { pathname } = history.location;
    const h2details = getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(pathname).toBe(`/pokemons/${pokemonId}`);
    expect(h2details).toBeInTheDocument();
  });
  test('Testa se contém um link de navegação para exibir detalhes', () => {
    const { getByText, getByAltText } = RenderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    userEvent.click(moreDetails);
    const checkFavorite = getByText(/Pokémon favoritado?/i);
    userEvent.click(checkFavorite);
    const img = getByAltText(/Pikachu is marked as favorite/i);
    expect(img.src).toBe('http://localhost/star-icon.svg');
  });
});
