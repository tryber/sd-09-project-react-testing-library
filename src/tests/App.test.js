import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

  const homeLink = getByText(/home/i);
  const aboutLink = getByText(/about/i);
  const favoriteLink = getByText(/Favorite Pokémons/i);

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoriteLink).toBeInTheDocument();

  userEvent.click(homeLink);
  expect(heading).toBeInTheDocument();

  userEvent.click(aboutLink);
  const aboutHeading = getByText(/About Pokédex/i);
  expect(aboutHeading).toBeInTheDocument();

  userEvent.click(favoriteLink);
  const favoriteHeading = getByRole('heading', {
    level: 2,
    name: 'Favorite pokémons',
  });
  expect(favoriteHeading).toBeInTheDocument();

  history.push('/pagina-desconhecida/');
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
