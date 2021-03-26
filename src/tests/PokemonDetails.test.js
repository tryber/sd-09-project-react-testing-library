import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('if info details of selected pokemon is rendered', () => {
  const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);

  const moreDetailsLink = getByText('More details');
  fireEvent.click(moreDetailsLink);
  expect(getByRole('heading', {
    level: 2, name: 'Pikachu Details' })).toHaveTextContent('Pikachu Details');
  expect(getByRole('heading', {
    level: 2, name: 'Summary' })).toHaveTextContent('Summary');
  const paragraph = 'This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.';
  expect(getByText(paragraph)).toBeInTheDocument();
  expect(getByRole('heading', {
    level: 2, name: 'Game Locations of Pikachu' })).toHaveTextContent(
    'Game Locations of Pikachu',
  );
  const altLocation = 'Pikachu location';

  const allLocations = getAllByAltText(altLocation);
  expect(allLocations[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(allLocations[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  const firstImage = allLocations[0];
  expect(firstImage.alt).toBe(altLocation);
  const secondImage = allLocations[1];
  expect(secondImage.alt).toBe(altLocation);
});

test('if the user can favorite a pokemon throughout page details', () => {
  const { getByText, getByRole, getByLabelText } = renderWithRouter(<App />);

  const moreDetailsLink = getByText('More details');
  fireEvent.click(moreDetailsLink);
  const checkbox = getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  const checkboxLabel = getByLabelText('Pokémon favoritado?');
  expect(checkboxLabel).toBeChecked();
});
