import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

// Components
import RotateSpringAnimation from './RotateSpringAnimation';

describe('RotateSpringAnimation tests', () => {
  let component: RenderAPI;
  beforeEach(() => {
    component = render(<RotateSpringAnimation />);
  });

  test('RotateSpringAnimation rendered correctly', () => {
    expect(component).not.toBeNull();
  });
});
