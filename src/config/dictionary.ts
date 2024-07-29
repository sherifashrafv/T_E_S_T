import "server-only";
import { Locale } from "./i18n.config";

const dictionaries = {
	en: () => import("@/dictionaries/en.json").then((module) => module.default),
	ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
	return locale === "ar" ? dictionaries.ar() : dictionaries.en();
};
