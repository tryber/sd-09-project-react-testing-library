import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test \'About.js\' Component - Requirement 02', () => {
  it('Has a h2 heading with \'About Pokédex\' text', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('About Pokédex');
  });
  it('Has 2 paragraphs, with Pokédex content', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const paragraphs = document.getElementsByTagName('p');
    expect(paragraphs.length).toBe(2);
  });
  it('Has the right Pokédex image', () => {
    const { getByAltText, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const image = getByAltText(/Pokédex/i);
    expect(image.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
