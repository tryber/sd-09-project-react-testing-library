import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testando o componente About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const page = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(page).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText, container } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
