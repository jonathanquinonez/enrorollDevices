import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

// Components
import AsideMenuItem from './AsideMenuItem';

describe('AsideMenuItem tests', () => {
  let component: RenderAPI;
  beforeEach(() => {
    component = render(<AsideMenuItem />);
  });

  test('AsideMenuItem rendered correctly', () => {
    expect(component).not.toBeNull();
  });
});
