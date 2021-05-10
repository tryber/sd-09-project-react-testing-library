import React from 'react';
import { fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Pokemon.js', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/More details/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const nameCorrect = screen.getByText('Pikachu');
    expect(nameCorrect).toBeInTheDocument();

    const typeCorrect = screen.getByText('Electric');
    expect(typeCorrect).toBeInTheDocument();

    const averageWeight = screen.getByText('Average weight: 6.0 kg');
    expect(averageWeight).toBeInTheDocument();

    const imagePoke = screen.getByAltText(/Pikachu sprite/i);
    expect(imagePoke).toBeInTheDocument();
    expect(imagePoke.src).toBe(
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });
  // test('Se é feito o redirecionamento da aplicação p a pág de detalhes de Pokémon', (
  // ) => {
  //   const { history } = renderWithRouter(<App />);

  //   const InitialPage = screen.getByText('Encountered pokémons');
  //   expect(InitialPage).toBeInTheDocument();

  //   fireEvent.click(screen.getByText(/More details/i));

  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/pokemons/25');

  //   const detailsPoke = screen.getByText('Pikachu Details');
  //   expect(detailsPoke).toBeInTheDocument();
  // });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/More details/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    fireEvent.click(screen.getByText('Pokémon favoritado?'));
    const pokeFavorite = screen.getByText('Pokémon favoritado?');
    expect(pokeFavorite).not.toBeDisabled();

    const iconsStar = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(iconsStar.src).toMatch('/star-icon.svg');

    fireEvent.click(screen.getByText(/Home/i));

    const iconsStarHome = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(iconsStarHome).toBeInTheDocument();
    expect(iconsStarHome.src).toMatch('/star-icon.svg');
  });
});
