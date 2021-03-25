import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const DETAILS_LINK_TEXT = 'More details';

const dummyPokemon = pokemons[0];
const DUMMY_ID = dummyPokemon.id; // Pikachu

const matchMock = { params: { id: DUMMY_ID.toString() } };
const isFavoriteByIdMock = { [DUMMY_ID]: false };
const getFavoriteImage = (name) => screen.queryByAltText(`${name} is marked as favorite`);
const getFavoriteCheckbox = () => screen.getByLabelText('Pokémon favoritado?');

const getH2ByNameText = (text) => (screen.getByRole(
  'heading',
  {
    level: 2,
    name: text,
  },
));

afterEach(cleanup);

describe('PokemonDetails.js tests', () => {
  it('should display pokémon\'s details info', () => {
    renderWithRouter(
      <PokemonDetails
        match={ matchMock }
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteByIdMock }
        onUpdateFavoritePokemons={ () => null }
      />,
    );
    const { name, summary } = dummyPokemon;
    const detailsLink = screen.queryByText(DETAILS_LINK_TEXT);
    expect(getH2ByNameText(`${name} Details`)).toBeInTheDocument();
    expect(detailsLink).toBeNull();
    expect(getH2ByNameText('Summary')).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
  });
  it('should display pokémon\'s locations section', () => {
    renderWithRouter(
      <PokemonDetails
        match={ matchMock }
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteByIdMock }
        onUpdateFavoritePokemons={ () => null }
      />,
    );
    const { name, foundAt: locations } = dummyPokemon;
    const locationImgAltText = `${name} location`;
    expect(getH2ByNameText(`Game Locations of ${name}`)).toBeInTheDocument();
    const locationsImages = screen.queryAllByAltText(locationImgAltText);
    expect(locationsImages).toHaveLength(locations.length);
    locations.forEach(({ location, map }) => {
      const locationText = screen.getByText(location);
      const { parentElement: { previousElementSibling: locationImage } } = locationText;
      expect(locationText).toBeInTheDocument();
      expect(locationImage).toHaveAttribute('src', map);
      expect(locationImage).toHaveAttribute('alt', locationImgAltText);
    });
  });
  it('should set and unset pokémon as favorite', () => {
    const { name } = dummyPokemon;
    const onUpdateFavoritePokemons = jest.fn();
    onUpdateFavoritePokemons.mockImplementation(
      (pokemonId, isFavorite) => {
        isFavoriteByIdMock[pokemonId] = isFavorite;
      },
    );
    const { rerender } = renderWithRouter(
      <PokemonDetails
        match={ matchMock }
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteByIdMock }
        onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
      />,
    );
    expect(getFavoriteCheckbox()).toBeInTheDocument();
    userEvent.click(getFavoriteCheckbox());
    rerender(
      <PokemonDetails
        match={ matchMock }
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteByIdMock }
        onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
      />,
    );
    expect(getFavoriteImage(name)).toBeInTheDocument();
    userEvent.click(getFavoriteCheckbox());
    rerender(
      <PokemonDetails
        match={ matchMock }
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteByIdMock }
        onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
      />,
    );
    expect(getFavoriteImage(name)).toBeNull();
  });
});
