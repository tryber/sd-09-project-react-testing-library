import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('testa o component Pokedex.js', () => {
  test('testa se a página contém um heading h2 com determinado texto', () => {
    const { getByRole } = renderWithRouter(<App />);
    const mainText = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(mainText).toBeInTheDocument();
  });

  test('testa se o botão funciona e se o primeiro é o Pikachu', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const nextPokeBttn = getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokeBttn).toBeInTheDocument();
    for (let index = 0; index < pokemons.length; index += 1) {
      const pokeName = getByTestId('pokemon-name');
      if (pokemons[index] === pokemons.length) {
        expect(pokeName).toHaveTextContent('Pikachu');
      }
      expect(pokeName).toHaveTextContent(pokemons[index].name);
      fireEvent.click(nextPokeBttn);
    }
  });

  test('testa se há botões de filtro e se o texto corresponde aos tipos', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const filterBttn = getByText('Poison');
    fireEvent.click(filterBttn);
    const pokeType = getByTestId('pokemonType');
    expect(filterBttn.textContent).toBe(pokeType.textContent);
  });

  test('testa o botão para resetar o filtro', () => {
    const { getByText, getByTestId, getByRole } = renderWithRouter(<App />);
    const allButton = getByText('All');
    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton);

    const firstPoke = getByText('Pikachu');
    expect(firstPoke).toBeInTheDocument();

    const nextButton = getByTestId('next-pokemon');
    expect(nextButton).not.toHaveAttribute('disabled');

    const electricBttn = getByRole('button', { name: 'Electric' });
    fireEvent.click(electricBttn);
    expect(nextButton).toHaveAttribute('disabled');
  });

  test('testa os botões de filtros', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId('pokemon-type-button');
    typeButtons.forEach((button, index) => {
      const pokeTypes = ['Electric', 'Fire', 'Bug', 'Poison',
        'Psychic', 'Normal', 'Dragon'];
      expect(button.textContent).toEqual(pokeTypes[index]);
    });
  });
});
