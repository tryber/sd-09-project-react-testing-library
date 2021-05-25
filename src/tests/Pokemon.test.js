import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
};

const MORE_DETAILS = 'More details';
const POKEMON_NAME = 'pokemon-name';

describe('Testando o componente <Pokemon.js />', () => {
  it('Verifica se é renderizado um card com as informações de um pokémon.', () => {
    const { getByTestId, getAllByRole } = renderWithRouter(<App />);
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemon;

    const namePokemon = getByTestId(POKEMON_NAME);
    expect(namePokemon.textContent).toBe(name);

    const typePokemon = getByTestId('pokemonType');
    expect(typePokemon.textContent).toBe(type);

    const unitsPokemon = getByTestId('pokemon-weight');
    expect(unitsPokemon.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);

    const imagesPokemon = getAllByRole('img');

    expect(imagesPokemon[0].src).toBe(image);
    expect(imagesPokemon[0].alt).toBe(`${name} sprite`);
  });

  it('Verifica se o card do Pokémon indicado na Pokédex contém um link de navegação '
  + 'para exibir detalhes deste Pokémon. O link deve possuir a URL `/pokemons/<id>`'
  + ', onde `<id>` é o id do Pokémon exibido', () => {
    const { getByText } = renderWithRouter(<App />);

    const linkPokemon = getByText(MORE_DETAILS);
    expect(linkPokemon).toBeInTheDocument();

    expect(linkPokemon.href).toMatch(`/pokemons/${pokemon.id}`);
  });

  it('Verifica se ao clicar no link de navegação do Pokémon, é feito o redirecionamento '
  + 'da aplicação para a página de detalhes de Pokémon.', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const linkPokemon = getByText(MORE_DETAILS);
    userEvent.click(linkPokemon);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getByTestId, getAllByRole, history } = renderWithRouter(<App />);

    const namePokemon = getByTestId(POKEMON_NAME);
    const linkPokemon = getByText(MORE_DETAILS);
    userEvent.click(linkPokemon);

    const checkFavorites = getByText('Pokémon favoritado?');
    userEvent.click(checkFavorites);

    history.push('/favorites');

    const nameFavorite = getByTestId(POKEMON_NAME);
    expect(nameFavorite).toStrictEqual(namePokemon);

    const imagesPokemon = getAllByRole('img');
    expect(imagesPokemon[1].src).toMatch('/star-icon.svg');
    expect(imagesPokemon[1].alt)
      .toStrictEqual(`${namePokemon.textContent} is marked as favorite`);
  });
});
