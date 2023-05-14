import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const streamImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { presignedUrl } = req.query;

  try {
    const response = await axios.get(presignedUrl as string, {
      responseType: "stream",
    });

    if (response.status !== 200) {
      res.status(response.status).send(response.statusText);
      return;
    }

    response.data.pipe(res);
  } catch (error) {
    res.status(500).send("Error streaming the image");
  }
};

export default streamImage;
