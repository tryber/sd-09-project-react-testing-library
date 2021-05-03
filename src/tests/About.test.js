import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About', () => {
  test('Verifica se a página contem as informações sobre a Pokédex', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const contentText = getByText('About Pokédex');
    expect(contentText).toBeInTheDocument();
  });
});

test('Verifica se a página contem um heading h2', () => {
  render(<About />);
  const headingPage = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(headingPage).toBeInTheDocument();
});

test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = render(<About />);

  const paragraph = container.querySelectorAll('p');
  expect(paragraph[0].value).toBe();
  expect(paragraph[1].value).toBe();
  expect(paragraph.length).toBe(2);
});

test('Verifica se a página carrega a imagem ', async () => {
  const { getByAltText } = await render(<About />);
  const image = getByAltText('Pokédex');
  expect(image.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
