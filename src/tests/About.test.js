import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('tests the component App.js', () => {
  it('contains info about Pokédex in the page', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph = getByText(/About Pokédex/i);

    expect(paragraph).toBeInTheDocument();
  });

  it('contains a Heading with title About Pokédex in the page', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutPokedex = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(aboutPokedex).toBeInTheDocument();
  });

  it('contains two paragraphs with text about Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const text = getAllByText(/Pokémons/i);

    expect(text.length.toString()).toBe('2');
  });

  it('contains a specific image of a Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const img = getByAltText(/Pokédex/i);

    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
