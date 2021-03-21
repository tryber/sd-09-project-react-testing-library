import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it(`Testa se é exibido na tela a mensagem No favorite pokemon found,
      se a pessoa não tiver pokémons favoritos.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const pokemonsNotFound = getByText(/No favorite pokemon found/i);
    expect(pokemonsNotFound).toBeInTheDocument();
  });

  it('Testa se são exibidos todos os cards de pokémons favoritados.', () => {
    const { getByAltText, getByLabelText, getByText,
      history } = renderWithRouter(<App />);

    const title = getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();

    const buttonDragon = getByText(/Dragon/i);
    expect(buttonDragon.type).toBe('button');
    fireEvent.click(buttonDragon);

    const moreDetails = getByText(/More details/i);
    expect(moreDetails.href).toBe('http://localhost/pokemons/148');
    fireEvent.click(moreDetails);

    const favorited = getByLabelText(/Pokémon favoritado?/i);
    expect(favorited.type).toBe('checkbox');
    fireEvent.click(favorited);

    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const star = getByAltText(/Dragonair is marked as favorite/i);
    expect(star).toBeInTheDocument();
    expect(star.src).toBe(
      'http://localhost/star-icon.svg',
    );
  });

  // Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.
  // Testado no primeira funçao
});
