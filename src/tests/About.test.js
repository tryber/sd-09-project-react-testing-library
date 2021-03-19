import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Requirement 2: Test the component <About.js />', () => {
  test('Tests if the page have information about the Pokedex', () => {
    const { getByText } = renderWithRouter(<About />);

    const paragraphOne = getByText(/simulates a Pokédex/i);
    expect(paragraphOne).toBeInTheDocument();

    const paragraphTwo = getByText(/can filter Pokémons/i);
    expect(paragraphTwo).toBeInTheDocument();
  });

  test('Tests if the page have a "h2" with the text "About Pokédex"', () => {
    const { getByRole, getByText } = renderWithRouter(<About />);

    const aboutHeading = getByRole('heading', {
      level: 2,
    });
    expect(aboutHeading).toBeInTheDocument();

    const abooutHeadingText = getByText('About Pokédex');
    expect(abooutHeadingText).toBeInTheDocument();
  });

  test('Tests if the page have two paragraphs', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const paragraphs = getAllByText(/Pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  test('Tests if the page load the correct image', () => {
    const { getByRole } = renderWithRouter(<About />);

    const img = getByRole('img');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
