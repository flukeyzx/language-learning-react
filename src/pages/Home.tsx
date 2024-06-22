import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const languages = [
    { name: "Japanese", code: "ja" },
    { name: "German", code: "de" },
    { name: "Spanish", code: "es" },
    { name: "French", code: "fr" },
  ];

  const navigate = useNavigate();

  const languageClickHandler = (language: string): void => {
    navigate(`/learn?language=${language}`);
  };
  return (
    <Container maxWidth={"sm"}>
      <Typography variant="h4" p={"2rem"} textAlign={"center"}>
        Welcome, Begin your journey of learning
      </Typography>

      <Stack
        direction={"row"}
        spacing={"2rem"}
        p={"2rem"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {languages.map((language) => (
          <Button
            key={language.code}
            variant="contained"
            onClick={() => languageClickHandler(language.code)}
          >
            {language.name}
          </Button>
        ))}
      </Stack>
      <Typography textAlign={"center"} variant="h6">
        Choose one language from above
      </Typography>
    </Container>
  );
};

export default Home;
