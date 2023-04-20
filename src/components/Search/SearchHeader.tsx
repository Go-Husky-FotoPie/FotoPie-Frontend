import { Typography } from "@mui/material";

interface SearchHeaderProps {
  tagString: string | string[] | undefined;
}

export default function SearchHeader({ tagString }: SearchHeaderProps) {
  return (
    <Typography
      variant="h3"
      sx={{
        ml: 2,
        mt: 5,
        fontWeight: 500,
        fontSize: { xs: "2.0rem", sm: "4rem" }
      }}
    >
      Search: '{tagString} image'
    </Typography>
  );
}
