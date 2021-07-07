import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { NotFound } from '../components';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Verifica o componente NotFound', () => {
  it('Verifica se há um heading h2 com o texto "Page requested not found 😭"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const title = getByRole('heading');
    expect(title).toHaveTextContent(/Page requested not found 😭/);
  });

  it('Verifica se há uma imagem desejada', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
