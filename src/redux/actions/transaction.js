import { server } from "../store";
import axios from "axios";

export const getAllTransactions = (category="", keyword="") => async dispatch => {
    try {
        dispatch({ type: 'allTransactionsRequest' });
        const { data } = await axios.get(`${server}/transactions?keyword=${keyword}&category=${category}`
        );

        dispatch({ type: "allTransactionsSuccess", payload: data.transactions });
    } catch (error) {
        dispatch({ type: "allTransactionsFail", payload: error.response.data.message });
    }
}

export const getCourseLectures = id => async dispatch => {
    try {
        dispatch({ type: 'getCourseRequest' });
        const { data } = await axios.get(`${server}/course/${id}`, {
            withCredentials: true,
           }
        );

        dispatch({ type: "getCourseSuccess", payload: data.lectures });
    } catch (error) {
        dispatch({ type: "getCourseFail", payload: error.response.data.message });
    }
}
