import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import APP from '../App';

describe('testes na tela da pokedex', () => {
  it('verifica se o texto encountered pokémons se encontra na tela', () => {
    const { getByText } = renderWithRouter(<APP />);
    const heading = getByText(/encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });
  it('verifica se aparece apenas um pokemon na pagina', () => {
    const { getAllByRole } = renderWithRouter(<APP />);
    const imagemUnica = getAllByRole('img');
    expect(imagemUnica).toHaveLength(1);
  });

  it('verifica se há o botão proximo pokemon', () => {
    const { getByRole } = renderWithRouter(<APP />);
    const button = getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();
  });

  it('proximo pokemon ao ser clicado no botão', () => {
    const { getByText, getByTestId } = renderWithRouter(<APP />);
    const button = getByTestId('next-pokemon');
    const pokemon1 = getByText(/pikachu/i);
    expect(pokemon1).toBeInTheDocument();
    fireEvent.click(button);
    const pokemon2 = getByText(/charmander/i);
    expect(pokemon2).toBeInTheDocument();
    fireEvent.click(button);
    const pokemon3 = getByText(/caterpie/i);
    expect(pokemon3).toBeInTheDocument();
    fireEvent.click(button);
    const pokemon4 = getByText(/ekans/i);
    expect(pokemon4).toBeInTheDocument();
    fireEvent.click(button);
    const pokemon5 = getByText(/alakazam/i);
    expect(pokemon5).toBeInTheDocument();
    fireEvent.click(button);
    const pokemon6 = getByText(/mew/i);
    expect(pokemon6).toBeInTheDocument();
    fireEvent.click(button);
    const pokemon7 = getByText(/rapidash/i);
    expect(pokemon7).toBeInTheDocument();
    fireEvent.click(button);
    const pokemon8 = getByText(/snorlax/i);
    expect(pokemon8).toBeInTheDocument();
    fireEvent.click(button);
    const pokemon9 = getByText(/dragonair/i);
    expect(pokemon9).toBeInTheDocument();
    fireEvent.click(button);
    expect(pokemon1).toBeInTheDocument();
  });
  it('testa se tem os 7 botoes por filtro', () => {
    const { getAllByTestId } = renderWithRouter(<APP />);
    const numberOfButtons = 7;
    const buttons = getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(numberOfButtons);
  });

  it('testa o botão ALL', () => {
    const { getByRole } = renderWithRouter(<APP />);
    const buttonAll = getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);
  });
  it('testa o filtro da pokedex', () => {
    const { getByRole, getByText } = renderWithRouter(<APP />);
    const electricButton = getByRole('button', { name: /electric/i });
    fireEvent.click(electricButton);
    const findPikachu = getByText(/pikachu/i);
    expect(findPikachu).toBeInTheDocument();
    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeDisabled();
  });
});
