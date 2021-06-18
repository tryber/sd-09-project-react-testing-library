import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritesPokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testing page Favorite Pokémons', () => {
  it('verify if the message is render when no have favorite Pokémon', () => {
    const { getByText } = render(<FavoritesPokemons />);
    const noPokemonFoundMessage = getByText(/No favorite pokemon found/i);

    expect(noPokemonFoundMessage).toBeInTheDocument();
  });

  it('test if all favorites pokémons are in favorite page', () => {
    const {
      getByText,
      getByLabelText,
      getAllByTestId,
      getAllByRole,
    } = renderWithRouter(<App />);

    // Pokémon 1 - First eletric Pokémon
    let typeButtons = getAllByRole('button');
    userEvent.click(typeButtons[1]);
    let moreDetailsLink = getByText(/More Details/i);
    userEvent.click(moreDetailsLink);
    let favoritePokemon = getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favoritePokemon);
    let linkHome = getByText(/Home/i);
    userEvent.click(linkHome);

    // Pokémon 2 - First fire Pokémon
    typeButtons = getAllByRole('button');
    userEvent.click(typeButtons[2]);
    moreDetailsLink = getByText(/More Details/i);
    userEvent.click(moreDetailsLink);
    favoritePokemon = getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favoritePokemon);
    linkHome = getByText(/Home/i);
    userEvent.click(linkHome);

    // Pokémon 3 - First bug Pokémon
    typeButtons = getAllByRole('button');
    userEvent.click(typeButtons[3]);
    moreDetailsLink = getByText(/More Details/i);
    userEvent.click(moreDetailsLink);
    favoritePokemon = getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favoritePokemon);
    linkHome = getByText(/Home/i);
    userEvent.click(linkHome);

    // Verify Favorite Pokémon
    const linkFavoritePokemon = getByText(/Favorite Pokémons/i);
    userEvent.click(linkFavoritePokemon);
    const listOfFavorites = getAllByTestId('pokemon-name');
    const expectLengthOfArray = 3;

    expect(listOfFavorites.length).toBe(expectLengthOfArray);
  });
});
