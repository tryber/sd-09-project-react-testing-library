import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Test <About /> Component', () => {
  it('should render "about" page', () => {
    const { getByText } = render(<About />);
    const pageTitle = getByText('About Pokédex');
    expect(pageTitle).toBeInTheDocument();
  });

  it('should have a h2 tag with text "About Pokédex"', () => {
    const { getByRole } = render(<About />);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2.textContent).toBe('About Pokédex');
    expect(h2).toBeInTheDocument();
  });

  it('should render tow paragraphs with Pokédex information', () => {
    const { getAllByText } = render(<About />);
    const paragraphs = getAllByText(/pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  it('should render an image', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');
    const imgPath = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(imgPath);
  });
});
