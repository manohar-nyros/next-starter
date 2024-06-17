import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const ytVidInputRef = useRef(null);

  const [video, setVideo] = useState(null);

  const submitVideo = (e) => {
    e.preventDefault();
    const yt_video_url = ytVidInputRef.current.value;
    if (yt_video_url) {
      if(yt_video_url.includes("/watch?v=")){
      var sp = new URLSearchParams(yt_video_url.split('?')[1]);
      var vsp = sp.get('v');
      setVideo(vsp);
      } else {
        setVideo(yt_video_url.split('/').at(-1));
      }
    }
  }

  const clearVideo = (e) => {
    if (e.code == "Backspace" || e.target.value == '') {
      ytVidInputRef.current.value = null;
      setVideo(null);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.main}>
          <h1>Youtube Video Player</h1>
          <form className={styles.form} onSubmit={submitVideo}>
            <input ref={ytVidInputRef} className={styles.ytInput} type="text" onKeyUp={clearVideo} placeholder="Enter Youtube video URL" autoFocus={true} />
            <input type="submit" value=">" className={styles.btnSubmit} />
          </form>
        </div>
        <br/>
        {
          video && 
          <iframe width="950" height="450" src={"https://www.youtube.com/embed/" + video} />
        }
      </main>
    </div>
  );
}
