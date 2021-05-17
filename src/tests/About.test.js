import React from 'react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('2. Teste o componente <About.js />', () => {
  it('Test if the page contains an h2 header with the text About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const header = getByRole('heading', {
      level: 2,
    });

    expect(header.textContent).toBe('About Pokédex');
  });

  it('Test if the page contains two paragraphs with text about Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const twoParagraphs = getAllByText(/Pokédex/i);

    expect(twoParagraphs.length).toBe(2);
  });

  it('Test if the page contains the following image of a Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const image = getByRole('img');

    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
