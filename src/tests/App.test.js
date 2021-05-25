import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const verifyLinkRouter = (content, path) => {
  const { history } = renderWithRouter(<App />);
  const contentNode = screen.getByText(content);

  userEvent.click(contentNode);

  const { location: { pathname } } = history;
  expect(pathname).toBe(path);
};

describe('Testig component App.js', () => {
  it('testing pathname of home page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const h1 = screen.getByText(/Pokédex/i);
    expect(h1).toBeInTheDocument();
  });

  it('verify router link of Home', () => {
    const content = /Home/i;
    verifyLinkRouter(content, '/');
  });

  it('verify router link of About', () => {
    const content = /About/i;
    verifyLinkRouter(content, '/about');
  });

  it('verify router link of Favorite Pokémons', () => {
    const content = /Favorite Pokémons/i;
    verifyLinkRouter(content, '/favorites');
  });
});
