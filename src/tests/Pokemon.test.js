import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemonList from '../data';

describe('6th Requirement: Pokemon Component', () => {
  it('renders Pokémon info', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite={ false } />);
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
    expect(screen.getByTestId('pokemonType').innerHTML).toBe('Electric');
    expect(screen.getByTestId('pokemon-weight').innerHTML).toBe('Average weight: 6.0 kg');
    expect(screen.getByRole('img').src).toBe(pokemonList[0].image);
    expect(screen.getByRole('img').alt).toBe('Pikachu sprite');
  });
  it('has details link url', () => {
    renderWithRouter(
      <Pokemon pokemon={ pokemonList[0] } isFavorite={ false } />,
    );
    expect(screen.getByRole('link').href).toBe(`http://localhost/pokemons/${pokemonList[0].id}`);
  });
  it('renders details page', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemonList[0] } isFavorite={ false } />,
    );
    fireEvent.click(screen.getByText(/More details/));
    expect(history.location.pathname).toBe(`/pokemons/${pokemonList[0].id}`);
  });
  it('checks favorite star exists', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite />);
    const altTag = screen.getByAltText(`${pokemonList[0].name} is marked as favorite`);
    expect(altTag).toBeInTheDocument();
    expect(altTag.src).toContain('/star-icon.svg');
  });
});
