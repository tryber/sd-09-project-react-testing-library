import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Tests App.js', () => {
  beforeEach(() => render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  ));

  test('Pokedex Homepage Renders', () => {
    [/Pokédex/, /Encountered pokémons/].forEach((re) => {
      expect(screen.getByText(re)).toBeInTheDocument();
    });
  });

  test('Navigation Links', () => {
    [/Home/, /About/, /Favorite Pokémons/].forEach((re) => {
      expect(screen.getByText(re)).toBeInTheDocument();
    });
  });
});
