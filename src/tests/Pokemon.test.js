import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('if a card is rendered with pokemon info', () => {
  const { getByTestId, getByRole, getByText } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-name')).toBeInTheDocument();
  expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
  expect(getByTestId('pokemonType')).toBeInTheDocument();
  expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
  expect(getByTestId('pokemon-weight')).toBeInTheDocument();
  expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');

  const moreDetailsLink = getByText('More details');

  expect(moreDetailsLink).toBeInTheDocument();
  expect(moreDetailsLink.href).toContain('/pokemons/25');

  const image = getByRole('img', { name: 'Pikachu sprite' });
  expect(image).toBeInTheDocument();
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('if it has a star image when favorited', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);
  const moreDetailsLink = getByText('More details');
  fireEvent.click(moreDetailsLink);
  expect(history.location.pathname).toBe('/pokemons/25');
  const checkbox = getByRole('checkbox');
  fireEvent.click(checkbox);
  const image = getByRole('img', { name: 'Pikachu is marked as favorite' });
  expect(image).toBeInTheDocument();
  expect(image.src).toContain('/star-icon.svg');
  expect(image.alt).toBe('Pikachu is marked as favorite');
});
