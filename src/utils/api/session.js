
import { API_ROOT_URL } from '@config/api';

export const create = async (data) => {
    const response = await fetch(`${API_ROOT_URL}/session/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const responseData = await response.json();
    return responseData.data;
    // return response.json();

}

export const getAll = async (query) => {
    const response = await fetch(`${API_ROOT_URL}/session/all` + "?" + new URLSearchParams(query));
    const responseData = await response.json();
    return responseData;
}

export const deleteOne = async (sessionId) => {
    const response = await fetch(`${API_ROOT_URL}/session/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session_id: sessionId })
    });
    const responseData = await response.json();
    return responseData;
}

export const getDetails = async (sessionId) => {
    const response = await fetch(`${API_ROOT_URL}/session/details` + "?" + new URLSearchParams({ session_id: sessionId }));
    const responseData = await response.json();
    return responseData;
}