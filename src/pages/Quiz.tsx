import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Typography,
  Radio,
  Button,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveResult } from "../redux/slice.ts";

const Quiz = () => {
  const [result, setResult] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { words } = useSelector((state: { root: StateType }) => state.root);

  const nextHandler = (): void => {
    setResult((prev) => [...prev, answer]);
    setCount((prev) => prev + 1);
    setAnswer("");
  };

  useEffect(() => {
    if (count + 1 > words.length) navigate("/result");
    dispatch(saveResult(result));
  }, [result]);
  return (
    <Container
      maxWidth={"sm"}
      sx={{
        padding: "1rem",
      }}
    >
      <Button
        onClick={
          count === 0 ? () => navigate("/") : () => setCount((prev) => prev - 1)
        }
      >
        <ArrowBack />
      </Button>
      <Typography m={"2rem 0"}>Quiz</Typography>

      <Typography variant="h4">
        {count + 1} - {words[count]?.word}
      </Typography>

      <FormControl>
        <FormLabel
          sx={{
            mt: "2rem",
            mb: "1rem",
          }}
        >
          Meaning
        </FormLabel>
        <RadioGroup value={answer} onChange={(e) => setAnswer(e.target.value)}>
          {words[count]?.options.map((option) => (
            <FormControlLabel
              value={option}
              control={<Radio />}
              label={option}
              key={option}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Button
        sx={{
          margin: "3rem 0",
        }}
        variant="contained"
        fullWidth
        onClick={nextHandler}
        disabled={answer === ""}
      >
        {count === 7 ? "Submit" : "Next"}
      </Button>
    </Container>
  );
};

export default Quiz;
