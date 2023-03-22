import React from "react";
import { Button } from "@mui/material";

interface ImageDownloaderProps {
  imageUrl: string;
  fileName: string;
}

const ImageDownloader: React.FC<ImageDownloaderProps> = ({
  imageUrl,
  fileName,
}) => {
  const downloadImage = async () => {
    try {
      // Use the proxy url to fetch photo
      const proxyUrl = `/api/download-image?imageUrl=${encodeURIComponent(
        imageUrl
      )}`;
      const response = await fetch(proxyUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download the image:", error);
    }
  };

  return (
    <Button
      onClick={downloadImage}
      variant="contained"
      sx={{
        opacity: { xs: 0, sm: 1 },
        bgcolor: "secondary.main",
      }}
    >
      Download
    </Button>
  );
};

export default ImageDownloader;
