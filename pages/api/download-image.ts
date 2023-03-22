import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { imageUrl } = req.query;

  if (!imageUrl) {
    res.status(400).json({ error: "Image URL is required" });
    return;
  }

  try {
    const response = await axios.get(imageUrl as string, {
      responseType: "arraybuffer",
    });
    res.setHeader("Content-Type", response.headers["content-type"]);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=image.${
        response.headers["content-type"].split("/")[1]
      }`
    );
    res.send(response.data);
  } catch (error) {
    console.error("Failed to fetch the image:", error);
    res.status(500).json({ error: "Failed to fetch the image" });
  }
}
