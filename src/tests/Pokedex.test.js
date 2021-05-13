import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('requisito 5, testa Pokedex', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon se o botão Próximo pokémon é clicado', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', { name: 'Próximo pokémon' });
    expect(button.textContent).toBe('Próximo pokémon');
    fireEvent.click(button);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
    const dragonButton = getByText('Dragon');
    userEvent.click(dragonButton);
    expect(getByText('Dragonair')).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
    expect(queryByText('Pikachu')).toBeNull();
    userEvent.click(buttonAll);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('testa botões', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    const filterButton = getAllByTestId('pokemon-type-button');
    filterButton.forEach(({ textContent }) => {
      expect(getByRole('button', { name: textContent })).toBeInTheDocument();
    });
  });
});
