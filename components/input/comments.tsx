import { FC, useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { ApiComment, ApiSenderComment } from '../../types/apiTypes';
import NotificationContext from '../../store/notification-context';

interface CommentProps {
  eventId: string;
}

const Comments: FC<CommentProps> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<ApiComment[]>([]);

  const notificationContext = useContext(NotificationContext);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/comments/${eventId}`);
      const data = await response.json();
      setComments(data.comments);
    };

    if (showComments) {
      fetchComments();
    }
  }, [showComments, eventId]);

  const addCommentHandler = async (commentData: ApiSenderComment) => {
    try {
      notificationContext.showNotification({
        title: 'Sending comment...',
        message: 'Your comment is currently being stored in data base',
        status: 'pending',
      });
      const response = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newComment: { message: string; comment: ApiComment } =
        await response.json();
      console.log('newComment ', newComment);
      if (response.ok) {
        setComments((comments) => [...comments, newComment.comment]);
      } else {
        throw new Error('Something went wrong');
      }
      notificationContext.showNotification({
        title: 'Success!',
        message: 'Successfully added comment',
        status: 'success',
      });
    } catch (e) {
      notificationContext.showNotification({
        title: 'Error',
        message: 'Someting went wrong',
        status: 'error',
      });
    }
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
