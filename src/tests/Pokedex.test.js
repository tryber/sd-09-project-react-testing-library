import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Pokedex } from '../components';
import RenderWithRouter from '../services/RenderWithRouter';
import pokemons from '../data';
import App from '../App';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const np = 'next-pokemon';
const pn = 'pokemon-name';
const ptb = 'pokemon-type-button';

describe('Teste do Pokemon.js', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const EncounteredPokemons = getByRole('heading', { ariaLevel: 2 });
    expect(EncounteredPokemons).toHaveTextContent('Encountered pokémons');
  });

  it('Teste Botão "Próximo pokémon"', () => {
    const { getByTestId } = RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const btnProx = getByTestId(np);
    expect(btnProx).toHaveTextContent('Próximo pokémon');
  });

  it('Verifica se o botão "Próximo pokemon" funciona', () => {
    let index = 0;
    const { getByTestId } = RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const btnProx = getByTestId(np);
    const pokName = getByTestId(pn);
    for (index = 0; index < pokemons.length; index += 1) {
      // console.log(pokemons[index].name);;
      if (index === pokemons.length) {
        fireEvent.click(btnProx);
        expect(pokName).toHaveTextContent(pokemons[0].name);
      }
      expect(pokName).toHaveTextContent(pokemons[index].name);
      fireEvent.click(btnProx);
    }
  });

  it('Testa se a Pokedex tem os filtros', () => {
    const pokemonTypes = (
      () => [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))]
    );

    const { getAllByTestId } = RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const filterButtons = getAllByTestId(ptb);
    for (let index = 0; index < pokemonTypes().length; index += 1) {
      expect(filterButtons[index]).toHaveTextContent(pokemonTypes()[index]);
    }
  });

  it('A partir da seleção de um botão de tipo, a Pokédex deve...', () => {
    const pokemonTypes = (
      () => [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))]
    );
    const { getAllByTestId } = RenderWithRouter(<App />);
    // <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    const buttonFilter = getAllByTestId(ptb);
    for (let index = 0; index < buttonFilter.length; index += 1) {
      expect(buttonFilter[index]).toHaveTextContent(pokemonTypes()[index]);
      // const btn = getByTestId(pn).innerHTML;
    }
  });

  it('Testa se a Pokédex contém um botão pra resetar o filtro', () => {
    const { getByText, getByTestId } = RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);

    const btnProx = getByTestId(np);
    const pokName = getByTestId(pn);
    for (let index = 0; index < pokemons.length; index += 1) {
      // console.log(pokemons[index].name);;
      if (index === pokemons.length) {
        fireEvent.click(btnProx);
        expect(pokName).toHaveTextContent(pokemons[0].name);
      }
      expect(pokName).toHaveTextContent(pokemons[index].name);
      fireEvent.click(btnProx);
    }
  });

  it('Testa se o modo selecionado é All', () => {
    const { getByTestId } = RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const btnProx = getByTestId(np);
    const pokName = getByTestId(pn);
    for (let index = 0; index < pokemons.length; index += 1) {
      // console.log(pokemons[index].name);;
      if (index === pokemons.length) {
        fireEvent.click(btnProx);
        expect(pokName).toHaveTextContent(pokemons[0].name);
      }
      expect(pokName).toHaveTextContent(pokemons[index].name);
      fireEvent.click(btnProx);
    }
  });

  it('Testar se existe um botão para cada tipo de pokémon', () => {
    const pokemonTypes = (
      () => [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))]
    );
    const { getAllByTestId } = RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttonFilter = getAllByTestId(ptb);
    for (let index = 0; index < buttonFilter.length; index += 1) {
      expect(buttonFilter[index]).toHaveTextContent(pokemonTypes()[index]);
    }
  });

  it('Testar se aparece apenas 1 pokemon na tela', () => {
    const { queryAllByTestId } = RenderWithRouter(
      <App />,
    );
    const pokemon = queryAllByTestId(pn);
    expect(pokemon.length).toBe(1);
  });

  it('Testar se o botao All está sempre visivel', () => {
    const { getByText } = RenderWithRouter(
      <App />,
    );
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
  });

  it('O botão de Próximo pokémon deve ser desabilitado', () => {
    const { getByRole, queryByText } = RenderWithRouter(
      <App />,
    );
    const buttonElectric = getByRole('button', { name: 'Electric' });
    fireEvent.click(buttonElectric);
    const buttonNext = queryByText('Próximo pokémon');
    expect(buttonNext).toBeDisabled();
  });
});
