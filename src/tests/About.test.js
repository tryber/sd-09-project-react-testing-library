import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

// Testando pagina About
describe('Testing page "About"', () => {
  // Verifica se a pagina possui um h2 com texto About Pokédex
  it('check if the page has an h2 with text "About Pokédex"', () => {
    const { getByRole } = render(<About />);
    const checkH2 = getByRole('heading', { name: 'About Pokédex' });
    expect(checkH2.tagName).toBe('H2');
  });
  // Verifica se a página possui dois paragrafos
  it('Checks if the page has two paragraphs', () => {
    const { getByText } = render(<About />);
    const checkParagraph = getByText(/This application simulates a Pokédex/);
    expect(checkParagraph).toBeInTheDocument();
  });
  // Verifica se a pagina contem imagem
  it('Checks if the page contains an image', () => {
    const { getByRole } = render(<About />);
    const urlImage = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const checkImage = getByRole('img');
    expect(checkImage.src).toBe(urlImage);
  });
});
