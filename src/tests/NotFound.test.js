import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from '../components';

describe('testing component NotFound', () => {
  it('should contain one tag h2 with text Page requested no found', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const tagH2 = screen.getByRole('heading', { name: /page/i });

    expect(tagH2.innerHTML).toContain('Page requested not found');
  });

  it('should have a img', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const alt = 'Pikachu crying because the page requested was not found';
    const imageSrc = screen.getByAltText(alt);

    expect(imageSrc.src).toBe(image);
  });
});
