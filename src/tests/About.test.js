import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('A página deve conter informações sobre a Pokedex', () => {
  const { getByText } = render(<About />);
  const heading = getByText('About Pokédex');

  expect(heading).toBeInTheDocument();
});

test('A página deve um elemento h2 com o texto: About Pokedex', () => {
  const { getByText, container } = render(<About />);
  const heading = getByText('About Pokédex');
  const element = container.querySelector('h2');

  expect(heading).toBeInTheDocument();
  expect(element).toBeInTheDocument();
  expect(heading.tagName).toBe('H2');
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = render(<About />);
  const p = container.querySelectorAll('p');
  const n2 = 2;

  expect(p.length).toBe(n2);
});

test('A página deve conter a imagem de uma Pokédex(url no readme)', () => {
  const { getByRole } = render(<About />);
  const img = getByRole('img');
  const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(img.src).toBe(src);
});
