import React from 'react';
import { render } from '@testing-library/react';
import Aboult from '../components/About';

describe('Bloco de testes para o componente About.js', () => {
  it('Testa se a página contem as informacoes da Pokédex', () => {
    const { getByText } = render(<Aboult />);
    const aboutTitle = getByText('About Pokédex');
    const aboutParagraph = getByText(/This application simulates a Pokédex/i);

    expect(aboutTitle.textContent).toBe('About Pokédex');
    expect(aboutParagraph.textContent).toMatch(/This application simulates a Pokédex/i);
  });

  it('Testa de se a página contem um h2 com o texto "About Pokédex"', () => {
    const { getByRole } = render(<Aboult />);
    const aboutH2 = getByRole('heading', { level: 2 });

    expect(aboutH2).toBeInTheDocument();
  });

  it('Testa se a página contem dois parágrafos com textos sobre a Pókedex', () => {
    const { getByText } = render(<Aboult />);
    const firstAboutParagraph = getByText(/This application simulates/i);
    const secondAboutParagraph = getByText(/One can filter Pokémons/i);

    expect(firstAboutParagraph.textContent).toMatch(/This application simulates/i);
    expect(secondAboutParagraph.textContent).toMatch(/One can filter Pokémons/i);
  });

  it('Testa se a pagina contem uma imagem', () => {
    const { getByRole } = render(<Aboult />);
    const aboutImage = getByRole('img');

    expect(aboutImage.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
