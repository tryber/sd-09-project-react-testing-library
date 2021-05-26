import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('5- Test the component <Pokedex />', () => {
  it('Should have h2 with `Encountered pokémons`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const tagH2 = getByRole('heading', {
      level: 2,
    });
    const correctText = 'Encountered pokémons';

    expect(tagH2.textContent).toBe(correctText);
  });

  it('Should renders next Pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnNextPokemon = getByText(/Próximo pokémon/);

    userEvent.click(btnNextPokemon);
    const charmander = getByText('Charmander');

    expect(charmander).toBeInTheDocument();
    expect(btnNextPokemon.textContent).toBe('Próximo pokémon');
    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);
    const cardPikachu = getByText('Pikachu');
    expect(cardPikachu).toBeInTheDocument();
  });

  it('Should have a button `All`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const btnAll = getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
  });

  it('Should have all buttons wich types', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);
    const typesOfPokemons = ['Electric',
      'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    typesOfPokemons.forEach((type) => {
      const typePokemon = getByRole('button', { name: type });
      expect(typePokemon).toBeInTheDocument();
    });
    const allButtons = getAllByTestId('pokemon-type-button');
    allButtons.forEach((button) => expect(button).toBeInTheDocument());
  });

  it('Should be disabled button next pokemon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const btnEletric = getByRole('button', {
      name: 'Electric',
    });
    userEvent.click(btnEletric);
    const nextPokemon = getByText('Próximo pokémon');
    expect(nextPokemon).toBeDisabled();
  });

  it('Should render Pikachu when click all', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnAll = getByText('All');
    userEvent.click(btnAll);
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
