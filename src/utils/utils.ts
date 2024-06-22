import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

const generateOptions = (
  meaning: {
    Text: string;
  }[],
  idx: number
): string[] => {
  const correctOption: string = meaning[idx].Text;

  const listOfAllIncorrectOptions = meaning.filter(
    (option) => option.Text !== correctOption
  );

  const incorrectOptions: string[] = _.sampleSize(
    listOfAllIncorrectOptions,
    3
  ).map((option) => option.Text);

  const options = _.shuffle([...incorrectOptions, correctOption]);
  return options;
};

export const generateTranslation = async (
  language: string
): Promise<WordType[]> => {
  try {
    const generatedWords = generate(8) as string[];
    const words = generatedWords.map((word: string) => ({
      Text: word,
    }));

    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": language,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "x-rapidapi-key":
            "0cf6a40bf2mshfe096c8a25c6bf8p1d895ajsn715fccecdad8",
          "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );

    const recievedData: TranslatedDataType[] = response.data;

    const result: WordType[] = recievedData.map((word, idx) => {
      const options: string[] = generateOptions(words, idx);
      return {
        word: word.translations[0].text,
        meaning: words[idx].Text,
        options,
      };
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong fetching the API");
  }
};

export const getMatchedAnswersCount = (
  answers: string[],
  result: string[]
): number => {
  let count = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === result[i]) count++;
  }
  return count;
};

export const fetchAudio = async (
  text: string,
  language: LangType
): Promise<string> => {
  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true",
  });

  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "de") encodedParams.set("hl", "de-de");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else encodedParams.set("hl", "fr-fr");

  const { data }: { data: string } = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: { key: "fa727c6d35cf449587fd6ac2135bad85" },
      headers: {
        "x-rapidapi-key": "0cf6a40bf2mshfe096c8a25c6bf8p1d895ajsn715fccecdad8",
        "x-rapidapi-host": "voicerss-text-to-speech.p.rapidapi.com",
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );

  return data;
};
