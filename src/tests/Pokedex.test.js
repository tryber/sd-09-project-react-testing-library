import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('testando quisito 5', () => {
  test('verifica se h2 contem `Encountered pokémons`', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('chamando próximo pokémon da lista', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/próximo pokémon/i));
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  test('mostrando pokemon um a um', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(screen.getByText(/próximo pokémon/i));
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(screen.getByText(/próximo pokémon/i));
    expect(screen.getByText('Caterpie')).toBeInTheDocument();
  });

  test('mostrando o primeiro pokemom depois do ultimo', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('filtrar todos os typos', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: 'All' });
    fireEvent.click(buttonAll);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('filtrar botões com typos', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const allTypeButtons = getAllByTestId('pokemon-type-button');
    expect(allTypeButtons[0]).toHaveTextContent('Electric');
    expect(allTypeButtons[1]).toHaveTextContent('Fire');
    expect(allTypeButtons[2]).toHaveTextContent('Bug');
    expect(allTypeButtons[3]).toHaveTextContent('Poison');
    expect(allTypeButtons[4]).toHaveTextContent('Psychic');
    expect(allTypeButtons[5]).toHaveTextContent('Normal');
    expect(allTypeButtons[6]).toHaveTextContent('Dragon');
  });
});
