import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testing About.js', () => {
  test('tests whether the page contains information about pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const info = getByText(/This application simulates a Pokédex/);
    const infoTwo = getByText(/One can filter Pokémons by type/);
    expect(info).toBeInTheDocument();
    expect(infoTwo).toBeInTheDocument();
  });

  test('tests if it contains an h2 heading with the text About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2, name: /About Pokédex/ });
    expect(heading).toBeInTheDocument();
  });

  test('tests if the page contains two paragraphs with pokédex information', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const paragraphs = getAllByText(/Pokémons/);
    expect(paragraphs.length).toBe(2);
  });

  test('tests whether the page has a pokédex image', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(url);
  });
});
