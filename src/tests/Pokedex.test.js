import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('5th Requirement: Pokedex Component', () => {
  it('has h2 tag with text \'Encountered pokémons\'', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 }).innerHTML)
      .toBe('Encountered pokémons');
  });
  it('renders next pokemons when Próximo pokémon is clicked', () => {
    renderWithRouter(<App />);
    const firstPokemon = screen.getByRole('img').alt;
    fireEvent.click(screen.getByText(/Próximo pokémon/));
    const secondPokemon = screen.getByRole('img').alt;
    expect(firstPokemon).not.toBe(secondPokemon);
  });
  it('only one pokemon must be rendered', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });
  it('Pokédex filter buttons works', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Psychic/));
    expect(screen.getByTestId('pokemonType').innerHTML).toBe('Psychic');
    fireEvent.click(screen.getByText(/Próximo pokémon/));
    expect(screen.getByTestId('pokemonType').innerHTML).toBe('Psychic');
  });
  it('has clear filter button', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Psychic/));
    fireEvent.click(screen.getByText(/All/));
    expect(screen.getByTestId('pokemonType').innerHTML).not.toBe('Psychic');
  });
  it('has filter buttons for each type', () => {
    renderWithRouter(<App />);
    const pokemonTypeAmount = 7;
    const pokeBtn = 'pokemon-type-button';
    expect(screen.getAllByTestId(pokeBtn)).toHaveLength(pokemonTypeAmount);
    expect(screen.getAllByTestId(pokeBtn)[0].innerHTML).toBe('Electric');
    expect(screen.getAllByTestId(pokeBtn)[1].innerHTML).toBe('Fire');
    expect(screen.getAllByTestId(pokeBtn)[2].innerHTML).toBe('Bug');
    expect(screen.getAllByTestId(pokeBtn)[3].innerHTML).toBe('Poison');
    expect(screen.getAllByTestId(pokeBtn)[4].innerHTML).toBe('Psychic');
    expect(screen.getAllByTestId(pokeBtn)[5].innerHTML).toBe('Normal');
    expect(screen.getAllByTestId(pokeBtn)[6].innerHTML).toBe('Dragon');
  });
  it('Próximo pokémon button is disabled with only one pokemon type', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByText(/Próximo pokémon/);
    expect(nextBtn).not.toHaveAttribute('disabled');
    fireEvent.click(screen.getByText(/Bug/));
    expect(nextBtn).toHaveAttribute('disabled');
  });
});
