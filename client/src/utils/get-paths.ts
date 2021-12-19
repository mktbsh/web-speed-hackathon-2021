const getImagePath = (id: string) => `/images/${id}.webp`;

const getMoviePath = (id: string) => `/movies/${id}.gif`;

const getSoundPath = (id: string) => `/sounds/${id}.mp3`;

const getProfileImagePath = (id: string) => `/images/profiles/${id}.webp`;

export { getImagePath, getMoviePath, getSoundPath, getProfileImagePath };
