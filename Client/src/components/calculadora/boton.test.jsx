import React from 'react';
import { render, screen } from '@testing-library/react';
import Boton from './boton';

test('renders boton component', () => {
    render(<Boton />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
});