import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('requisito 7, testa PokemonDetails', () => {
  it('as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const {
      getByText,
      getByRole,
      getAllByAltText,
      queryByAltText,
      getByAltText,
      getByLabelText } = renderWithRouter(<App />);
    const detailsButton = getByText('More details');
    fireEvent.click(detailsButton);
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(detailsButton).not.toBeInTheDocument();
    expect(getByRole('heading', { level: 2, name: 'Summary' })).toBeInTheDocument();
    expect(getByText(/This intelligent Pokémon roasts/i)).toBeInTheDocument();
    expect(getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' }))
      .toBeInTheDocument();
    const images = getAllByAltText('Pikachu location');
    expect(images[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const favBtn = getByLabelText('Pokémon favoritado?');
    expect(favBtn).toBeInTheDocument();
    fireEvent.click(favBtn);
    expect(getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
    fireEvent.click(favBtn);
    expect(queryByAltText('Pikachu is marked as favorite')).not.toBeInTheDocument();
  });
});
