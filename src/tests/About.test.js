import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import About from '../components/About';

describe('About component tests', () => {
  it('should contain a h2 heading with About Pokédex text', () => {
    render(
      <BrowserRouter>
        <About />
        ,
      </BrowserRouter>,
    );

    const tagH2 = screen.getByRole('heading', { name: /about pokédex/i });

    expect(tagH2.innerHTML).toBe('About Pokédex');
  });

  it('should contain Pokédex image', () => {
    render(
      <BrowserRouter>
        <About />
        ,
      </BrowserRouter>,
    );

    const image = screen.getByAltText('Pokédex');

    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
