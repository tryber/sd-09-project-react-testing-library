import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('testing About.js', () => {
  it('testing if the page contains pokedex information', () => {
    const { getByText } = render(<About />);

    const aboutInfo = getByText(/This application simulates/i);
    expect(aboutInfo).toBeInTheDocument();
  });

  it('testing if the page contains a heading whith text "About Pokédex"', () => {
    const { getByRole } = render(<About />);

    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('About Pokédex');
  });

  it('Testing if the page contains two paragraphs with text about a Pokédex', () => {
    const { getByText } = render(<About />);

    const text1 = getByText(/This application/);
    const text2 = getByText(/One can filter /);
    expect([text1, text2].length).toBe(2);
  });

  it('Testing if the page contains a Pokédex image', () => {
    const { getByRole } = render(<About />);

    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
