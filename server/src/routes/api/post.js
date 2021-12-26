import Router from 'express-promise-router';
import httpErrors from 'http-errors';

import { Comment, Post } from '../../models';

const router = Router();

router.get('/posts', async (req, res) => {
  const { limit, page } = req.query;

  const perPage = parseInt(limit) || 10;
  const pageNum = parseInt(page) || 1;

  const { count, rows } = await Post.findAndCountAll({
    limit: perPage,
    offset: (pageNum - 1) * perPage,
  });

  const posts = {
    items: rows,
    currentPage: pageNum,
    previousPage: pageNum - 1 === 0 ? null : pageNum - 1,
    nextPage: (pageNum + 1) * perPage < count ? pageNum + 1 : null,
  };

  return res.status(200).type('application/json').send(posts);
});

router.get('/posts/:postId', async (req, res) => {
  const post = await Post.findByPk(req.params.postId);

  if (post === null) {
    throw new httpErrors.NotFound();
  }

  return res.status(200).type('application/json').send(post);
});

router.get('/posts/:postId/comments', async (req, res) => {
  const { limit, page } = req.query;

  const perPage = parseInt(limit) || 10;
  const pageNum = parseInt(page) || 1;

  const { rows, count } = await Comment.findAndCountAll({
    limit: perPage,
    offset: (pageNum - 1) * perPage,
    order: [['id', 'DESC']],
    where: {
      postId: req.params.postId,
    },
  });

  const response = {
    items: rows,
    currentPage: pageNum,
    previousPage: pageNum - 1 === 0 ? null : pageNum - 1,
    nextPage: (pageNum + 1) * perPage < count ? pageNum + 1 : null,
  };

  return res.status(200).type('application/json').send(response);
});

router.post('/posts', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }

  const post = await Post.create(
    {
      ...req.body,
      userId: req.session.userId,
    },
    {
      include: [
        {
          association: 'images',
          through: { attributes: [] },
        },
        { association: 'movie' },
        { association: 'sound' },
      ],
    },
  );

  return res.status(200).type('application/json').send(post);
});

export { router as postRouter };
