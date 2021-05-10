import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Check component not found', () => {
  // Verifica se página contém um heading h2 com o texto Page requested not found
  it(`Checks whether the page contains an h2 heading with the text Page 
  requested not found`, () => {
    const { getByRole } = render(<NotFound />);
    const checkH2 = getByRole('heading',
      { name: /page requested not found Crying emoji/i });
    expect(checkH2.tagName).toBe('H2');
  });
  // Verifica se a pagina mostra a imagem e o texto alternativo
  it('Checks if the page shows the image and the alternative text  ', () => {
    const { getByAltText } = render(<NotFound />);
    const checkLinkImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const msgImg = 'Pikachu crying because the page requested was not found';
    const altImg = getByAltText(msgImg);
    expect(altImg.src).toBe(checkLinkImage);
  });
});
