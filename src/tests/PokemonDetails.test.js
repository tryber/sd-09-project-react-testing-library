import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requirement 7 - testing component <PokemonDetails />', () => {
  const pikachuUrl = '/pokemons/25';
  test('if detailed information is shown', () => {
    const { queryByText, getByRole, history } = renderWithRouter(<App />);
    history.push(pikachuUrl);

    expect(getByRole('heading', { name: 'Pikachu Details' })).toBeInTheDocument();
    expect(queryByText('More details')).toBeNull();
    expect(queryByText('Summary')).toBeInTheDocument();
    expect(queryByText(/This intelligent Pokémon roasts hard berries/i))
      .toBeInTheDocument();
    expect(document.querySelectorAll('p')[3]).toBeInTheDocument();
  });

  test('if there is a section with maps info', () => {
    const { getByRole, getAllByAltText, history } = renderWithRouter(<App />);
    history.push(pikachuUrl);

    expect(getByRole('heading', { name: 'Game Locations of Pikachu' }))
      .toBeInTheDocument();
    const imgs = getAllByAltText('Pikachu location');
    expect(imgs[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgs[0]).toHaveAttribute('alt', 'Pikachu location');
  });

  test('if user can mark as favorite', () => {
    const {
      getByRole,
      queryByAltText,
      getByLabelText,
      history,
    } = renderWithRouter(<App />);
    history.push(pikachuUrl);

    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    expect(queryByAltText('Pikachu is marked as favorite')).not.toBeInTheDocument();
    expect(getByRole('checkbox')).toBeInTheDocument();
    userEvent.click(getByRole('checkbox'));
    expect(queryByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  });
});
