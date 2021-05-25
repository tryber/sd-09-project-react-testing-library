import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente <Pokedex.js />', () => {
  const BUTTON_NEXT = 'Próximo pokémon';

  it('Verifica se a página contém o subtítulo "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    const textHeading = getByRole('heading', { level: 2 });

    expect(textHeading).toBeInTheDocument();
    expect(textHeading.textContent).toBe('Encountered pokémons');
  });

  it('Verifica se é exibido o próximo Pokémon"', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);

    const namePokemon = getByTestId('pokemon-name');
    const buttonNext = getByText(BUTTON_NEXT);
    expect(buttonNext).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      expect(namePokemon).toHaveTextContent(pokemon.name);
      userEvent.click(buttonNext);
    });
  });

  it('Verifica se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const nameAllPokemon = getAllByTestId('pokemon-name');

    expect(nameAllPokemon.length).toBe(1);
  });

  it('Verifica se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId, getByTestId, getByText } = renderWithRouter(<App />);

    const buttons = getAllByTestId('pokemon-type-button');
    const quantityButtons = 7;
    expect(buttons.length).toBe(quantityButtons);

    expect(buttons[0].textContent).toBe('Electric');

    userEvent.click(buttons[0]);
    const typePokemon = getByTestId('pokemonType');

    expect(typePokemon.textContent).toBe(buttons[0].textContent);
    expect(getByText(BUTTON_NEXT)).toBeDisabled();
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);

    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);

    const buttonNext = getByText(BUTTON_NEXT);
    expect(buttonNext).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const namePokemon = getByText(pokemon.name);
      expect(namePokemon).toBeInTheDocument();
      userEvent.click(buttonNext);
    });
  });

  it('Verifica se é criado, dinamicamente, um botão para cada tipo de Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const arrayButtons = [
      'Fire',
      'Psychic',
      'Electric',
      'Bug',
      'Poison',
      'Dragon',
      'Normal',
    ];

    arrayButtons.forEach((type) => {
      const btnType = getByRole('button', { name: type });
      expect(btnType).toBeInTheDocument();
    });

    const btnAll = getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
  });

  it('Testa se o botão de "Próximo pokémon" está desabilitado quando tiver um só pokémon',
    () => {
      const { getByRole, getByTestId } = renderWithRouter(<App />);

      const buttonElectric = getByRole('button', { name: 'Electric' });
      expect(buttonElectric).toBeInTheDocument();

      userEvent.click(buttonElectric);
      const typePokemon = getByTestId('pokemonType');

      expect(typePokemon.textContent).toBe(buttonElectric.textContent);
      expect(getByRole('button', { name: BUTTON_NEXT })).toBeDisabled();
    });
});
