import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('Testa o comportamento do Component <About />', () => {
  test('Se a página contém um header com o texto `About Pokédex`', () => {
    const { getByRole } = render(<About />);
    const header = getByRole('heading', {
      level: 2,
      name: /About Pokédex/,
    });
    expect(header).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const paragraph = getByText(/This application simulates a Pokédex/);
    expect(paragraph).toBeInTheDocument();
  });

  test('Se a URL da imagem renderizada está correta.', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img');
    console.log(image);
    expect(image.src)
      .toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
