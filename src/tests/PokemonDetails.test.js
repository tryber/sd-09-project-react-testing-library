import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemons from '../data';

describe('Testando componente PokemonDetails', () => {
  it('Teste se as informações do Pokémon são mostradas na tela.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText('More details');

    Pokemons.forEach((pokemon) => {
      history.push(`/pokemons/${pokemon.id}`);
      const Heading = getByText(`${pokemon.name} Details`);
      const sumary = getByText('Summary');
      const paragraph = sumary.nextSibling;

      expect(Heading).toBeInTheDocument();
      expect(link).not.toBeInTheDocument();
      expect(sumary.localName).toBe('h2');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph.innerHTML).toBe(pokemon.summary);
    });
  });

  it('Teste se existe uma seção com mapas', () => {
    const { getByText, getAllByAltText, history } = renderWithRouter(<App />);

    Pokemons.forEach((pokemon) => {
      history.push(`/pokemons/${pokemon.id}`);
      const locations = getByText(`Game Locations of ${pokemon.name}`);
      const maps = getAllByAltText(`${pokemon.name} location`);
      const text = maps.map((map) => (
        map.nextSibling.firstChild.innerHTML
      ));

      maps.forEach((map, index) => {
        expect(map.getAttribute('src')).toBe(pokemon.foundAt[index].map);
      });

      expect(locations).toBeInTheDocument();
      expect(maps.length).not.toBeFalsy();
      expect(text.length).toBe(maps.length);
    });
  });

  it('Teste se é possível favoritar um pokémon através da página de detalhes.', () => {
    const { getByText, history } = renderWithRouter(<App />);

    Pokemons.forEach((pokemon) => {
      history.push(`/pokemons/${pokemon.id}`);
      const addFavorite = getByText('Pokémon favoritado?');
      const clicks = 3;
      expect(addFavorite).toBeInTheDocument();

      for (let i = 1; i <= clicks; i += 1) {
        const expectToBeIncluded = i % 2 !== 0;
        fireEvent.click(addFavorite);
        const favorites = JSON.parse(localStorage.getItem('favoritePokemonIds'));
        expect(favorites.includes(pokemon.id)).toBe(expectToBeIncluded);
      }
    });
  });
});
