// import { MutationDefinition } from '@reduxjs/toolkit/dist/query';
// import { MutationActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch:typeof useDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// // Use throughout your app instead of plain rtk query mutation trigger
// export const unwrap = async <T = any>(action: T
// & MutationActionCreatorResult<MutationDefinition<T>>) => {
// 	let result;
// 	try {
// 		result = {
// 			data: await action.unwrap(),
// 			error: undefined
// 		};
// 	} catch (error: any) {
// 		result = { data: undefined, error };
// 	}
// 	return result;
// };
