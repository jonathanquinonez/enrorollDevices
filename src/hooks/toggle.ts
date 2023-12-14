import { useCallback, useState } from 'react';

const useToggle = (initialState = false): [boolean, any] => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback((): void => setState(prev => !prev), []);
  return [state, toggle];
};

export default useToggle;
