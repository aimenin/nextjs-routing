import { FC, FormEventHandler, useContext, useState } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

const NewsletterRegistration: FC = () => {
  const [email, setEmail] = useState('');

  const notificationContext = useContext(NotificationContext);

  const registrationHandler: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    notificationContext.showNotification({
      title: 'Signing Up...',
      message: 'Registering newsletter',
      status: 'pending',
    });

    try {
      const data = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({
          email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!data.ok) {
        throw new Error('Something went wrong');
      }

      notificationContext.showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter',
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
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
