import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('2nd Requisite: Test <About /> component', () => {
  it('has Pokédex infos', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/This application/)).toBeInTheDocument();
  });
  it('has \'About Pokédex\' textValue in h2 tag', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/,
    });
    expect(heading).toBeInTheDocument();
  });
  it('has two paragraphs with text about Pokédex', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/This application/)).toBeInTheDocument();
    expect(screen.getByText(/One can filter/)).toBeInTheDocument();
  });
  it('has specific img src shown', () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('img').src)
      .toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
