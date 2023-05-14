import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import InputAdornment from "@mui/material/InputAdornment";
import * as yup from "yup";

import "react-dropzone-uploader/dist/styles.css";

import { uploadPhoto, uploadPost } from "../../axiosRequest/api/posts";
import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Image,
  SimpleGrid,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneProps,
  IMAGE_MIME_TYPE,
  FileWithPath,
} from "@mantine/dropzone";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
//import Image from "mui-image";
import { useState, useEffect } from "react";
import Copyright from "../../components/Copyright";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { TagsInput } from "react-tag-input-component";
import UploadPage from "../../components/Upload/UploadPage";
import Typography from "@mui/material/Typography";
import { getRandomPhoto } from "../../axiosRequest/api/unsplashAPI";

interface IFormInput {
  description: string;
  tag: string[];
  //price: number;
}

// Define a component that renders the form
export default function Upload(
  props: Partial<DropzoneProps> & { randomphoto: string }
) {
  const theme = useMantineTheme();
  const [tagValue, setTagValue] = useState<string[]>([]);
  // const [priceValue, setPriceValue] = useState("");
  const [desValue, setDesValue] = useState("");
  const [filename, setUploadfileName] = useState({});
  const [OrginalFilePath, setOrginalFilePath] = useState({});
  const [CompressFilePath, setCompressFilePath] = useState({});
  const [files, setFiles] = useState<FileWithPath[]>([]);
  //define a success state for submission alert
  const [success, setSuccess] = useState(false);
  //define a state for tag-input
  const [selected, setSelected] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [checked, setChecked] = useState(false);

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

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [success]);

  const formSchema = yup.object().shape({
    description: yup.string().max(50),
    //tag: yup.string().max(15),
    selected: yup.string().max(50),
    price: yup.number(),
  });
  const router = useRouter();
  const methods = useForm<IFormInput>({
    resolver: yupResolver(formSchema),
  });
  // Define a submit handler for the form
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      const response = await uploadPost({
        //...data,
        description: desValue,
        //tag: tagValue,
        tag: selected,
        filename: filename,
        orginalFilePath: OrginalFilePath,
        compressFilePath: CompressFilePath,
      });

      if (response.status === 201) {
        setSuccess(true);
        setContent(""); // Clear the content
        // Reset other state variables
        setTagValue([]);
        setDesValue("");
        setSelected([]);
        setFiles([]);
        setChecked(false);
        // Reset the form
        methods.reset();
        // Redirect
        router.replace("/upload");
      }
    } catch (error) {}
  };

  const DesInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        {desValue ? null : "Enter Description"}
      </InputAdornment>
    ),
    onChange: (e: any) => setDesValue(e.target.value),
  };

  return (
    <UploadPage randomphoto={props.randomphoto}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 10,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={methods.handleSubmit(onSubmit)}
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Dropzone
                    onDrop={async (files) => {
                      console.log("accepted files", files);
                      setFiles(files);

                      const formData = new FormData();
                      formData.append("file", files[0]);
                      try {
                        const response = await uploadPhoto(formData);

                        setUploadfileName(response.data.filename);
                        setOrginalFilePath(response.data.original_path);
                        setCompressFilePath(response.data.compression_path);
                        return { meta: response };
                      } catch (error) {
                        console.error(error);
                        return error;
                      }
                    }}
                    onReject={(files) => console.log("rejected files", files)}
                    maxSize={30 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                    multiple={false}
                    radius="xl"
                    sx={(theme) => ({
                      minHeight: rem(250),
                      // minWidth: rem(500),
                      maxWidth: rem(3000),
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // border: 10,
                      // marginLeft: "auto",
                      // marginRight: "auto",
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
                        backgroundColor: "#eae6ff",
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
                            theme.colors.red[
                              theme.colorScheme === "dark" ? 4 : 6
                            ]
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
                          Attach one image file with a standard format
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
              </Box>
              <Box sx={{ textAlign: "left", width: "100%", mb: 2 }}>
                <Typography variant="subtitle2">Description</Typography>
                <TextField
                  name="description"
                  id="Description"
                  autoComplete="Description"
                  size="small"
                  fullWidth
                  value={desValue}
                  onChange={(e: any) => setDesValue(e.target.value)}
                  InputProps={DesInputProps}
                />
              </Box>

              <Box sx={{ width: "100%", mb: 2 }}>
                <Typography variant="subtitle2">Tags</Typography>
                <TagsInput
                  value={selected}
                  onChange={setSelected}
                  name="fruits"
                  placeHolder="Enter Tags"
                />

                <Typography variant="caption" component="em">
                  press "Enter" to add new tag
                </Typography>
              </Box>

              <FormControlLabel
                sx={{
                  mt: 2,
                  "& .MuiTypography-root": {
                    fontSize: "0.9rem",
                  },
                }}
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                    required
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                }
                label="I understand that only uploaded photos that you own the copyright to and that
                                 I have created myself. I understand that any depicted people or owners of depicted property
                                 gave you the permission to publish the photos."
              />

              <Box sx={{ textAlign: "right", width: "100%" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 4, mb: 2 }}
                  fullWidth
                >
                  Send
                </Button>
              </Box>

              <Grid container justifyContent="center">
                <Grid item>
                  {success && (
                    <Alert
                      severity="success"
                      sx={{
                        fontSize: "1.5rem",
                        padding: "2rem",
                        "& .MuiAlertTitle-root": {
                          fontSize: "2rem",
                        },
                      }}
                    >
                      <AlertTitle>Success</AlertTitle>
                      User post submitted successfully —{" "}
                      <strong>check it out!</strong>
                    </Alert>
                  )}
                </Grid>
              </Grid>
            </Box>
          </FormProvider>
        </Box>
      </Container>
      <Copyright />
    </UploadPage>
  );
}

export async function getStaticProps() {
  try {
    const { data } = await getRandomPhoto();
    const randomphoto = data.urls.regular;
    return {
      props: {
        randomphoto,
      },
    };
  } catch (err) {
    return {
      props: {
        randomphoto: "../../background.jpg",
      },
    };
  }
}
