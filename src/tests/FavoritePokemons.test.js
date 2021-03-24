import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('3rd Requirement: FavoritePokemons Component', () => {
  it('renders \'No favorite pokemon found\' when there are no favorite pokemons', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/)).toBeInTheDocument();
  });
  it('All favorite pokemons should render', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    fireEvent.click(screen.getByRole('checkbox'));
    history.push('/pokemons/4');
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByText(/Favorite Pokémons/));
    const allImgs = screen.getAllByRole('img');
    expect(allImgs[1].src).toBe('http://localhost/star-icon.svg');
    expect(allImgs[3].src).toBe('http://localhost/star-icon.svg');
  });
  it('No pokemons should render if no pokemon is favorite', () => {
    renderWithRouter(<FavoritePokemons />);
    const queryImg = screen.queryAllByRole('img');
    expect(queryImg).toHaveLength(0);
  });
});
