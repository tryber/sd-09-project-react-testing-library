import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('testando quisito 7', () => {
  test('verifica se contem o nome do pokemon ', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('More details')).toBeInTheDocument();
    userEvent.click(getByText('More details'));
    expect(getByText('Pikachu Details')).toBeInTheDocument();
  });
});
