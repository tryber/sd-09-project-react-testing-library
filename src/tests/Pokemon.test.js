import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import data from '../data';

afterEach(cleanup);

describe('testing Pokemon Component', () => {
  it('pokemons element has correct Name, type weight and image', () => {
    const {
      getByText,
      getByTestId,
      getByAltText,
      getByLabelText,
      history,
    } = renderWithRouter(<App />);
    const nextPokemon = getByText(/Próximo pokémon/i);
    const pokemonsClasses = 8;
    const numbuerOfClicks = Math.floor(Math.random() * pokemonsClasses) + 1;
    for (let i = 0; i <= numbuerOfClicks; i += 1) {
      userEvent.click(nextPokemon);
    }
    const pokemonName = getByTestId('pokemon-name');
    const dataFile = data.find((pokemon) => (pokemon.name === pokemonName.innerHTML));
    const { averageWeight: { value, measurementUnit }, name, type, image, id } = dataFile;
    expect(pokemonName).toHaveTextContent(name);
    const pokemonWeight = getByTestId('pokemon-weight');
    const weightText = `Average weight: ${value} ${measurementUnit}`;
    expect(pokemonWeight).toHaveTextContent(weightText);
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent(type);
    const pokemonImage = getByAltText(`${name} sprite`);
    expect(pokemonImage.src).toBe(image);
    const linkMDetails = getByText(/More Details/i);
    expect(linkMDetails).toBeInTheDocument();
    userEvent.click(linkMDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
    const pokemonFav = getByLabelText('Pokémon favoritado?');
    userEvent.click(pokemonFav);
    expect(pokemonFav).toBeChecked();
    const FavLink = getByText('Favorite Pokémons');
    userEvent.click(FavLink);
    const pokemonPicture = getByAltText(`${name} is marked as favorite`);
    expect(pokemonPicture).toBeInTheDocument();
    expect(pokemonPicture.src).toMatch(/star-icon.svg/i);
  });
});
