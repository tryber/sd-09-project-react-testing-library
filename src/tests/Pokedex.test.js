import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste do componente Pokedex', () => {
  it('Teste se contém um heading h2 com o texto: "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });
});

describe('Teste dos botões "Tipos de pokemons"', () => {
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonReset = screen.getByText('All');
    expect(buttonReset).toHaveTextContent('All');
    userEvent.click(buttonReset);
    userEvent.click(screen.getByText(/próximo pokémon/i));
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });

  it('Se a Pokédex tem os botões de filtro para cada tipo de pokémons', () => {
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    renderWithRouter(<App />);
    const buttonsTypesPokemons = screen.getAllByTestId('pokemon-type-button');
    const lengthButtonsTypes = 7;
    expect(buttonsTypesPokemons).toHaveLength(lengthButtonsTypes);
    types.forEach((type, index) => {
      expect(buttonsTypesPokemons[index]).toHaveTextContent(type);
    });
  });

  it('Se mostra os pokemons somente daquele tipo escolhido no botão Types', () => {
    renderWithRouter(<App />);
    const buttonsTypesPokemons = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(buttonsTypesPokemons[1]);
    expect(screen.getByTestId('pokemonType')).toHaveTextContent('Fire');
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Charmander');

    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText('Rapidash')).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
});

describe('Teste do botão "Próximo Pokemon"', () => {
  it('Se contêm o texto: "Próximo pokeḿon"', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByTestId('next-pokemon');
    expect(buttonNextPokemon).toHaveTextContent('Próximo pokémon');
  });

  it('Se é desabilitado quando tem só um Pokemon na lista', () => {
    renderWithRouter(<App />);
    const buttonTypeBug = screen.getByText('Bug');
    userEvent.click(buttonTypeBug);
    expect(screen.getByText(/próximo pokémon/i).disabled).toBeTruthy();
  });

  it('Se mostra apenas um pokémom por vez e ao final da lista volta para o primeiro',
    () => {
      renderWithRouter(<App />);
      const buttonNextPokemon = screen.getByTestId('next-pokemon');
      const namePokemon = screen.getAllByTestId('pokemon-name');

      pokemons.forEach(() => {
        userEvent.click(buttonNextPokemon);
        expect(namePokemon).toHaveLength(1);
      });
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
});
