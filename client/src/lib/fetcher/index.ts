type TermsJSON = {
  rawHTML: string;
};

export const fetchTerms = async () => {
  const json = (await fetch(`/terms.json`).then((r) => r.json())) as TermsJSON;
  return json.rawHTML;
};
