import { FC, FormEventHandler, useRef, useState } from 'react';
import { ApiSenderComment } from '../../types/apiTypes';
import classes from './new-comment.module.css';

interface NewCommentProps {
  onAddComment: (commentInfo: ApiSenderComment) => void;
}

const NewComment: FC<NewCommentProps> = ({ onAddComment }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [name, setName] = useState<string>('');

  const sendCommentHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (
      !email ||
      email.trim() === '' ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !comment ||
      comment.trim() === ''
    ) {
      setIsInvalid(true);
      return;
    }

    onAddComment({
      email,
      name,
      text: comment,
    });
  };

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea
          id="comment"
          rows={5}
          value={comment}
          onChange={(event) => setComment(event.currentTarget.value)}
        ></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button style={{ backgroundColor: 'white' }}>Submit</button>
    </form>
  );
};

export default NewComment;
