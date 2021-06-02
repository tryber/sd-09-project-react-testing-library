import React from 'react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../services/RenderWithRouter';
import data from '../data';
import App from '../App';

describe('Testa o componente <Pokedex.js />', () => {
  const pokemonName = 'pokemon-name';
  const proximoPokemon = 'Próximo pokémon';
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = RenderWithRouter(<App />);
    const h2 = getByText(/Encountered pokémons/i);
    expect(h2).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const { getByTestId, getByText } = RenderWithRouter(<App />);
    const btnNext = getByText(proximoPokemon);
    const pokemon = getByTestId(pokemonName).innerHTML;
    userEvent.click(btnNext);
    const pokemon2 = getByTestId(pokemonName).innerHTML;
    expect(pokemon).not.toBe(pokemon2);
  });

  const arrayOfTypes = [];
  data.forEach(({ type }) => {
    if (!arrayOfTypes.includes(type)) {
      arrayOfTypes.push(type);
    }
  });
  test('Testa se data-testid=pokemon-type-button está no arquivo', () => {
    const { getAllByTestId } = RenderWithRouter(<App />);
    expect(getAllByTestId('pokemon-type-button').length).toBe(arrayOfTypes.length);
  });
  test('Testa se após o ultimo pokemon, o primeiro é mostrado.', () => {
    const { getByTestId, getByText } = RenderWithRouter(<App />);
    const btnAll = getByText('All');
    userEvent.click(btnAll);
    const btnNext = getByText(proximoPokemon);
    data.forEach(() => userEvent.click(btnNext));
    const pokemon = getByTestId(pokemonName).innerHTML;
    expect(pokemon).toBe('Pikachu');
  });
  test('Testa existe um botão para cada typo de pokemon', () => {
    const { getAllByTestId } = RenderWithRouter(<App />);
    const typeBtns = getAllByTestId('pokemon-type-button');
    expect(typeBtns.length).toBe(arrayOfTypes.length);
  });
  test('Testa se a Pokédex tem os botões de filtro.', () => {
    const typesArray = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon'];
    typesArray.forEach((type, key) => {
      expect(arrayOfTypes[key]).toBe(type);
    });
  });
  test('Testa se apenas um pokemon aparece na tela', () => {
    const { queryAllByTestId } = RenderWithRouter(<App />);
    const pokemon = queryAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });
  test('Testa se o botão "Próximo pokemon" desabilita', () => {
    const { getByRole, queryByText } = RenderWithRouter(<App />);
    const btnElectric = getByRole('button', { name: 'Electric' });
    userEvent.click(btnElectric);
    const btnNext = queryByText(proximoPokemon);
    expect(btnNext).toBeDisabled();
  });
});
