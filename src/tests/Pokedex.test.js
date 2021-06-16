import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRoute';
import App from '../App';
import data from '../data';

describe('Testa o componente Pekedex', () => {
  const nameTestId = 'pokemon-name';
  const pokemonTypeTestId = 'pokemonType';
  const weightTestId = 'pokemon-weight';
  const typesButtonsTestId = 'pokemon-type-button';

  it('Verifica se a pagina está com o titulo certo', () => {
    const { getByText } = renderWithRouter(<App />);

    const title = getByText('Encountered pokémons');

    expect(title).toBeInTheDocument();
  });

  it('Troca de pokemon quando clicado no botão proximo pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = data[1];

    const button = getByTestId('next-pokemon');

    expect(button).toHaveTextContent('Próximo pokémon');

    userEvent.click(button);

    const name = getByTestId(nameTestId);
    const type = getByTestId(pokemonTypeTestId);
    const weight = getByTestId(weightTestId);

    expect(name).toHaveTextContent(data[1].name);
    expect(type).toHaveTextContent(data[1].type);
    expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  it('Aparece apenas um pokemon por vez', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = data[1];

    const name = getByTestId(nameTestId);
    const type = getByTestId(pokemonTypeTestId);
    const weight = getByTestId(weightTestId);

    expect(name).not.toHaveTextContent(data[1].name);
    expect(type).not.toHaveTextContent(data[1].type);
    expect(weight).not.toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  it('A Pokédex tem os botões de filtro', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = data[1];
    const numberOfTypes = 7;

    const buttonsType = getAllByTestId(typesButtonsTestId);
    expect(buttonsType.length).toBe(numberOfTypes);
    userEvent.click(buttonsType[1]);

    const name = getByTestId(nameTestId);
    const type = getByTestId(pokemonTypeTestId);
    const weight = getByTestId(weightTestId);

    expect(name).toHaveTextContent(data[1].name);
    expect(type).toHaveTextContent(data[1].type);
    expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  it('A Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = data[0];

    const buttonAll = getByText('All');

    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll.type).toBe('button');

    const name = getByTestId(nameTestId);
    const type = getByTestId(pokemonTypeTestId);
    const weight = getByTestId(weightTestId);

    expect(name).toHaveTextContent(data[0].name);
    expect(type).toHaveTextContent(data[0].type);
    expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const numberOfTypes = 7;

    const buttonsType = getAllByTestId(typesButtonsTestId);
    expect(buttonsType.length).toBe(numberOfTypes);
    userEvent.click(buttonsType[1]);

    expect(name).toHaveTextContent(data[1].name);

    userEvent.click(buttonAll);

    expect(name).toHaveTextContent(data[0].name);
    expect(type).toHaveTextContent(data[0].type);
    expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  it('Botões são criados dinamicamente', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    const buttonsType = getAllByTestId(typesButtonsTestId);
    expect(buttonsType.length).toBe(types.length);
    buttonsType.forEach((button, index) => {
      expect(button).toHaveTextContent(types[index]);
    });
    const buttonAll = getByText('All');

    expect(buttonAll).toBeInTheDocument();
  });

  it('O botão de Próximo pokémon deve ser desabilitado', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);

    const buttonsType = getAllByTestId(typesButtonsTestId);

    userEvent.click(buttonsType[2]);

    const nextPokemonButton = getByTestId('next-pokemon');

    expect(nextPokemonButton.disabled).toBe(true);
  });
});
