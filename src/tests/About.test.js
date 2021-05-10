import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testing the <About.js / component.', () => {
  test('information about Pokédex.', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const aboutMeText = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutMeText).toBeInTheDocument();
  });

  test('Testing two paragraphs with text on Pokédex.', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const p1 = getByText(/This application simulates/i);
    expect(p1).toBeInTheDocument();
    const p2 = getByText(/One can filter/i);
    expect(p2).toBeInTheDocument();
  });

  test('Test if the page contains the following image of a Pokédex', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const image = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img.src).toBe(image);
  });
});
