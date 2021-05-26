import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const heading = getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent('Encountered pokémons');
});

test('Teste se é exibido o próximo Pokémon da lista quando clica no botão', () => {
  const { getByText } = renderWithRouter(<App />);
  const pokemons = (
    ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
      'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair']
  );
  const button = getByText('Próximo pokémon');
  pokemons.forEach((element) => {
    const pokemon = getByText(element);
    expect(pokemon).toBeInTheDocument();
    fireEvent.click(button);
  });
  const pikachu = getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  const { getAllByText } = renderWithRouter(<App />);
  const moreDetails = getAllByText('More details');
  expect(moreDetails.length).toBe(1);
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  const { getByText, getAllByText } = renderWithRouter(<App />);
  const buttonFire = getByText('Fire');
  fireEvent.click(buttonFire);
  let fire = getAllByText('Fire');
  expect(fire.length).toBe(2);
  const nextButton = getByText(/Próximo/i);
  fireEvent.click(nextButton);
  fire = getAllByText('Fire');
  expect(fire.length).toBe(2);
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonAll = getByText('All');
  expect(buttonAll).toBeInTheDocument();
  fireEvent.click(buttonAll);
  const pikachu = getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
});

test('Teste se é criado, dinamicamente, um botão de filtro para cada tipo', () => {
  const { getByText, getAllByTestId } = renderWithRouter(<App />);
  const types = ['Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];
  const lengthOfTypes = 7;
  types.forEach((_, index) => {
    fireEvent.click(getByText(types[index]));
    const findType = getAllByTestId('pokemon-type-button');
    expect(findType.length).toBe(lengthOfTypes);
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
  });
});

test('O botão de Próximo pokémon deve ser desabilitado ao ter apenas um pokemon', () => {
  const { getByText, getAllByText } = renderWithRouter(<App />);
  const eletric = getAllByText('Electric');
  fireEvent.click(eletric[1]);
  fireEvent.click(getByText('Próximo pokémon'));
  const pikachu = getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
});
