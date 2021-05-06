import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

test('has a heading with text `About Pokédex`', () => {
  const { getByRole } = renderWithRouter(<About />);
  const heading = getByRole('heading', { level: 2 });
  expect(heading.textContent).toBe('About Pokédex');
});

test('has two paragraphs with text', () => {
  const { getAllByText } = renderWithRouter(<About />);
  const paragraphs = getAllByText(/Pokémons/i);
  expect(paragraphs.length).toBe(2);
});

test('has a picture with the tested path', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const image = getByAltText('Pokédex');
  expect(image.src)
    .toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
