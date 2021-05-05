import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Testa se os detalhes do Pokémon selecionado são mostradas na tela', () => {
    const {
      queryByText,
      getByText,
      getAllByRole,
      getByTestId,
    } = renderWithRouter(<App />);

    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon
    const currentPokemon = getByTestId(/pokemon-name/i).innerHTML;
    const moreDetailsLink = getByText(/More details/i);
    userEvent.click(moreDetailsLink);
    const pokemonDetailsText = getByText(`${currentPokemon} Details`);
    expect(pokemonDetailsText).toBeInTheDocument();

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado
    const linkInMoreDetails = queryByText(/More details/i);
    expect(linkInMoreDetails).toBe(null);

    // A seção de detalhes deve conter um heading h2 com o texto Summary
    const heading = getAllByRole('heading', { level: 2 });
    expect(heading[1]).toHaveTextContent('Summary');

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon
    const { summary } = pokemons.find(({ name }) => name === currentPokemon);
    // const summary = pokemons.find(pokemon => pokemon.name === currentPokemon).summary;
    const pokemonSummary = getByText(summary);
    expect(pokemonSummary).toBeInTheDocument();
  });

  it('Teste se existe uma seção contendo as localizações do pokémon', () => {
    const {
      getAllByAltText,
      getByText,
      getAllByRole,
      getByTestId,
    } = renderWithRouter(<App />);

    const currentPokemon = getByTestId(/pokemon-name/i).innerHTML;
    const moreDetailsLink = getByText(/More details/i);
    userEvent.click(moreDetailsLink);

    // Deve existir h2 com o texto Game Locations of <name>
    const heading = getAllByRole('heading', { level: 2 });
    expect(heading[2]).toHaveTextContent(`Game Locations of ${currentPokemon}`);

    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes
    const location = pokemons.find(({ name }) => name === currentPokemon).foundAt;
    const locationImg = getAllByAltText(`${currentPokemon} location`);
    expect(locationImg.length).toBe(location.length);

    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização
    locationImg.forEach((img, index) => {
      expect(img.src).toBe(location[index].map);
      const locationName = img.nextElementSibling.textContent;
      expect(locationName).toBe(location[index].location);
    });
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByLabelText, getByText, getByRole } = renderWithRouter(<App />);

    const moreDetailsLink = getByText(/More details/i);
    userEvent.click(moreDetailsLink);
    // A página deve exibir um checkbox que permite favoritar o Pokémon
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    // Cliques no checkbox devem adicionar e remover o Pokémon da lista de favoritos
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    // O label do checkbox deve conter o texto Pokémon favoritado?
    const label = getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});
