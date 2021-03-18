import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('test the content of about page', () => {
  test('tests whether the page contains information from pokedex', () => {
    const { getByText } = render(<About />);
    const information = getByText(/This application simulates a Pokédex/i);
    expect(information).toBeInTheDocument();
  });
  test('test whether a level 2 header tag exists', () => {
    const { getByRole } = render(<About />);
    const header = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(header).toBeInTheDocument();
  });
  test('the page has two paragraphs about pokedex', () => {
    const { getByText } = render(<About />);
    const firstParagraph = getByText(/This application simulates a Pokédex/i);
    const secondParagraph = getByText(/One can filter Pokémons by type/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  test('tests whether there is an example image of a pokédex', () => {
    const { getByAltText } = render(<About />);
    const getImageByAlt = getByAltText('Pokédex');
    expect(getImageByAlt.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
