const getImagePath = (id: string) => `/images/${id}.webp`;

const getMoviePath = (id: string, ext: 'webm' | 'webp') => `/movies/${id}.${ext}`;

const getSoundPath = (id: string) => `/sounds/${id}.mp3`;

const getProfileImagePath = (id: string, mini?: boolean) => `/images/profiles/${id}${mini ? '.min' : ''}.webp`;

export { getImagePath, getMoviePath, getSoundPath, getProfileImagePath };
