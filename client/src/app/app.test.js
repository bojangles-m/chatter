import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

it('renders message list component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('message-list')).toBeInTheDocument();
});

it('renders button top bottom', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('to-bottom')).toBeInTheDocument();
});

it('renders at least one message child', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('message-list')).toHaveTextContent('Alice was beginning');
});

it('renders senders header', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('header-sender')).toHaveTextContent('new messages');
});

it('renders Input send message', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('send-message')).toBeInTheDocument();
});
