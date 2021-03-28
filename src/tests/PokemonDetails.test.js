import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente PokemonDetails', () => {
  it('Teste se as informações detalhadas do Pokémon está na tela.', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const buttonMoreDetails = getByText('More details');
    expect(buttonMoreDetails).toBeInTheDocument();
    fireEvent.click(buttonMoreDetails);
    expect(buttonMoreDetails).not.toBeInTheDocument();
    expect(getByRole('heading', { level: 2, name: 'Summary' })).toBeInTheDocument();
    expect(getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' }))
      .toBeInTheDocument();
    const image = getAllByAltText('Pikachu location');
    expect(image[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(getByText(/This intelligent Pokémon /i)).toBeInTheDocument();
    const pikachuDetails = getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um pokémon.', () => {
    const {
      getByRole,
      getByAltText,
      getByLabelText,
      queryByAltText,
      getByText,
    } = renderWithRouter(<App />);
    const buttonMoreDetails = getByText('More details');
    expect(buttonMoreDetails).toBeInTheDocument();
    fireEvent.click(buttonMoreDetails);
    const buttonFavorite = getByRole('checkbox');
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();
    fireEvent.click(buttonFavorite);
    expect(getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
    fireEvent.click(buttonFavorite);
    expect(queryByAltText('Pikachu is marked as favorite')).toBe(null);
  });
});
