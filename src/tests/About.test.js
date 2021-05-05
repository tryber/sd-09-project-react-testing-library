import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Component <About.js /> Test', () => {
  test('renders a heading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const heading = getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });

  test('renders text about Pokédex', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const text = getByText(/This application simulates a Pokédex/i);
    const text2 = getByText(/One can filter Pokémons by type, and see more/i);

    expect(text).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });

  test('test img src', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const img = getByRole('img');
    const src = img.getAttribute('src');
    expect(src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
