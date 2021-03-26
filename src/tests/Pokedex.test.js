import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import data from '../data';

describe('testing pokedex page', () => {
  it('A página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokedexText = getByRole('heading', { name: /Encountered pokémons/i });
    expect(pokedexText).toBeInTheDocument();
  });

  it('Se botão deve conter o texto Próximo pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPokemonButton = getByText(/Próximo pokémon/i);
    expect(nextPokemonButton).toBeInTheDocument();
  });

  it('testa funcionalidade do botao ProxPokemon', () => {
    const {
      getByText, getByTestId, getByAltText, getAllByTestId,
    } = renderWithRouter(<App />);
    const nextPokemonButton = getByText(/Próximo pokémon/i);
    data.forEach(() => {
      const PokemonName = getByTestId('pokemon-name');
      const arrayOfPokemons = getAllByTestId('pokemon-name');
      expect(PokemonName).toBeInTheDocument();
      expect(arrayOfPokemons).toHaveLength(1);
      userEvent.click(nextPokemonButton);
    });
    const firstImg = getByAltText(/Pikachu sprite/i);
    expect(firstImg.alt).toBe('Pikachu sprite');
  });

  it('testing filter pokemons buttons', () => {
    const { getByTestId, getAllByTestId, getByRole } = renderWithRouter(<App />);
    const pokemonTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const pokemonTypeButtons = getAllByTestId('pokemon-type-button');
    const lengthOfButtons = 7;
    expect(pokemonTypeButtons).toHaveLength(lengthOfButtons);
    pokemonTypes.forEach((pokemon) => {
      const fireButtom = getByRole('button', { name: pokemon });
      userEvent.click(fireButtom);
      const pokemonTypeText = getByTestId('pokemonType');
      expect(pokemonTypeText.innerHTML).toBe(pokemon);
    });
  });

  it('testing to reset filter', () => {
    const { getByText } = renderWithRouter(<App />);
    const resetButton = getByText('All');
    expect(resetButton).toBeInTheDocument();
    userEvent.click(resetButton);
    userEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(/charmander/i)).toBeInTheDocument();
  });
});
