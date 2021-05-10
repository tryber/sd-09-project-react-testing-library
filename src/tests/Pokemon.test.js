import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requirement 6', () => {
  const POKEMON_NAME = 'pokemon-name';
  const POKEMON_TYPE = 'pokemon-type';
  const POKEMON_WEIGHT = 'pokemon-weight';
  const MORE_DETAILS = 'More details';

  test('if a card is rendered with the information of a certain Pokémon', () => {
    const { getByRole, queryByTestId } = renderWithRouter(<App />);

    // name
    const dataPokemonName = pokemons[0].name;
    const renderedPokemonObjectByName = queryByTestId(POKEMON_NAME);
    const renderedPokemonName = renderedPokemonObjectByName[
      Object.keys(renderedPokemonObjectByName)[1]].children;

    expect(renderedPokemonName).toBe(dataPokemonName);

    // type
    const dataPokemonType = pokemons[0].type;
    const renderedPokemonObjectByType = queryByTestId(POKEMON_TYPE);
    const renderedPokemonType = renderedPokemonObjectByType[
      Object.keys(renderedPokemonObjectByType)[1]].children;

    expect(renderedPokemonType).toBe(dataPokemonType);

    // averageWeight: {value, measurementUnit}
    const weightValue = pokemons[0].averageWeight.value;
    const weighttUnit = pokemons[0].averageWeight.measurementUnit;
    const dataPokemonWeight = `Average weight: ${weightValue} ${weighttUnit}`;

    const renderedPokemonObjectByWeight = queryByTestId(POKEMON_WEIGHT);
    const renderedPokemonWeight = renderedPokemonObjectByWeight[
      Object.keys(renderedPokemonObjectByWeight)[1]].children;

    expect(renderedPokemonWeight).toBe(dataPokemonWeight);

    // <img src={ `${image}` } alt={ `${name} sprite` }
    const dataPokemonImageURL = pokemons[0].image;
    const dataPokemonImageAlt = `${dataPokemonName} sprite`;

    const renderedPokemonImageURL = getByRole('img').src;
    const renderedPokemonImageAlt = getByRole('img').alt;

    expect(dataPokemonImageURL).toBe(renderedPokemonImageURL);
    expect(dataPokemonImageAlt).toBe(renderedPokemonImageAlt);
  });

  test('if the Pokémon card contains a navigation link to display details', () => {
    const { getByRole } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: MORE_DETAILS });

    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink.href).toContain(pokemons[0].id);
  });

  test('if the application is redirected to the details page after the click', () => {
    // changes to /pokemon/<id>
    const { getByRole, history } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: MORE_DETAILS });

    userEvent.click(moreDetailsLink);

    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  // test('if the URL displayed in the browser changes to /pokemon/<id>', () => {
  //   const { getByRole } = renderWithRouter(<App />);
  // });

  test('if there is a star icon on favorite Pokémon', () => {
    const { getByRole, queryByText, queryByAltText } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: MORE_DETAILS });

    userEvent.click(moreDetailsLink);

    const favoritePokemonCheckbox = queryByText(/Pokémon favoritado/i);

    userEvent.click(favoritePokemonCheckbox);

    const favoritePokemon = queryByAltText(`${pokemons[0].name} is marked as favorite`);

    expect(favoritePokemon).toBeInTheDocument();
    expect(favoritePokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
