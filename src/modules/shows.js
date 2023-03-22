import { getLikes } from './likes.js';
import { BASE_SHOWS_URL } from './constants.js';

const shows = async () => {
  const sanitizedData = [];

  const [data, allLikes] = await Promise.all([
    await fetch(BASE_SHOWS_URL, {
      method: 'GET',
    }),
    await getLikes(),
  ]);
  const shows = await data.json();
  for (let i = 0; i < shows?.length; i += 1) {
    const {
      id, name, summary, image,
    } = shows[i];
    const likes = allLikes.filter((like) => parseInt(like.item_id) === id).reduce((total, like) => total + like.likes, 0);
    sanitizedData.push({
      id: id.toString(),
      name,
      description: summary,
      url: image.original,
      likes,
      comments: [],
    });
  }
  return sanitizedData;
};

export default shows;