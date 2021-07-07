import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { About } from '../components';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Verifica o componente about', () => {
  it('Verifica se há dois parágrafos', () => {
    const { container } = renderWithRouter(<About />);
    const paragraph = container.querySelectorAll('p');
    const quantityParagraph = 2;
    expect(paragraph.length).toBe(quantityParagraph);
  });

  it('Verifica se há um título "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const title = getByRole('heading');
    expect(title).toHaveTextContent(/About Pokédex/);
  });

  it('tests if there is an image', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const imageText = getByAltText(/Pokédex/i);
    expect(imageText).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
