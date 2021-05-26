import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Test "About" functionality', () => {
  test('Component renders all "Pokédex" info', () => {
    render(<About />);
    const mainMessage = screen.getByText('About Pokédex');
    expect(mainMessage).toBeInTheDocument();
  });
  test('Render "h2" tag with value = "About Pokédex"', () => {
    render(<About />);
    const h2Element = screen.getByRole('heading');
    expect(h2Element).toBeInTheDocument();
  });
  test('Render 2 paragraphs', () => {
    render(<About />);
    const paragraphs = screen.getAllByText(/Pokémons/);
    expect(paragraphs.length).toBe(2);
  });
  test('Cheks the image url', () => {
    render(<About />);
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgUrl = screen.getByAltText('Pokédex');
    expect(imgUrl.src).toBe(url);
  });
});
