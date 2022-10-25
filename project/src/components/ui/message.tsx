import { MessageType } from '../../types/message';
import classes from './notification.module.css';

type MessageProps = {
  props: MessageType;
}

function Message({props}: MessageProps):JSX.Element {

  const [{title, message}] = [props];
  const cssClasses = `${classes.notification} ${classes.error}`;

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
}

export default Message;
