import { AllActions, SET_FILTER } from './filter.actions';

const initState = 'SHOW_ALL';
export function filterReducer(oldState: string = initState, action: AllActions): string {
  switch (action.type) {
    case SET_FILTER: {
      return action.newFilter;
    }
    default: {
      return oldState;
    }
  }
}
