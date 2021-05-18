import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Test the `<About.js />` component', () => {
  it('the page contains an h2 heading with the text `About Pokédex`', () => {
    renderWithRouter(<About />);
    const headingAbout = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(headingAbout).toBeInTheDocument();
  });

  it('the page contains two paragraphs with text about the Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
    expect(getByText(/One can filter Pokémons by type,/i)).toBeInTheDocument();
  });

  it('the page contains a specific Pokédex image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
