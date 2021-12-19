const getImagePath = (id: string) => `/images/${id}.webp`;

const getMoviePath = (id: string) => `/movies/${id}.webm`;

const getGifPath = (id: string) => `/movies/${id}.gif`;

const getMoviePostarPath = (id: string) => `/movies/${id}.webp`;

const getSoundPath = (id: string) => `/sounds/${id}.mp3`;

const getProfileImagePath = (id: string) => `/images/profiles/${id}.webp`;

export { getImagePath, getMoviePath, getGifPath, getMoviePostarPath, getSoundPath, getProfileImagePath };
