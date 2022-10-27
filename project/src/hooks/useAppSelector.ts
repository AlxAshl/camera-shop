import { State } from '../types/state';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
