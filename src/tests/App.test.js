import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

// havia consultado o projeto de um colega para entender o MemoryRouter, mas fiz minha propria logica assim que compreendi a estrutura
test('if it renders when finish loading /', () => {
  const { getByText, history } = renderWithRouter(<App />);

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
  expect(history.location.pathname).toBe('/');
});

test('if all three links are in the top', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

test('if redirects to main page when click on Home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const button = getByText('Home');
  fireEvent.click(button);

  expect(history.location.pathname).toBe('/');
});

test('if redirects to about page when click on About', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const button = getByText('About');
  fireEvent.click(button);

  expect(history.location.pathname).toBe('/about');
});

test('if redirects to favorites page when click on Favorite Pokémons', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const button = getByText('Favorite Pokémons');
  fireEvent.click(button);

  expect(history.location.pathname).toBe('/favorites');
});
