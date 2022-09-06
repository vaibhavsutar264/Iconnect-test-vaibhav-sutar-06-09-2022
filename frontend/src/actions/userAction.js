import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from "../constants/userConstants";
import axios from "axios";


//login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        //this config file is required for post request

        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        )
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
        //payload is linked with usercontroller res

    } catch (error) {

        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });

    }
}


//register
export const register = (userData) => async (dispatch) => {
    // here user data is myform from ucomponent/user/loginsignup
    try {
        dispatch({ type: REGISTER_USER_REQUEST });


        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1/register`, userData, config);

        //here user data is just a callback function to send an object of data 

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
        //payload is linked with usercontroller res




    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        })

    }


}


//load user this is made because once u reload a page after login and previos token for login is showig in application cookies of developer tools at that time state of redux has no user user aerray is blank so we need to pass this array so for that we need to load the user data again if there is token present
//by this if u go on login page it will automatically redirect u to account page as u were got logged in because of user data present in state of redux

//in simple words if there is token present in cookies then it will automatically load user again if the user state is empty

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        //this config file is required for post request

        const { data } = await axios.get(
            `/api/v1/me`,
        )
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
        //payload is linked with usercontroller res

    } catch (error) {

        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });

    }
}

//logout

export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
}

//now for making errors as null clearing errors
export const clearErrors = () => async (dispatch) => {

    dispatch({ type: CLEAR_ERRORS });


}

