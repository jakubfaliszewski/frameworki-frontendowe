import { Dispatch } from "redux";

export function fullscreenAction() {
    return {
            type: 'SWITCH_FULLSCREEN'
        };
    }

export function switchFullscreen() {
    return (dispatch: Dispatch) => {
        return dispatch(fullscreenAction());
    };
}