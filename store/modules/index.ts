import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux';
import todo, { TodoReduxState } from '../todo';

const rootReducer = (state: any, action: AnyAction) => {
	switch (action.type) {
		// 서버 사이드 데이터를 클라이언트 사이드 Store에 통합.
		case HYDRATE:
			return { ...action.payload };
		default: {
			const combineReducer = combineReducers({
				todo,
			});
			return combineReducer(state, action);
		}
	}
};

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
