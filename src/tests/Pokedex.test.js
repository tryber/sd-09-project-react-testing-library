import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';

describe('testes da pagina pokedex', () => {
  it('h2 com texto - Encountered pokémons', () => {
    // access
    const { getByRole } = renderWithRouter(<App />);
    const aga2 = getByRole('heading', { level: 2 });

    // test
    expect(aga2).toHaveTextContent('Encountered pokémons');
  });

  it('botao com texto - All', () => {
    // access
    const { getByText } = renderWithRouter(<App />);
    const bottonAll = getByText('All');

    // test
    expect(bottonAll.textContent).toBe('All');
  });

  it('botao com texto - Próximo pokémon ', () => {
    // access
    const { getByTestId } = renderWithRouter(<App />);
    const bottonNext = getByTestId('next-pokemon');

    // test
    expect(bottonNext.textContent).toBe('Próximo pokémon');
  });

  it('botos de filtro - ire, Psychic, Electric, Bug, Poison, Dragon e Normal', () => {
    // access
    const { getAllByTestId } = renderWithRouter(<App />);
    const bottonType = getAllByTestId('pokemon-type-button');

    // test
    expect(bottonType[0].textContent).toBe('Electric');
    expect(bottonType[1].textContent).toBe('Fire');
    expect(bottonType[2].textContent).toBe('Bug');
    expect(bottonType[3].textContent).toBe('Poison');
    expect(bottonType[4].textContent).toBe('Psychic');
    expect(bottonType[5].textContent).toBe('Normal');
    expect(bottonType[6].textContent).toBe('Dragon');
  });

  it('teste do botao de resetar o filtro', () => {
    // access
    const { getByText } = renderWithRouter(<App />);
    const bottonAll = getByText('All');

    // interact
    fireEvent.click(bottonAll);

    // interact
    // const choiceOfClick = fireEvent.click(bottonAll);

    // test // testa ser foi clicado
    // expect(choiceOfClick).toBe(true);
  });
});
