import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const history = createBrowserHistory();
  const { getByText } = render(
    <Router initialEntries={ ['/'] } history={ history }>
      <App />
    </Router>,
  );

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
  const about = getByText('About');
  const favorite = getByText('Favorite Pokémons');
  const home = getByText('Home');
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
  expect(home).toBeInTheDocument();

  userEvent.click(about);
  expect(history.location.pathname).toBe('/about');
  expect(getByText('About Pokédex')).toBeInTheDocument();

  userEvent.click(favorite);
  expect(history.location.pathname).toBe('/favorites');
  expect(getByText('Favorite pokémons')).toBeInTheDocument();

  userEvent.click(home);
  expect(history.location.pathname).toBe('/');

  history.push('/seila');
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
