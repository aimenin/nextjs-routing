import { FC } from 'react';
import Button from '../ui/button';
import classes from './results-title.module.css';

interface ResultsTitleProps {
  date: Date;
}

const ResultsTitle: FC<ResultsTitleProps> = ({ date }) => {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button href="/events" link>
        Show all events
      </Button>
    </section>
  );
};

export default ResultsTitle;
