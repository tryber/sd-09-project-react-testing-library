import React from 'react';
import { fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Pokedex.js', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByText } = renderWithRouter(<App />);

    const text = getByText('Encountered pokémons');
    expect(text).toBeInTheDocument();
  });
  test('O botão deve conter o texto Próximo pokémon.', () => {
    const { getByRole } = renderWithRouter(<App />);

    const nextButton = getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextButton).toBeInTheDocument();

    const pokemons = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon'];

    pokemons.forEach((pokemon) => {
      const typeButton = screen.getByRole('button', { name: pokemon });
      expect(typeButton).toBeInTheDocument();
      fireEvent.click(typeButton);
      const allPokeType = screen.getAllByTestId('pokemon-type-button');
      expect(allPokeType.length).toBe(pokemons.length);
    });
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemon = getByTestId('pokemon-weight');
    // expect(pokemon.length).toBe(1);
    expect(pokemon).toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);

    const allButton = getByRole('button', {
      name: 'All',
    });
    expect(allButton).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Fire/i));
    fireEvent.click(screen.getByText(/All/i));

    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
  test('Desabilitar o botão de filtro', () => {
    const { getByRole } = renderWithRouter(<App />);

    const filterButton = getByRole('button', {
      name: 'Electric',
    });
    fireEvent.click(filterButton);

    const pokeDisable = screen.getByText(/Próximo Pokémon/i);
    expect(pokeDisable).toBeDisabled();
    expect(pokeDisable).not.toBeEnabled();
    // Isso permite que você verifique se um elemento está desabilitado da perspectiva do usuário.
  });
});
