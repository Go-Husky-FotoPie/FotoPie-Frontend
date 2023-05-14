import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getMe } from "../../axiosRequest/api/editUser";
import { useCheckToken } from "../../hooks/useCheckToken";
import {
  getImageQuality,
  getToken,
  sendQualityRank,
} from "../../axiosRequest/api/imageQuality";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";

interface ImageQualityButtonProps {
  filenameString: string | string[] | undefined;
}

const currentLoginUserId = async () => {
  try {
    const response = await getMe();
    const { id } = response.data;
    return id;
  } catch (error) {}
};
const ImageQualityButton: FC<ImageQualityButtonProps> = ({
  filenameString,
}) => {
  useCheckToken();

  const { userID, isAuthenticated } = useSelector((state: RootState) => ({
    ...state.auth,
    ...state.quickView,
  }));

  const [isSending, setIsSending] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCurrentUserId, setIsCurrentUserId] = useState<boolean>(false);
  const [isSendSuccessful, setIsSendSuccessful] = useState(false);
  // const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [qualityScore, setQualityScore] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      const trueUser = await currentLoginUserId();
      const isMatch = trueUser === userID;
      setIsCurrentUserId(isMatch);
    };
    fetchUserId();
    if (isSendSuccessful) {
      setTimeout(() => {
        router.push("/quality-posts");
      }, 2000);
    }
  }, [userID, isSendSuccessful]);

  const handleGetQualityClick = async () => {
    const S3Url =
      "https://fotopie-photo-compression.s3.ap-southeast-2.amazonaws.com";
    const compressed_url = `${S3Url}/${filenameString}`;
    setIsConfirmationOpen(true);

    try {
      const response = await getToken();
      console.log(response.data, "debug");
      //setIsLoading(true);
    } catch (error) {
      console.log(error);
    }

    const API_ENDPOINT = "http://localhost:9090";

    async function getQuality(url: string, data: Record<string, any>) {
      const response = await axios.get(
        `${API_ENDPOINT}/api/everypixel/quality`,
        {
          params: { url },
          data,
        }
      );
      return response.data;
      console.log(response.data, "debug1");
    }

    try {
      //const result = await getQuality(compressed_url, { size: "medium" });
      const result = await getImageQuality(compressed_url);
      // setQualityScore(result.quality.score);
      // console.log(result.quality.score);
      const qualityScore = (result.data.quality.score * 100).toFixed(2);
      setQualityScore(qualityScore);
      console.log(qualityScore);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmationCancel = () => {
    setIsConfirmationOpen(false);
  };

  const handleConfirmationConfirm = async () => {
    setIsSending(true);
    setIsConfirmationOpen(false);
    try {
      const response = await sendQualityRank(filenameString, qualityScore);

      setIsConfirmationOpen(true);
      setIsSendSuccessful(true);
    } catch (error) {
      setIsSending(false);
    }
  };

  return (
    <>
      {isAuthenticated && isCurrentUserId ? (
        <div style={{ textAlign: "center" }}>
          <Typography
            style={{
              fontWeight: "bold",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              color: "#8a2be2",
            }}
            fontSize={{
              xs: "0.5rem",
              sm: "0.75rem",
              md: "1.2rem",
            }}
          >
            Use AI to generate a score based on photo quality:
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGetQualityClick}
            disabled={isSending}
            sx={{
              bgcolor: "primary.main",
              textTransform: "none",
              fontSize: "1.2rem",
            }}
          >
            <Typography
              textTransform="none"
              fontWeight={700}
              fontSize={{
                xs: "0.5rem",
                sm: "0.75rem",
                md: "1rem",
              }}
              color="white"
            >
              {isSending ? "Sending..." : "Get image quality"}
            </Typography>
          </Button>

          <Dialog open={isConfirmationOpen} onClose={handleConfirmationCancel}>
            <DialogTitle>Calculate Quality Score</DialogTitle>

            {/* dialog content body */}
            <DialogContent>
              {isSendSuccessful ? (
                <DialogContentText>
                  Sending successful! Redirecting...
                </DialogContentText>
              ) : (
                // "Your photo score is: `${qualityScore}`.Are you sure you want to rank this post?"
                <DialogContentText>
                  {isLoading ? (
                    <LinearProgress />
                  ) : (
                    <DialogContentText>
                      Your photo score is: "<b>{qualityScore}</b>".
                      <br></br>
                      Are you sure you want to rank this post?
                    </DialogContentText>
                  )}
                </DialogContentText>
              )}
            </DialogContent>

            {/* first dialog button */}
            {isSendSuccessful ? null : (
              <DialogActions>
                <Button onClick={handleConfirmationCancel} color="primary">
                  Cancel
                </Button>
                {/* click this button will call send rank api and will popup second dialog*/}
                <Button
                  onClick={handleConfirmationConfirm}
                  color="primary"
                  autoFocus
                >
                  Send
                </Button>
              </DialogActions>
            )}
          </Dialog>
        </div>
      ) : null}
    </>
  );
};

export default ImageQualityButton;
