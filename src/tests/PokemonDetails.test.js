import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

test('testing pokemon card', () => {
  const history = createMemoryHistory();
  const { getByRole, getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const href = getByRole('link', { name: /more details/i });
  userEvent.click(href);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
  expect(href).not.toBeInTheDocument();

  const heading = getByRole('heading', {
    level: 2,
    name: 'Summary',
  });
  expect(heading).toBeInTheDocument();
  const containerTxt = getByText(/This intelligent Pokémon roasts/i);
  expect(containerTxt).toBeInTheDocument();
});

test('testing pokemon card details, maps and game locations', () => {
  const history = createMemoryHistory();
  const { getByRole, getByText, getAllByAltText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const href = getByRole('link', { name: /more details/i });
  userEvent.click(href);
  const { pathname } = history.location;
  const text = getByText('Pikachu Details');
  expect(text).toBeInTheDocument();
  expect(pathname).toBe('/pokemons/25');

  const heading = getByRole('heading', {
    level: 2,
    name: 'Game Locations of Pikachu',
  });
  expect(heading).toBeInTheDocument();

  const imageMap = getAllByAltText('Pikachu location');
  expect(imageMap[0]).toBeInTheDocument();
  expect(imageMap[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(imageMap[1]).toBeInTheDocument();
  expect(imageMap[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('testing pokemon card contain checkbox to favorite pokemon', () => {
  const history = createMemoryHistory();
  const { getByRole, getByAltText, getByLabelText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const href = getByRole('link', { name: /more details/i });
  userEvent.click(href);

  const favorite = getByLabelText('Pokémon favoritado?');
  expect(favorite).toBeInTheDocument();

  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  userEvent.click(checkbox);
  expect(checkbox.checked).toEqual(true);

  const icon = getByAltText('Pikachu is marked as favorite');
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveAttribute('src', '/star-icon.svg');

  userEvent.click(checkbox);
  expect(checkbox.checked).toEqual(false);
  expect(icon).not.toBeInTheDocument();
});
