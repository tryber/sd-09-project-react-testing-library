import React from 'react';
import { NotFound } from '../components';
import renderpag from '../services/renderpag';

describe('testando componente not found', () => {
  test('Teste', () => {
    const { getByText, getByAltText } = renderpag(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
