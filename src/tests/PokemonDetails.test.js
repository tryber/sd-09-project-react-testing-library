import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Pokemons from '../data';

describe('Testando componente PokemonDetails', () => {
  it('Teste se as informações do Pokémon são mostradas na tela.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkToDetails = getByText('More details');

    Pokemons.forEach((pokemon) => {
      history.push(`/pokemons/${pokemon.id}`);

      const pokemonDetailsHeading = getByText(`${pokemon.name} Details`);
      const summaryHeading = getByText('Summary');
      const detailsParagraph = summaryHeading.nextSibling;

      expect(pokemonDetailsHeading).toBeInTheDocument();
      expect(linkToDetails).not.toBeInTheDocument();
      expect(summaryHeading.localName).toBe('h2');
      expect(detailsParagraph).toBeInTheDocument();
      expect(detailsParagraph.innerHTML).toBe(pokemon.summary);
    });
  });

  it('Teste se existe uma seção com mapas', () => {
    const { getByText, getAllByAltText, history } = renderWithRouter(<App />);

    Pokemons.forEach((pokemon) => {
      history.push(`/pokemons/${pokemon.id}`);

      const gameLocationsHeading = getByText(`Game Locations of ${pokemon.name}`);
      const pokemonLocationsMaps = getAllByAltText(`${pokemon.name} location`);
      const pokemonLocationsTexts = pokemonLocationsMaps.map((map) => (
        map.nextSibling.firstChild.innerHTML
      ));

      pokemonLocationsMaps.forEach((map, index) => {
        expect(map.getAttribute('src')).toBe(pokemon.foundAt[index].map);
      });

      expect(gameLocationsHeading).toBeInTheDocument();
      expect(pokemonLocationsMaps.length).not.toBeFalsy();
      expect(pokemonLocationsTexts.length).toBe(pokemonLocationsMaps.length);
    });
  });

  it('Teste se é possível favoritar um pokémon através da página de detalhes.', () => {
    const { getByText, history } = renderWithRouter(<App />);

    Pokemons.forEach((pokemon) => {
      history.push(`/pokemons/${pokemon.id}`);

      const toFavoriteButtonLabel = getByText('Pokémon favoritado?');
      const numberOfSimulatedClicks = 3;

      expect(toFavoriteButtonLabel).toBeInTheDocument();

      for (let i = 1; i <= numberOfSimulatedClicks; i += 1) {
        const expectToBeIncluded = i % 2 !== 0;

        fireEvent.click(toFavoriteButtonLabel);

        const favoritesPokemons = JSON.parse(localStorage.getItem('favoritePokemonIds'));

        expect(favoritesPokemons.includes(pokemon.id)).toBe(expectToBeIncluded);
      }
    });
  });
});
