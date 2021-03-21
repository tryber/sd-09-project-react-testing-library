import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex.js />', () => {
  const pokemonTypeButton = 'pokemon-type-button';

  it('Testa se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading.innerHTML).toBe('Encountered pokémons');
  });

  it(`Testa se é exibido o próximo Pokémon da lista quando
      o botão Próximo pokémon é clicado.`, () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const btnNextPokemon = getByText(/Próximo Pokémon/i);
    expect(btnNextPokemon.type).toBe('button');
    expect(btnNextPokemon).toHaveTextContent(/Próximo pokémon/i);

    const pokemonsNames = ['Charmander', 'Caterpie', 'Ekans',
      'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];

    let pokemonName;
    pokemonsNames.forEach((name) => {
      fireEvent.click(btnNextPokemon);
      pokemonName = getByTestId('pokemon-name').textContent;
      expect(pokemonName).toBe(name);
    });
    expect(pokemonName).toBe(pokemonsNames[8]);
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonType = getAllByTestId(/pokemonType/i);
    expect(pokemonType.length).toBe(1);
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const filterNumbers = 7;

    const filterButtons = getAllByTestId(pokemonTypeButton);
    expect(filterButtons.length).toBe(filterNumbers);

    const btnNextPokemon = getByTestId(/next-pokemon/i);
    const clicksNumber = 3;
    fireEvent.click(filterButtons[1]);
    for (let index = 0; index <= clicksNumber; index += 1) {
      const pokemonType1 = getByTestId('pokemonType');
      expect(pokemonType1.textContent).toBe('Fire');
      fireEvent.click(btnNextPokemon);
    }

    expect(filterButtons[1].textContent).toBe('Fire');
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro.', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const btnAll = getByText('All');
    expect(btnAll.textContent).toBe('All');
    expect(btnAll.type).toBe('button');

    const typeNumbers = 7;
    const typeButtons = getAllByTestId(pokemonTypeButton);
    expect(typeButtons.length).toBe(typeNumbers);
    fireEvent.click(typeButtons[6]);

    const pokemonName = getByText('Dragonair');
    expect(pokemonName).toHaveTextContent('Dragonair');

    fireEvent.click(btnAll);

    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  it(`Testa se é criado, dinamicamente, um botão de filtro
      para cada tipo de Pokémon.`, () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Normal', 'Dragon'];

    const typeButtons = getAllByTestId(pokemonTypeButton);
    expect(typeButtons.length).toBe(pokemonTypes.length);
    typeButtons.forEach((typeButton, index) => {
      expect(typeButton).toHaveTextContent(pokemonTypes[index]);
    });

    const btnAll = getByText('All');
    expect(btnAll).toBeInTheDocument();
  });

  it(`Testa se o botão de Próximo pokémon é desabilitado 
      quando a lista filtrada de Pokémons tiver um só pokémon.`, () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId(pokemonTypeButton);
    fireEvent.click(typeButtons[2]);

    const btnNextPokemon = getByTestId('next-pokemon');
    expect(btnNextPokemon.type).toBe('button');
    expect(btnNextPokemon.disabled).toBe(true);
  });
});
