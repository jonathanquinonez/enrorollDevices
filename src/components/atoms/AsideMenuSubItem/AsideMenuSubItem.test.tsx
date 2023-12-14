import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

// Components
import AsideMenuSubItem from './AsideMenuSubItem';

describe('AsideMenuSubItem tests', () => {
  let component: RenderAPI;
  beforeEach(() => {
    component = render(<AsideMenuSubItem />);
  });

  test('AsideMenuSubItem rendered correctly', () => {
    expect(component).not.toBeNull();
  });
});
