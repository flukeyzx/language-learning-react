import {
  Button,
  Typography,
  Stack,
  List,
  ListItem,
  Container,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearState } from "../redux/slice";
import { getMatchedAnswersCount } from "../utils/utils";

const Result = () => {
  const { words, result } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const correctOption = getMatchedAnswersCount(
    words.map((word) => word.meaning),
    result
  );
  const percentage = (correctOption / words.length) * 100;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetHandler = (): void => {
    navigate("/");
    dispatch(clearState());
  };
  return (
    <Container maxWidth={"sm"}>
      <Typography variant="h3" color={"primary"} m={"2rem 0"}>
        Result
      </Typography>
      <Typography variant="h6" m={"1rem"}>
        You got {correctOption} right out of {words?.length}
      </Typography>
      <Stack direction={"row"} justifyContent={"space-evenly"}>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            You Answers
          </Typography>
          <List>
            {result.map((option, idx) => (
              <ListItem key={idx}>
                {idx + 1} - {option}
              </ListItem>
            ))}
          </List>
        </Stack>

        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            Correct Answers
          </Typography>
          <List>
            {words?.map((word, idx) => (
              <ListItem key={idx}>
                {idx + 1} - {word.meaning}
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>

      <Typography
        m={"1rem"}
        variant="h5"
        color={percentage > 50 ? "green" : "red"}
      >
        {percentage > 50 ? "Pass" : "Fail"}
      </Typography>

      <Button
        onClick={resetHandler}
        sx={{ margin: "1rem" }}
        variant="contained"
      >
        Reset
      </Button>
    </Container>
  );
};

export default Result;
