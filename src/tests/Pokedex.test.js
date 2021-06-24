import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// necessário inciar de APP para renderizar "FavoritePokemons"; onde App busca a
// lista dos pokemons favoritados anteriormente sendo passado via props para "FavoritePokemons"
// Para não causar falsos positivos;

describe('Testa o componente Pokedex', () => {
  const nextPokemon = { name: 'Próximo pokémon' };

  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const element = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(element).toBeInTheDocument();
  });

  it('Verifica próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonNextPokemon = getByRole('button', nextPokemon);
    expect(getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);
    expect(getByText('Charmander')).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    expect(getByText('Dragonair')).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getByText, getByRole, getAllByTestId } = renderWithRouter(<App />);
    const buttonNextPokemon = getByRole('button', nextPokemon);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getAllByTestId('pokemon-name').length).toBe(1);
    userEvent.click(buttonNextPokemon);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonNextPokemon = getByRole('button', nextPokemon);
    const buttonTypeFire = getByRole('button', { name: 'Fire' });
    const buttonTypePsychic = getByRole('button', { name: 'Psychic' });

    userEvent.click(buttonTypeFire);
    expect(getByText('Charmander')).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);
    expect(getByText('Rapidash')).toBeInTheDocument();
    userEvent.click(buttonTypePsychic);
    expect(getByText('Alakazam')).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);
    expect(getByText('Mew')).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonTypeAll = getByRole('button', { name: 'All' });
    const buttonTypeFire = getByRole('button', { name: 'Fire' });

    userEvent.click(buttonTypeFire);
    expect(getByText('Charmander')).toBeInTheDocument();
    userEvent.click(buttonTypeAll);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Teste se é criado, dinamicamente, um botão para cada tipo de Pokémon.', () => {
    const { getByRole, getAllByRole, getAllByTestId } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: 'All' });
    const buttonNextPokemon = getByRole('button', nextPokemon);
    const buttonsByTestId = getAllByTestId('pokemon-type-button');
    const maxButtonsQuantitylength = 9;
    const maxButtonsQuantity = getAllByRole('button');

    expect(buttonAll).toBeInTheDocument();
    expect(buttonNextPokemon).toBeInTheDocument();
    for (let index = 0; index < buttonsByTestId.length; index += 1) {
      expect(buttonsByTestId[index]).toBeInTheDocument();
    }
    expect(maxButtonsQuantity.length).toBe(maxButtonsQuantitylength);
  });

  it('Botão de próximo pokémon, desabilitado, lista de Pokémons tiver um pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonNextPokemon = getByRole('button', nextPokemon);
    const buttonTypeElectric = getByRole('button', { name: 'Electric' });

    userEvent.click(buttonTypeElectric);
    expect(getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
