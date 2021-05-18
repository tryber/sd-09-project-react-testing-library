import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito 05 - Testes do Pokedex.js', () => {
  it('A página contém um heading h2 com o texto "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    const encounteredPokemonsMessage = getByRole('heading', { level: 2 });

    expect(encounteredPokemonsMessage.textContent).toBe('Encountered pokémons');
  });

  it('É exibido o próximo Pokémon da lista'
    + ' quando o botão Próximo pokémon é clicado', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const pokemonList = pokemons.map(({ name }) => name);
    const nextPokemonButton = getByRole('button', { name: 'Próximo pokémon' });

    pokemonList.forEach((currentPokemonName) => {
      expect(getByText(currentPokemonName)).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });
  });

  it('É mostrado apenas um Pokémon por vez', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const pokemonCards = getAllByText(/More details/i);

    expect(pokemonCards).toHaveLength(1);
  });

  it('A Pokédex tem os botões de filtro', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);

    const pokemonTypes = pokemons.map(({ type }) => type);
    const pokemonButtonType = getAllByTestId('pokemon-type-button');

    pokemonTypes.forEach((currentType) => {
      const pokemonTypeButton = getByRole('button', { name: currentType });
      expect(pokemonTypeButton).toBeInTheDocument();
    });

    pokemonButtonType.forEach((currentButton) => {
      expect(currentButton).toBeInTheDocument();
    });
  });

  it('A Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const clearFiltersButton = getByRole('button', { name: 'All' });
    expect(clearFiltersButton).toBeInTheDocument();
    userEvent.click(clearFiltersButton);

    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });

  it('É criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);

    const pokemonTypes = pokemons.map(({ type }) => type);

    pokemonTypes.forEach((currentType) => {
      const pokemonTypeButton = getByRole('button', { name: currentType });
      expect(pokemonTypeButton).toBeInTheDocument();
    });

    const clearFiltersButton = getByRole('button', { name: 'All' });
    expect(clearFiltersButton).toBeInTheDocument();
  });

  it('O botão de Próximo pokémon deve ser desabilitado'
    + ' quando a lista filtrada de Pokémons tiver um só pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);

    const electricFilterButton = getByRole('button', { name: 'Electric' });
    userEvent.click(electricFilterButton);

    expect(getByRole('button', { name: 'Próximo pokémon' })).toBeDisabled();
  });
});
