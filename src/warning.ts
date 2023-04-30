import i18n from "@/i18n/en.json";

enum Code {
  ErrUnknown = "E001",
  ErrNotFound = "E002",
  ErrNotAvailable = "E003",
  ErrUnauthorized = "E004",
  ErrInvalidToken = "E005",
  ErrInvalidFormat = "E006",
  ErrInvalidHeader = "E007",
  ErrWrongCredentials = "E008",
}

interface Warning {
  title: string;
  text: string;
  level: string;
}

const warnings: { [key: string]: Warning } = {
  [Code.ErrUnknown]: {
    title: i18n.ErrUnknownTitle,
    text: i18n.ErrUnknownText,
    level: "error",
  },
  [Code.ErrNotFound]: {
    title: i18n.ErrForbiddenTitle,
    text: i18n.ErrForbiddenText,
    level: "error",
  },
  [Code.ErrNotAvailable]: {
    title: i18n.ErrNotAvailableTitle,
    text: i18n.ErrNotAvailableText,
    level: "info",
  },
  [Code.ErrUnauthorized]: {
    title: i18n.ErrUnauthorizedTitle,
    text: i18n.ErrUnauthorizedText,
    level: "info",
  },
  [Code.ErrInvalidToken]: {
    title: i18n.ErrForbiddenTitle,
    text: i18n.ErrForbiddenText,
    level: "error",
  },
  [Code.ErrInvalidFormat]: {
    title: i18n.ErrInvalidFormatTitle,
    text: i18n.ErrInvalidFormatText,
    level: "error",
  },
  [Code.ErrInvalidHeader]: {
    title: i18n.ErrForbiddenTitle,
    text: i18n.ErrForbiddenText,
    level: "error",
  },
  [Code.ErrWrongCredentials]: {
    title: i18n.ErrWrongCredentialsTitle,
    text: i18n.ErrWrongCredentialsText,
    level: "error",
  },
};

const getWarning = (code: string): Warning => {
  return warnings[code] ?? warnings[Code.ErrUnknown];
};

export { Code, Warning, getWarning };
