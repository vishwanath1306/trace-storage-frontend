import { getDetailsResponse } from "@/utils/mock/data";

export default async (req, res) => {
    const { session_id } = req.query;

    let result = null;
    result = await getDetailsResponse(session_id);
    if (result.error) {
        return res.status(500).json(result);
    }
    return res.status(200).json(result.data);
};
