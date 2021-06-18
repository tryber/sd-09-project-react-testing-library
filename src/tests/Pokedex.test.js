import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import listOfPokemons from '../data';

describe('Test Pokédex component', () => {
  it('verify if the page have a h2 title with `Encountered pokémons`', () => {
    renderWithRouter(<App />);
    const subTitle = screen.getByRole(
      'heading',
      { name: 'Encountered pokémons', level: 2 },
    );

    expect(subTitle).toBeInTheDocument();
  });

  describe('verify if is render next pokémon when clicked `Próximo pokémon`', () => {
    it('the button next pokémon have the text `Próximo pokémon`', () => {
      renderWithRouter(<App />);
      const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });

      expect(nextPokemonButton).toBeInTheDocument();
    });

    it('all pokemons need was show in the screen, one by one, when you click', () => {
      renderWithRouter(<App />);
      const buttonNextPokemon = screen.getByText(/Próximo Pokémon/i);

      listOfPokemons.forEach((pokemon) => {
        const pokemonName = screen.getByText(pokemon.name);
        expect(pokemonName).toBeInTheDocument();
        userEvent.click(buttonNextPokemon);
      });
      const returnToFirstToBe = screen.getByText('Pikachu');
      expect(returnToFirstToBe).toBeInTheDocument();
    });
  });

  it('verify if is showed only pokemon at a time', () => {
    renderWithRouter(<App />);
    const pokemonInScreen = screen.getAllByTestId('pokemon-name');
    const expectedLength = 1;

    expect(pokemonInScreen.length).toBe(expectedLength);
  });

  describe('verify if the Pokédex have filter buttons', () => {
    it('after click in the type button, only pokemons of that type shold appear', () => {
      renderWithRouter(<App />);
      const typePokemonbutton = screen.getByText(/Fire/i);
      userEvent.click(typePokemonbutton);

      const pokemonType = screen.getByTestId('pokemonType');

      expect(pokemonType).toBeInTheDocument('Fire');
    });
    // it('the type of the pokemon needs to be the same as the filter', () => {
    //   renderWithRouter(<App />);
    // });
  });
  describe('verify if Pokédex have a reset filter button', () => {
    it('The button need to have the text `All`', () => {
      renderWithRouter(<App />);
      const resetButton = screen.getByRole('button', { name: 'All' });

      expect(resetButton).toBeInTheDocument();
    });

    it('When `All` button was clicked, all pokemons need to show', () => {
      renderWithRouter(<App />);
      const resetButton = screen.getByRole('button', { name: 'All' });
      const nextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });

      userEvent.click(resetButton);

      listOfPokemons.forEach((pokemon) => {
        const pokemonName = screen.getByText(pokemon.name);
        expect(pokemonName).toBeInTheDocument();
        userEvent.click(nextPokemon);
      });

      const returnToFirstToBe = screen.getByText('Pikachu');
      expect(returnToFirstToBe).toBeInTheDocument();
    });
  });

  it('test if have buttons for all pokemon types', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const allPokemonTypes = [
      'Eletric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const allTypeButtons = getAllByTestId('pokemon-type-button');

    expect(allTypeButtons.length).toBe(allPokemonTypes.length);
  });
});
