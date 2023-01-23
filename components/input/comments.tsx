import { FC, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { ApiComment, ApiSenderComment } from '../../types/apiTypes';

interface CommentProps {
  eventId: string;
}

const Comments: FC<CommentProps> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<ApiComment[]>([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/comments/${eventId}`);
      const data = await response.json();
      console.log('data ', data);
      setComments(data.comments);
    };

    if (showComments) {
      fetchComments();
    }
  }, [showComments, eventId]);

  const addCommentHandler = async (commentData: ApiSenderComment) => {
    const response = await fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(await response.json());
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
};

export default Comments;
