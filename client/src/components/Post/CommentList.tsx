import { Comment } from '../../types';
import { CommentItem } from './CommentItem';

type Props = {
  comments: Comment[];
};

export const CommentList = ({ comments }: Props) => {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
