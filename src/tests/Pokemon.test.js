import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './History';
import App from '../App';
import pokemons from '../data';

const pokemon = pokemons[0];
const linkDetails = 'More details';

it('render pokemons card info ', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);
  const { averageWeight: { value, measurementUnit } } = pokemon;
  expect(getByTestId('pokemon-name').textContent).toBe(pokemon.name);
  expect(getByTestId('pokemon-type').textContent).toBe(pokemon.type);
  expect(getByTestId('pokemon-weight').textContent)
    .toBe(`Average weight: ${value} ${measurementUnit}`);
  expect(getByAltText(`${pokemon.name} sprite`).src).toBe(pokemon.image);
});

it('Exist a link to show more info', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText(linkDetails)).toBeInTheDocument();
});

it('More Details clicked redirect to Pokemon details', () => {
  const { getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(linkDetails));
  expect(getByText('Summary')).toBeInTheDocument();
});

it('Change URL to pokemon/<id>', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(linkDetails));
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${pokemon.id}`);
});

it('Show Star to favotited pokemon', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);
  fireEvent.click(getByText(linkDetails));
  fireEvent.click(getByText('Pokémon favoritado?'));
  const img = getByAltText(`${pokemon.name} is marked as favorite`);
  expect(img.src).toContain('/star-icon.svg');
});
