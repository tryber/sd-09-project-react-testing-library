import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import renderpag from '../services/renderpag';
import App from '../App';

test('Testa o componente Pokémon', () => {
  const { getByTestId, getByAltText, getByText } = renderpag(<App />);
  expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
  expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
  expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');
  const image = getByAltText('Pikachu sprite');
  expect(image).toBeInTheDocument();
  expect(image).not.toHaveAttribute('src', '');
  const detalhes = getByText('More details');
  expect(detalhes).toHaveAttribute('href', '/pokemons/25');
  userEvent.click(detalhes);
});

test('testando url', () => {
  const { getByText, history } = renderpag(<App />);
  fireEvent.click(getByText(/More details/));
  expect(history.location.pathname).toBe('/pokemons/25');
});

test('testando estrelinha', () => {
  const { getByRole, getByText, getByAltText } = renderpag(<App />);
  fireEvent.click(getByText(/More details/));
  fireEvent.click(getByRole('checkbox'));
  expect(getByAltText('Pikachu is marked as favorite')).toHaveProperty('src', 'http://localhost/star-icon.svg');
});

// referencias dos projetos de JRGCast, Cainan e Lucas Duque, turma 8
