import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requisito 07', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const linkPoke = getByText('More details');
    fireEvent.click(linkPoke);

    const detailsPage = getByText('Pikachu Details');
    expect(detailsPage).toBeInTheDocument();
    expect(linkPoke).not.toBeInTheDocument();

    const summaryT01 = 'This intelligent Pokémon roasts hard ';
    const summaryT02 = 'berries with electricity to make them tender enough to eat.';
    const allH2 = container.querySelectorAll('h2');
    expect(allH2[1]).toHaveTextContent(/Summary/i);
    expect(allH2[1].nextElementSibling.textContent).toBe(`${summaryT01}${summaryT02}`);
  });

  test('Página uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history, container, getAllByAltText } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const allH2 = container.querySelectorAll('h2');
    expect(allH2[2].textContent).toBe('Game Locations of Pikachu');
    const foundPokemon = pokemons[0].foundAt;
    const maps = getAllByAltText('Pikachu location');
    foundPokemon.forEach((pokemon, index) => {
      expect(maps[index].src).toBe(pokemon.map);
      expect(maps[index].nextElementSibling.textContent).toBe(pokemon.location);
    });
  });

  test('Usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { history, container, getByAltText, getByText } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const checkboxFav = container.querySelector('input');
    expect(checkboxFav.type).toBe('checkbox');

    fireEvent.click(checkboxFav);
    const favPokeImg = getByAltText('Pikachu is marked as favorite');
    expect(favPokeImg).toBeInTheDocument();

    fireEvent.click(checkboxFav);
    expect(favPokeImg).not.toBeInTheDocument();

    const findTex = getByText('Pokémon favoritado?');
    expect(findTex.htmlFor).toBe(checkboxFav.id);
  });
});
