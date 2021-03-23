import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

afterEach(cleanup);

const clickNextButton = () => userEvent.click(screen.getByTestId('next-pokemon'));

const favoritePokemonAndGetItsName = (props = { uncheck: false }) => {
  const moreDetailsLink = screen.getByText('More details');
  userEvent.click(moreDetailsLink);
  const favoriteCheckbox = screen.getByLabelText(/Pokémon favoritado\?/);
  userEvent.click(favoriteCheckbox);
  if (props.uncheck) userEvent.click(favoriteCheckbox);
  return screen.getByTestId('pokemon-name').innerHTML;
};

describe('FavoritePokemons.js tests', () => {
  it('should display "No favorite pokemon found" if receives an empty array', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(screen.queryByText('No favorite pokemon found')).toBeInTheDocument();
  });
  it('should display all Pokémon cards marked as favorite',
    () => {
      const { history } = renderWithRouter(<App />);
      const favoritedPokemonsNames = [];
      clickNextButton();
      favoritedPokemonsNames.push(favoritePokemonAndGetItsName());
      history.goBack();
      clickNextButton();
      clickNextButton();
      favoritedPokemonsNames.push(favoritePokemonAndGetItsName());
      history.push('/favorites');
      const pokemonsNamesInFavoritesPage = screen.queryAllByTestId('pokemon-name');
      expect(pokemonsNamesInFavoritesPage).toHaveLength(2);
      expect(pokemonsNamesInFavoritesPage[0])
        .toHaveTextContent(favoritedPokemonsNames[0]);
      expect(pokemonsNamesInFavoritesPage[1])
        .toHaveTextContent(favoritedPokemonsNames[1]);
    });
  it('should not display any as favorite if none is marked',
    () => {
      const { history } = renderWithRouter(<App />);
      const favoritedPokemonsNames = [];
      clickNextButton();
      favoritedPokemonsNames.push(favoritePokemonAndGetItsName({ unckeck: true }));
      history.goBack();
      clickNextButton();
      clickNextButton();
      favoritedPokemonsNames.push(favoritePokemonAndGetItsName({ unckeck: true }));
      history.push('/favorites');
      const pokemonsNamesInFavoritesPage = screen.queryAllByTestId('pokemon-name');
      expect(pokemonsNamesInFavoritesPage).toHaveLength(0);
    });
});
