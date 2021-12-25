import { Movie, Sound, TImage } from '../../types';

type TermsJSON = {
  rawHTML: string;
};

export const fetchTerms = async () => {
  const json = (await fetch(`/terms.json`).then((r) => r.json())) as TermsJSON;
  return json.rawHTML;
};

const sendFile = async <T>(url: string, file: File): Promise<T> => {
  return (await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: file,
  }).then((res) => res.json())) as T;
};

export const sendImage = async (file: File) => await sendFile<TImage>('/api/v1/images', file);
export const sendMovie = async (file: File) => await sendFile<Movie>('/api/v1/movies', file);
export const sendSound = async (file: File) => await sendFile<Sound>('/api/v1/sounds', file);
