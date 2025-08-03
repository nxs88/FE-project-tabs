import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h1>Упс! Такой страницы не существует</h1>
            <p>Давайте перейдём к началу.</p>
          </div>
          <Link className={styles.linkBtn} to="/FE-project-tabs/">
            <Button>На главную</Button>
          </Link>
        </div>
        <div
          className="tenor-gif-embed"
          data-postid="12536795"
          data-share-method="host"
          data-aspect-ratio="1.90476"
          data-width="100%"
        >
          <a href="https://tenor.com/view/sad-cat-lonely-upset-crying-gif-12536795">
            печальный кот плачет грустный GIF
          </a>
          from <a href="https://tenor.com/search/sad-gifs">Sad GIFs</a>
        </div>{' '}
        <script
          type="text/javascript"
          async
          src="https://tenor.com/embed.js"
        ></script>
      </div>
    </>
  );
}
