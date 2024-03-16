import { getData } from "@/utils/mock/data";

export default async (req, res) => {
  const { query } = req.query;

  let result = null;
  result = await getData(query);
  if (result.error) {
    return res.status(500).json(result);
  }
  return res.status(200).json(result);
};
