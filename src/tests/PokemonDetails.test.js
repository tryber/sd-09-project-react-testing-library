import React from 'react';
import { fireEvent } from '@testing-library/react';
import APP from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa a tela de detalhes do pokemon', () => {
  it('testa a se o testo name details aparece na tela', () => {
    const { getByRole, getByText } = renderWithRouter(<APP />);
    const moreDetails = getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);
    const namePokemon = getByRole('heading', { name: /pikachu details/i });
    expect(namePokemon).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const summary = getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();
    const paragrhap = getByText(/this intelligent pokémon roasts/i);
    expect(paragrhap).toBeInTheDocument();
  });
  it('Teste se existe os mapas contendo localizações do pokémon', () => {
    const { getByRole, getAllByAltText, getByText } = renderWithRouter(<APP />);
    const moreDetails = getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);
    const locationPokemon = getByRole('heading', { name: /game locations of pikachu/i });
    expect(locationPokemon).toBeInTheDocument();
    const allLocationPokemon = getAllByAltText('Pikachu location');
    expect(allLocationPokemon.length).toBe(2);
    const text1 = getByText(/kanto viridian forest/i);
    expect(text1).toBeInTheDocument();
    const text2 = getByText(/kanto power plant/i);
    expect(text2).toBeInTheDocument();
    expect(allLocationPokemon[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(allLocationPokemon[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('teste checkbox na tela de pokemon favorito', () => {
    const { getByRole, getByText } = renderWithRouter(<APP />);
    const moreDetails = getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);
    const checkPokemon = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    fireEvent.click(checkPokemon);
    const favoritePokemon = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoritePokemon).toBeInTheDocument();
    fireEvent.click(checkPokemon);
    expect(favoritePokemon).not.toBeInTheDocument();
    const textFAvoritePokemon = getByText(/pokémon favoritado\?/i);
    expect(textFAvoritePokemon).toBeInTheDocument();
  });
});
