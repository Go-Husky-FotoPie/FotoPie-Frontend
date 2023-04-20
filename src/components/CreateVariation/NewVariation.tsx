import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Image,
  SimpleGrid,
  MantineTheme,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneProps,
  IMAGE_MIME_TYPE,
  FileWithPath,
} from "@mantine/dropzone";
import { imageVariations } from "../../axiosRequest/api/imageVariations";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
//import Image from "mui-image";
import React, { useState, useEffect, useRef } from "react";
import Copyright from "../Copyright";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "./NewVariation.module.css";
import Button from "@mui/material/Button";
import { CssBaseline } from "@mui/material";

const NewVariation = (props: Partial<DropzoneProps>) => {
  const theme = useMantineTheme();
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  //set the state for dropzone preview
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  //set necessary states for progress bar
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        sx={{ width: "20%" }}
      />
    );
  });

  // 
  const handleDownload = async (imageUrl: string, filename: string) => {
    const proxyUrl = `/api/download-image?presignedUrl=${encodeURIComponent(
      imageUrl
    )}`;

    const res = await fetch(proxyUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };


  //define the component for progress bar
  const progressRef = useRef(() => { });
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 1065);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Box
            component="main"
            //maxWidth="xl"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box
              className={styles.imageSection}
              sx={{
                display: "flex",
                flexDirection: "row",

                alignItems: "center",
                justifyContent: "space-between",
                width: "90%",
                marginBottom: "60px",
                marginTop: "30px",
                // marginLeft: "0",
                // marginRight: "0",
              }}
            >
              <h2 className={styles.bgText}>
                Enter a new realm of visual possibilities, enjoy
                <span className={styles.gradientText}>
                  {" "}
                  a crafted fine touch
                </span>{" "}
                powered by FotoPie+
              </h2>
              <img
                src="/create-variation.jpg"
                alt=""
                className={styles.bgImage}
              />
            </Box>
            <Dropzone
              onDrop={async (files) => {
                console.log("accepted files", files);
                setFiles(files);

                const formData = new FormData();
                formData.append("file", files[0]);
                try {
                  setIsLoading(true);
                  const response = await imageVariations(formData);
                  setImage1(response.data.urls.url_1);
                  setImage2(response.data.urls.url_2);
                } catch (error) {
                  //console.error("Error fetching URLs", error);
                  //return error;
                } finally {
                  setIsLoading(false);
                }
              }}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={4 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              //accept={["image/png", "image/jpeg", "image/sgv+xml", "image/gif"]}
              multiple={false}
              //autoFocus={true}
              radius="xl"
              sx={(theme) => ({
                minHeight: rem(120),
                minWidth: "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: 10,
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],

                "&[data-accept]": {
                  color: theme.white,
                  backgroundColor: theme.colors.blue[6],
                },

                "&[data-reject]": {
                  color: theme.white,
                  backgroundColor: theme.colors.red[6],
                },
                "&[data-idle]": {
                  color: theme.black,
                  //backgroundColor: theme.colors.green[2],
                  backgroundColor: "#EAE6FF",
                },
              })}
              {...props}
            >
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: rem(120), pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    size="3.2rem"
                    stroke={1.5}
                    color={
                      theme.colors[theme.primaryColor][
                        theme.colorScheme === "dark" ? 4 : 6
                      ]
                    }
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    size="3.2rem"
                    stroke={1.5}
                    color={
                      theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
                    }
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size="3.2rem" stroke={1.5} />
                </Dropzone.Idle>
                <div>
                  <Text size="xl" inline>
                    Drag image here or click to select file
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Attach one image file with standard format, size limit 4mb
                  </Text>
                </div>
                <Container maxWidth="xs">
                  <SimpleGrid
                    cols={1}
                    breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                    mt={previews.length > 0 ? "xl" : 0}
                  >
                    {previews}
                  </SimpleGrid>
                </Container>
              </Group>
            </Dropzone>
          </Box>
          <Container component="main" sx={{ maxWidth: "60%" }}>
            <Box
              sx={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "100px",
                  gap: "18px",
                  "& > img": {
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: {
                      xs: "calc(100% - 8px)",
                      sm: "calc(50% - 8px)",
                      md: "calc(25% - 8px)",
                    },
                    maxWidth: "100%",
                    objectFit: "cover",
                  },
                }}
              >
                {isLoading ? (
                  <Container component="main" maxWidth="xs">
                    <LinearProgress
                      variant="buffer"
                      value={progress}
                      valueBuffer={buffer}
                    />
                  </Container>
                ) : (
                  <>
                    <div className={styles.imageContainer}>
                      <Button
                        className={styles.downloadButton}
                        onClick={() => handleDownload(image1, "image1.png")}
                      >
                        Download
                      </Button>
                      <Image src={image1} alt="" />
                    </div>
                    <div className={styles.imageContainer}>
                      <Button
                        className={styles.downloadButton}
                        onClick={() => handleDownload(image2, "image2.png")}
                      >
                        Download
                      </Button>
                      <Image src={image2} alt="" />
                    </div>
                  </>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
        <Copyright />
      </Box>
    </>
  );
}

export default NewVariation;