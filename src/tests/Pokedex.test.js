import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testa arquivo Pokedex', () => {
  it('Verifica se há a frase Encountered pokémons', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const phrase = getByText(/Encountered pokémons/);
    expect(phrase).toBeInTheDocument();
  });

  it('Verifica há o próximo Pokémon da lista quando "Próximo pokémon" é clicado ', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/ });
    fireEvent.click(buttonNext);
    const pikachu = screen.queryByText(/Pikachu/);
    expect(pikachu).not.toBeInTheDocument();
    const charmander = screen.getByText(/Charmander/);
    expect(charmander).toBeInTheDocument();
  });

  it('Verifica se é mostrado apenas um pokemon por vez', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemon = getByTestId('pokemon-weight');
    expect(pokemon).toBeInTheDocument();
  });

  it('Verifica se a pokedex tem os botões de filtro', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );

    const testButtons = getAllByTestId('pokemon-type-button');
    const seven = 7;
    expect(testButtons.length).toBe(seven);
    const testIdTipoPokemon = getByTestId('pokemonType');
    testButtons.forEach((type) => {
      fireEvent.click(type);
      expect(testIdTipoPokemon.textContent).toBe(type.textContent);
    });
  });

  it('Verifica se o botão All reseta os filtros', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const poisonButton = screen.getByRole('button', { name: /Poison/ });
    fireEvent.click(poisonButton);
    const buttonNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/ });
    expect(buttonNextPokemon).toBeDisabled();
    const allBtn = screen.getByRole('button', { name: /All/ });
    fireEvent.click(allBtn);
    expect(buttonNextPokemon).toBeEnabled();
  });

  it('Verifica se o botão do próximo pokemon desabilita qdo tiver só um pokemon', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const bugButton = screen.getByRole('button', { name: /Bug/ });
    fireEvent.click(bugButton);
    const buttonNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/ });
    expect(buttonNextPokemon).toBeDisabled();
  });
});
