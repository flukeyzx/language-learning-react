import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Typography, Stack } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAudio, generateTranslation } from "../utils/utils.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getWordsFailed,
  getWordsRequest,
  getWordsSuccess,
} from "../redux/slice.ts";
import Loader from "../components/Loader.tsx";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const [audioSource, setAudioSource] = useState<string>("");
  const audioRef = useRef(null);

  const params = useSearchParams()[0].get("language") as LangType;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, words } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const audioHandler = async () => {
    const player: HTMLAudioElement = audioRef.current!;
    if (player) {
      player.play();
    } else {
      const data = await fetchAudio(words[count]?.word, params);
      setAudioSource(data);
    }
  };

  useEffect(() => {
    dispatch(getWordsRequest());
    generateTranslation(params)
      .then((result) => dispatch(getWordsSuccess(result)))
      .catch((err) => dispatch(getWordsFailed(err)));

    if (error) {
      dispatch(clearState());
    }
  }, []);

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
    setAudioSource("");
  };

  if (loading) return <Loader />;
  return (
    <Container
      maxWidth={"sm"}
      sx={{
        padding: "1rem",
      }}
    >
      {audioSource && <audio src={audioSource} autoPlay ref={audioRef}></audio>}
      <Button
        onClick={
          count === 0 ? () => navigate("/") : () => setCount((prev) => prev - 1)
        }
      >
        <ArrowBack />
      </Button>

      <Typography m={"2rem 0"}>Learning made easy</Typography>

      <Stack direction={"row"} spacing={"1rem"}>
        <Typography variant="h4">
          {count + 1} - {words[count]?.word}
        </Typography>
        <Typography color={"blue"} variant={"h4"}>
          : {words[count]?.meaning}
        </Typography>
        <Button
          sx={{
            borderRadius: "50%",
          }}
          onClick={audioHandler}
        >
          <VolumeUp />
        </Button>
      </Stack>
      <Button
        sx={{
          margin: "3rem 0",
        }}
        variant="contained"
        fullWidth
        onClick={count === 7 ? () => navigate("/quiz") : nextHandler}
      >
        {count === 7 ? "Test" : "Next"}
      </Button>
    </Container>
  );
};

export default Learning;
