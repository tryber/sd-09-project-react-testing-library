import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

test('Tests Pokemon', () => {
  const pikachu = pokemons[0];
  const { id, name, type, image, averageWeight: { value, measurementUnit } } = pikachu;
  const history = createBrowserHistory();
  const { getByText, getByRole } = render(
    <Router history={ history }>
      <Pokemon pokemon={ pikachu } isFavorite />
    </Router>,
  );

  expect(getByText(name)).toBeInTheDocument();
  expect(getByText(type)).toBeInTheDocument();
  expect(
    getByText(`Average weight: ${value} ${measurementUnit}`),
  ).toBeInTheDocument();

  const imgContent = getByRole('img', { name: `${name} sprite` });
  expect(imgContent).toHaveAttribute('src', image);
  const details = getByRole('link', { name: 'More details' });
  expect(details).toHaveAttribute('href', `/pokemons/${id}`);
  userEvent.click(details);
  expect(history.location.pathname).toBe(`/pokemons/${id}`);
  const favorite = getByRole('img', { name: `${name} is marked as favorite` });
  expect(favorite).toHaveAttribute('src', '/star-icon.svg');
});
