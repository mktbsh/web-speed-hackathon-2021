import comments from '../seeds/comments.json';
import images from '../seeds/images.json';
import movies from '../seeds/movies.json';
import posts from '../seeds/posts.json';
import postsImagesRelation from '../seeds/postsImagesRelation.json';
import profileImages from '../seeds/profileImages.json';
import sounds from '../seeds/sounds.json';
import users from '../seeds/users.json';

import { Comment, Image, Movie, Post, PostsImagesRelation, ProfileImage, Sound, User } from './models';

import { performance } from "perf_hooks";

function measure(name, size, start, end) {
  console.log(`${size} ${name} inserted in ${(end - start)} milliseconds`);
}

async function insertSeeds() {
  await ProfileImage.bulkCreate(profileImages, { logging: false });
  await Image.bulkCreate(images, { logging: false });
  await Movie.bulkCreate(movies, { logging: false });
  await Sound.bulkCreate(sounds, { logging: false });
  await User.bulkCreate(users.map(([id, username, name, description, password, profileImageId, createdAt]) => ({
    id, username, name, description, password, profileImageId, createdAt
  })), { logging: false });
  await Post.bulkCreate(posts, { logging: false });
  await PostsImagesRelation.bulkCreate(postsImagesRelation.map(([postId, imageId]) => ({ postId, imageId })), { logging: false });
  await Comment.bulkCreate(comments.map(([id, userId, postId, text, createdAt]) => ({
    id, userId, postId, text, createdAt
  })), { logging: false });
}

export { insertSeeds };
