import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import isPokemonFavoriteById from '../App';

const NEXT_BUTTON = 'next-pokemon';
const RENDER_POKEMON = 'pokemon-name';

describe('Pokedex', () => {
  it('testa se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const heading = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    (expect(heading).toBeInTheDocument('Encountered pokémons'));
  });

  it('testa se é exibido o próximo Pokémon da lista', () => {
    const { getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    pokemons.forEach((pokemon) => {
      expect(getByTestId(RENDER_POKEMON)).toHaveTextContent(pokemon.name);
      userEvent.click(getByTestId(NEXT_BUTTON));
    });
    expect(getByTestId(RENDER_POKEMON)).toHaveTextContent(pokemons[0].name);
    expect(getByTestId(NEXT_BUTTON)).toHaveTextContent('Próximo pokémon');
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    userEvent.click(getByTestId(NEXT_BUTTON));
    expect(getAllByTestId(RENDER_POKEMON).length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const btnFilter = getAllByTestId('pokemon-type-button');
    expect(btnFilter[0]).toHaveTextContent('Electric');
    expect(btnFilter[1]).toHaveTextContent('Fire');
    expect(btnFilter[2]).toHaveTextContent('Bug');
    expect(btnFilter[3]).toHaveTextContent('Poison');
    expect(btnFilter[4]).toHaveTextContent('Psychic');
    expect(btnFilter[5]).toHaveTextContent('Normal');
    expect(btnFilter[6]).toHaveTextContent('Dragon');

    userEvent.click(btnFilter[0]);
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
    userEvent.click(btnFilter[1]);
    expect(getByTestId('pokemonType')).toHaveTextContent('Fire');
    userEvent.click(btnFilter[2]);
    expect(getByTestId('pokemonType')).toHaveTextContent('Bug');
    userEvent.click(btnFilter[3]);
    expect(getByTestId('pokemonType')).toHaveTextContent('Poison');
    userEvent.click(btnFilter[4]);
    expect(getByTestId('pokemonType')).toHaveTextContent('Psychic');
    userEvent.click(btnFilter[5]);
    expect(getByTestId('pokemonType')).toHaveTextContent('Normal');
    userEvent.click(btnFilter[6]);
    expect(getByTestId('pokemonType')).toHaveTextContent('Dragon');
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const btnAll = getByText('All');
    expect(btnAll).toBeInTheDocument();
    expect(btnAll).toHaveTextContent('All');
    userEvent.click(btnAll);
  });
});
