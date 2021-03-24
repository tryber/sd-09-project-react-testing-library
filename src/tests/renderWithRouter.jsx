import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
    // desestruturado para retornar mesmo comportadomento do render href course
  });
};

export default renderWithRouter;
