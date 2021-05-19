import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito 6', () => {
  const POKEMON_NAME = 'pokemon-name';
  const POKEMON_TYPE = 'pokemon-type';
  const POKEMON_WEIGHT = 'pokemon-weight';
  const MORE_DETAILS = 'More details';

  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByRole, queryByTestId } = renderWithRouter(<App />);

    const dataPokemonName = pokemons[0].name;
    const renderedPokemonObjectByName = queryByTestId(POKEMON_NAME);
    const renderedPokemonName = renderedPokemonObjectByName[
      Object.keys(renderedPokemonObjectByName)[1]].children;

    expect(renderedPokemonName).toBe(dataPokemonName);

    const dataPokemonType = pokemons[0].type;
    const renderedPokemonObjectByType = queryByTestId(POKEMON_TYPE);
    const renderedPokemonType = renderedPokemonObjectByType[
      Object.keys(renderedPokemonObjectByType)[1]].children;

    expect(renderedPokemonType).toBe(dataPokemonType);

    const weightValue = pokemons[0].averageWeight.value;
    const weighttUnit = pokemons[0].averageWeight.measurementUnit;
    const dataPokemonWeight = `Average weight: ${weightValue} ${weighttUnit}`;

    const renderedPokemonObjectByWeight = queryByTestId(POKEMON_WEIGHT);
    const renderedPokemonWeight = renderedPokemonObjectByWeight[
      Object.keys(renderedPokemonObjectByWeight)[1]].children;

    expect(renderedPokemonWeight).toBe(dataPokemonWeight);

    const dataPokemonImageURL = pokemons[0].image;
    const dataPokemonImageAlt = `${dataPokemonName} sprite`;

    const renderedPokemonImageURL = getByRole('img').src;
    const renderedPokemonImageAlt = getByRole('img').alt;

    expect(dataPokemonImageURL).toBe(renderedPokemonImageURL);
    expect(dataPokemonImageAlt).toBe(renderedPokemonImageAlt);
  });

  test('Se o card na Pokédex contém um link para exibir detalhes do Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: MORE_DETAILS });

    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink.href).toContain(pokemons[0].id);
  });

  test('Se ao clicar no link é feito redirecionamento para a página de detalhes', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: MORE_DETAILS });

    userEvent.click(moreDetailsLink);

    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Se existe um ícone de estrela nos Pokémons favoritados', () => {
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
