import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Testando componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const headingPokedex = getByRole('heading', {
      level: 2, name: 'Encountered pokémons',
    });
    expect(headingPokedex).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista', () => {
    const { getByTestId, getAllByTestId, getByText } = renderWithRouter(<App />);
    const buttonNextPokemon = getByTestId('next-pokemon');
    expect(buttonNextPokemon.textContent).toBe('Próximo pokémon');
    const pokemonName = getAllByTestId('pokemon-name');
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(pokemonName.length).toBe(1);

    data.forEach(() => {
      userEvent.click(buttonNextPokemon);
      expect(pokemonName.length).toBe(1);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    const filterButton = getAllByTestId('pokemon-type-button');
    filterButton.forEach(({ textContent }) => {
      expect(getByRole('button', { name: textContent })).toBeInTheDocument();
    });
  });

  it('Teste se é criado um botão de filtro para cada tipo de Pokémon.', () => {
    const { getByText, getByRole, queryByText } = renderWithRouter(<App />);
    const allButton = getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    const dragonButton = getByRole('button', { name: 'Dragon' });
    userEvent.click(dragonButton);
    expect(allButton).toBeInTheDocument();
    expect(getByText('Dragonair')).toBeInTheDocument();
    expect(queryByText('Pikachu')).toBe(null);
    userEvent.click(allButton);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
