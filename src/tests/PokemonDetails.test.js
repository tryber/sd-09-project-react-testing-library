import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import { PokemonDetails } from '../components';
import App from '../App';

describe('Test component PokemonDetais', () => {
  it('renders details information about the especific pokemon', () => {
    const { queryByText, history } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [pokemons[0].id]: false } }
        match={ { params: { id: `${pokemons[0].id}` } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ jest.fn().mockImplementation(() => undefined) }
      />,
    );
    expect(queryByText('More details')).toBeNull();
    history.push(`/pokemons/${pokemons[0].id}`);
    expect(history.location.pathname).toBe('/pokemons/25');
    expect(queryByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    expect(queryByText(/summary/i)).toBeInTheDocument();
    expect(queryByText(/berries with electricity/i)).toBeInTheDocument();
  });

  it('renders the maps with locations where the pokemon can be found', () => {
    const { getAllByAltText, queryByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [pokemons[0].id]: false } }
        match={ { params: { id: `${pokemons[0].id}` } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ jest.fn().mockImplementation(() => undefined) }
      />,
    );
    expect(queryByText(`Game Locations of ${pokemons[0].name}`)).toBeInTheDocument();
    const locations = getAllByAltText(`${pokemons[0].name} location`);
    locations.forEach((location, index) => {
      expect(locations[index].src).toContain(pokemons[0].foundAt[index].map);
      expect(location).toBeInTheDocument();
    });
  });

  it('marks the pokemon as favorite', () => {
    // function myFunc() {
    // jest.fn().mockResolvedValue('42'); nao funciona :(
    // implementa logica que muda props isPokemonFavoriteById
    //   return undefined;
    // }

    const { getByLabelText, getByAltText, history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const favoriteBox = getByLabelText(/pokémon favoritado/i);
    userEvent.click(favoriteBox);
    expect(favoriteBox.checked).toEqual(true);
    const favoriteIcon = getByAltText(/marked as favorite/i);
    expect(favoriteIcon.src).toContain('/star-icon.svg');
    expect(favoriteIcon).toBeInTheDocument();
    // const favoriteLink = getByText(/favorite pokémons/i);
    userEvent.click(favoriteBox);
    expect(favoriteBox.checked).toEqual(false);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
