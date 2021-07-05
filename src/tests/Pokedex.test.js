import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokedex.js', () => {
  it('h2 com texto - Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const aga2 = getByRole('heading', { level: 2 });

    expect(aga2).toHaveTextContent('Encountered pokémons');
  });

  it('Próximo pokémon ', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const bottonNext = getByTestId('next-pokemon');

    expect(bottonNext.textContent).toBe('Próximo pokémon');
  });

  it('All', () => {
    const { getByText } = renderWithRouter(<App />);
    const all = getByText('All');

    expect(all.textContent).toBe('All');
  });

  it('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const bottonType = getAllByTestId('pokemon-type-button');

    expect(bottonType[0].textContent).toBe('Electric');
    expect(bottonType[1].textContent).toBe('Fire');
    expect(bottonType[2].textContent).toBe('Bug');
    expect(bottonType[3].textContent).toBe('Poison');
    expect(bottonType[4].textContent).toBe('Psychic');
    expect(bottonType[5].textContent).toBe('Normal');
    expect(bottonType[6].textContent).toBe('Dragon');
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const all = getByText('All');

    fireEvent.click(all);
  });
});
