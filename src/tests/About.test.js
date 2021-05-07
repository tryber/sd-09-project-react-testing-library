import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { About } from '../components';

describe('testing the <About.js / component.', () => {
  test('If the page contains information about Pokédex.', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('navigation').children[1];

    userEvent.click(about);
    expect(about).toBeInTheDocument();
    expect(about.text).toBe('About');
    expect(about.pathname).toBe('/about');
  });

  test('if the page contains an h2 heading with the text About Pokédex', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(h2).toBeInTheDocument();

    const paragraphOne = h2.nextSibling.children[0].textContent;
    const paragraphTwo = h2.nextSibling.children[1].textContent;

    expect(paragraphOne).toMatch(/This application simulates a Pokédex/);
    expect(paragraphTwo).toMatch(/One can filter Pokémons by type/);
  });

  test('if the page contains a Pokédex image', () => {
    renderWithRouter(<About />);
    const imageAbout = screen.getByAltText('Pokédex');

    expect(imageAbout).toBeInTheDocument();
    expect(imageAbout.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
