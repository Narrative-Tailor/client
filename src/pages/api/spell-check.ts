import {NextApiRequest, NextApiResponse} from "next";
import {spellCheck} from "@/utils/spell";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {sentence} = req.body as {sentence: string};
  const result = await spellCheck(sentence);
  res.status(200).json(result);
}
