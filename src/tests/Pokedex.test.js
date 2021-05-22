import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';
import Data from '../data';

describe('Testes do componente <Pokedex />', () => {
  it('Verifica se contém um heading h2 com o texto `Encountered pokémons`', () => {
    renderWithRouter(<App />);

    const heading = screen.getByText('Encountered pokémons');

    expect(heading).toBeInTheDocument();
  });

  it('Verifica ação do botão`Próximo pokémon`', () => {
    renderWithRouter(<App />);

    const btnNextPoke = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    expect(btnNextPoke).toBeInTheDocument();

    userEvent.click(btnNextPoke);

    const nextCard = screen.getByText(Data[1].name);
    expect(nextCard).toBeInTheDocument();
  });

  it('Verifica de é renderizado um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId('pokemon-name');

    expect(pokemonName.length).toBe(1);
  });

  it('Verifica se existem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterButton = screen.getByRole('button', {
      name: /Electric/i,
    });

    expect(filterButton).toBeInTheDocument();
  });

  it('Verifica se existe um botão de reset para os filtros', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', {
      name: /All/i,
    });

    expect(btnAll).toBeInTheDocument();
  });

  it('Verifica a ação do botão `All`', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText('Pikachu');
    const btnNextPoke = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });

    userEvent.click(buttonAll);

    expect(pikachu).toBeInTheDocument();
    expect(btnNextPoke).toBeEnabled();
  });

  it('Verifica a existência de um botão para cada tipo de pokémon', () => {
    renderWithRouter(<App />);

    const pokeTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic',
      'Normal', 'Dragon'];

    const buttonType = screen.getAllByTestId('pokemon-type-button');

    buttonType.forEach((button, index) => {
      expect(button).toHaveTextContent(pokeTypes[index]);
    });
  });
});
