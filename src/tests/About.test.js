import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Requirement 2', () => {
  test('if the page has informations about the Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const informationsAbout = getByText('About Pokédex');
    expect(informationsAbout).toBeInTheDocument();
  });

  test('if the page has an h2 with the text: "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);

    const h2About = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(h2About).toBeInTheDocument();
  });

  test('if the page has two paragraphs with some text about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const firstParagraphAbout = getByText(/This application simulates a Pokédex/i);
    expect(firstParagraphAbout).toBeInTheDocument();

    const secondParagraphAbout = getByText(/One can filter Pokémons by type/i);
    expect(secondParagraphAbout).toBeInTheDocument();
  });

  test('if the page has the following image of a Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const imgURL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = getByAltText(/Pokédex/i);

    expect(pokedexImage).toHaveAttribute('src', imgURL);
    expect(pokedexImage).toBeInTheDocument();
  });
});
