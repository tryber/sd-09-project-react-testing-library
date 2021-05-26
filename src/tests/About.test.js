import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import About from '../components/About';

describe('Tests for the About component', () => {
  it('should show a page containing the Pokédex info', () => {
    const { getByText } = renderWithRouter(<About />);

    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  it('should have a h2 component in the page', () => {
    const { getByRole } = renderWithRouter(<About />);

    const heading2 = getByRole('heading', {
      level: 2,
    });

    expect(heading2).toBeInTheDocument();
  });

  it('should have 2 paragraphs with text', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const paragraphs = getAllByText(/Pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  it('should have an image with a specific URL', () => {
    const { getByRole } = renderWithRouter(<About />);
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(getByRole('img').src).toBe(url);
  });
});
