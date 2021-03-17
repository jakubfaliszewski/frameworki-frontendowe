
export interface FullscreenState {
    isFullscreen: boolean
}

const initialState: FullscreenState = {
    isFullscreen: false
}

export enum FullscreenActions {
    'SWITCH' = 'SWITCH_FULLSCREEN',
}

export type FullscreenAction = { type: FullscreenActions, payload: FullscreenState };

export const FullscreenReducer = (state: FullscreenState = initialState, action: FullscreenAction) => {
    switch (action.type) {
        case FullscreenActions.SWITCH: {
            const newState = {
                isFullscreen: !state.isFullscreen
            };
            return newState;
        }
        default:
            return state;
    }
}