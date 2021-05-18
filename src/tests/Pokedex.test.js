import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Test the `<Pokedex.js />` component', () => {
  it('contains an h2 heading with the text `Encountered Pokémon`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const encounteredPokemons = getByRole('heading', {
      level: 2,
      name: /Encountered Pokémon/i,
    });
    expect(encounteredPokemons).toBeInTheDocument();
  });

  const nextPokemon = 'Próximo pokémon';

  it('next Pokémon is displayed when the `Next Pokémon` button is clicked', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    const pokemonList = pokemons.map(({ name }) => name);
    pokemonList.forEach((pokemonName) => {
      const currentPokemon = pokemonName;
      expect(queryByText(currentPokemon)).toBeInTheDocument();
      userEvent.click(getByText(nextPokemon));
    });
  });

  it('only one Pokémon is shown at a time', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const moreDetailsLink = getAllByText('More details');
    expect(moreDetailsLink.length).toBe(1);
  });

  it('has the filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const filterLenght = 7;
    expect(getAllByTestId('pokemon-type-button').length).toBe(filterLenght);
  });

  it('contains a button to reset the filter', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('All')).toBeInTheDocument();
  });

  it('a filter button is created dynamically for each type of Pokémon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const pokemonList = pokemons.map(({ type }) => type);
    pokemonList.forEach((pokemonType) => {
      const currentType = pokemonType;
      expect(getByRole('button', { name: currentType }));
      userEvent.click(getByText(nextPokemon));
    });
  });

  it('`Next Pokémon` button should be disabled when has only one Pokémon listed', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    userEvent.click(getByRole('button', { name: 'Electric' }));
    expect(getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: nextPokemon }));
    expect(getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: 'All' }));
    userEvent.click(getByRole('button', { name: nextPokemon }));
    expect(getByText('Charmander')).toBeInTheDocument();
  });
});
