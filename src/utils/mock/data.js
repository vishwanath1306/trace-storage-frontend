import { sampleAllResponse, sampleSubmitResponse, sampleDeleteResponse, sampleDetailsResponse } from "@utils/mock/mockData";
export const getData = async (query) => {
    let mockData = null;
    try {
        mockData = sampleAllResponse;

        return { data: mockData };
    } catch (err) {
        return { error: err.message };
    }
};

export const getSubmitResponse = async (query) => {
    let mockData = null;
    try {
        mockData = sampleSubmitResponse;
        return { data: mockData };
    } catch (err) {
        return { error: err.message };
    }
};

export const getDeleteResponse = async (query) => {
    let mockData = null;
    try {
        mockData = sampleDeleteResponse;
        return { data: mockData };
    } catch (err) {
        return { error: err.message };
    }
};

export const getDetailsResponse = async (session_id) => {
    let mockData = null;
    try {
        mockData = sampleDetailsResponse;
        return { data: mockData };
    } catch (err) {
        return { error: err.message };
    }
};
