import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente <Pokedex.js />', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);

    const headingH2 = getByRole('heading', {
      level: 2,
    });

    expect(headingH2.textContent).toBe('Encountered pokémons');
  });

  it(`Testa se é exibido o próximo Pokémon
   da lista quando o botão Próximo pokémon é clicado`, () => {
    const { getByRole } = renderWithRouter(<App />);

    const buttonNextPokemon = getByRole('button', {
      name: 'Próximo pokémon',
    });

    const pikachuSprite = getByRole('img', {
      name: 'Pikachu sprite',
    });

    expect(buttonNextPokemon).toBeInTheDocument();
    expect(pikachuSprite).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);

    const charmanderSprite = getByRole('img', {
      name: 'Charmander sprite',
    });

    expect(charmanderSprite).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const namePokemon = getAllByTestId('pokemon-name');
    expect(namePokemon).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const buttonPsychic = getByRole('button', {
      name: 'Psychic',
    });
    userEvent.click(buttonPsychic);

    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType.textContent).toBe('Psychic');
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const buttonBug = getByRole('button', {
      name: 'Bug',
    });
    userEvent.click(buttonBug);

    const pokemonBug = getByTestId('pokemonType');
    expect(pokemonBug.textContent).toBe('Bug');

    const buttonResetFilter = getByRole('button', {
      name: 'All',
    });
    userEvent.click(buttonResetFilter);
  });

  it('Testa se é criado dinamicamente, um botão filtro para cada tipo de Pokémon', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);

    const typesPokemon = ['Electric',
      'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    const buttonsTypesPokemon = getAllByTestId('pokemon-type-button');

    const buttonResetFilter = getByRole('button', {
      name: 'All',
    });

    buttonsTypesPokemon.forEach((buttonType, index) => {
      expect(buttonType.textContent).toBe(typesPokemon[index]);
    });
    expect(buttonResetFilter).toBeDefined();
  });

  it(`Testa se o botão de Próximo pokémon deve ser desabilitado,
   quando a lista filtrada de Pokémons tiver um só pokémon`, () => {
    const { getByRole } = renderWithRouter(<App />);

    const buttonNormal = getByRole('button', {
      name: 'Normal',
    });
    userEvent.click(buttonNormal);

    const buttonNextPokemon = getByRole('button', {
      name: 'Próximo pokémon',
    });

    expect(buttonNextPokemon).toBeDisabled();
  });
});
