import {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json([
    {value: "잼민이체", isAvailable: true},
    {value: "사극체", isAvailable: true},
  ]);
}
