import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const saveCurrentTime = throttle(async () => {
  try {
    const currentTime = await player.getCurrentTime();
    localStorage.setItem('videoplayer-current-time', currentTime);
  } catch (error) {
    console.error('Error saving current time:', error);
  }
}, 1000); 

player.on('timeupdate', saveCurrentTime);

const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime) {
  player.setCurrentTime(savedTime).catch(error => {
    console.error('Error setting current time:', error);
  });
}

player.play().catch(error => {
  console.error('Error playing video:', error);
});
