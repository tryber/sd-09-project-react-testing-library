import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testing <About.js />', () => {
  it('Should contain informations about Pokédex', () => {
    const { getByText } = render(<About />);
    const about = getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
  });

  it('Should contain a h2 heading with the text `About Pokédex`', () => {
    const { getByRole } = render(<About />);
    const h2 = getByRole('heading', { name: /About Pokédex/i });
    expect(h2).toBeInTheDocument();
  });

  it('Should contain two paragraphs with informations about Pokédex', () => {
    const { getAllByText } = render(<About />);
    const paragraphs = getAllByText(/Pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  it('Should contain an image of a Pokédex', () => {
    const { getByAltText } = render(<About />);
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByAltText(/Pokédex/i);
    expect(image.src).toBe(url);
  });
});
