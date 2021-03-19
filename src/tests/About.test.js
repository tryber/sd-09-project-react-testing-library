import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('The page should contain a h2 with the text "About Pokédex"', () => {
  render(<About />);

  const heading = screen.getByRole('heading', { name: /about pokédex/i });
  expect(heading).toBeInTheDocument();
});

test('The page should contain two paragraphs', () => {
  render(<About />);

  const paragraphs = screen.getAllByText(/pokémons/i);
  expect(paragraphs.length).toBe(2);
});

test('The page should have a image of a Pokédex', () => {
  render(<About />);

  const image = screen.getByRole('img');
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
