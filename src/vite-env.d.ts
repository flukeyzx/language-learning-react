/// <reference types="vite/client" />

type LangType = "ja" | "de" | "es" | "fr";

interface WordType {
  word: string;
  meaning: string;
  options: string[];
}

interface StateType {
  loading: boolean;
  result: string[];
  words: WordType[];
  error?: string;
}

type TranslatedDataType = {
  translations: {
    text: string;
  }[];
};
