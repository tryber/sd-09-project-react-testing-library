import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('testa o component About.js', () => {
  test('testa se a página contém um heading h2', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/about');
    const heading = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  test('testa se a página contém dois parágrafos', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const firstParagraph = getByText(/This application simulates/);
    const secondParagraph = getByText(/One can filter Pokémons/);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('testa se a página contém uma determinada imagem', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/about');
    const image = getByRole('img', { name: 'Pokédex' });
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
