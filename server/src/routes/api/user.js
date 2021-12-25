import Router from 'express-promise-router';
import httpErrors from 'http-errors';

import { Post, User } from '../../models';

const router = Router();

router.get('/me', async (req, res) => {
  if (req.session.userId === undefined) {
    return res.status(202).type('application/json').send({});
  }

  const user = await User.findByPk(req.session.userId);

  if (user === null) {
    throw new httpErrors.NotFound();
  }

  return res.status(200).type('application/json').send(user);
});

router.put('/me', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  const user = await User.findByPk(req.session.userId);

  if (user === null) {
    throw new httpErrors.NotFound();
  }

  Object.assign(user, req.body);
  await user.save();

  return res.status(200).type('application/json').send(user);
});

router.get('/users/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user === null) {
    throw new httpErrors.NotFound();
  }

  return res.status(200).type('application/json').send(user);
});

router.get('/users/:username/posts', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user === null) {
    throw new httpErrors.NotFound();
  }

  const { limit, page } = req.query;

  const perPage = parseInt(limit) || 10;
  const pageNum = parseInt(page) || 1;

  const { rows, count } = await Post.findAndCountAll({
    limit: perPage,
    offset: (pageNum - 1) * perPage,
    order: [['id', 'DESC']],
    where: {
      userId: user.id,
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

export { router as userRouter };
