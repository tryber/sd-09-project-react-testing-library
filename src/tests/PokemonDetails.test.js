import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const MoreDetails = 'More details';

test('render pokemon info', () => {
  const { getByRole, getAllByRole, queryByRole, queryByText } = renderWithRouter(<App />);
  const details = getByRole('link', { name: MoreDetails });
  fireEvent.click(details);
  const h2 = getAllByRole('heading', { ariaLevel: 2 });
  expect(h2[1]).toHaveTextContent(`${pokemons[0].name} Details`);
  const details2 = queryByRole('link', { name: MoreDetails });
  expect(details2).toBe(null);
  expect(h2[2]).toHaveTextContent('Summary');
  const info = queryByText(pokemons[0].summary);
  expect(info).toBeInTheDocument();
});

test('location maps', () => {
  const { getByRole,
    queryByRole,
    queryAllByRole,
    queryByText } = renderWithRouter(<App />);
  const details = getByRole('link', { name: MoreDetails });
  fireEvent.click(details);
  const gameLocations = queryByRole(
    'heading',
    { ariaLevel: 2, name: `Game Locations of ${pokemons[0].name}` },
  );
  expect(gameLocations).toBeInTheDocument();
  pokemons[0].foundAt.forEach(({ location, map }, index) => {
    const mapImage = queryAllByRole('img', { name: /location/ });
    const mapName = queryByText(location);
    expect(mapImage[index].src).toBe(map);
    expect(mapImage[index].alt).toBe(`${pokemons[0].name} location`);
    expect(mapName).toBeInTheDocument();
  });
});

test('favorite checkbox', () => {
  const { getByRole,
    queryByLabelText,
    queryByRole } = renderWithRouter(<App />);
  const details = getByRole('link', { name: MoreDetails });
  fireEvent.click(details);
  const checkbox = queryByLabelText('Pokémon favoritado?');
  expect(checkbox).toBeInTheDocument();
  fireEvent.click(checkbox);
  const favIcon = queryByRole('img', { name: /favorite/ });
  expect(favIcon).toBeInTheDocument();
  fireEvent.click(checkbox);
  const favIcon2 = queryByRole('img', { name: /favorite/ });
  expect(favIcon2).not.toBeInTheDocument();
});
