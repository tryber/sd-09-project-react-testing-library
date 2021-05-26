import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About.js', () => {
  test('Verify Heading h2 and text About Pokédex', () => {
    render(<About />);

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe('About Pokédex');
  });

  test('Test if exists 2 paragraphs about Pokédex', () => {
    render(<About />);

    const paragraphs = screen.getAllByText(/Pokémons/);
    expect(paragraphs.length).toBe(2);
  });

  test('Test image', () => {
    render(<About />);

    const pathImage = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(image.src).toBe(pathImage);
  });
});
