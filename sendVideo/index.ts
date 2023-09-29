import "dotenv/config";
import { Telegraf } from "telegraf";
const bot = new Telegraf(process.env.BOT_TOKEN!);
const idChat = process.env.CHAT_ID!;
import { search } from "./sc";
import { Video } from "./utils";

export const sendVideos = async function (nVideos: number, subredditName?: string) { // Cambia el nombre del parámetro a subredditName
  console.log(`Send ${nVideos} videos from r/${subredditName || "all"}`); // Muestra el nombre del subreddit en el mensaje

  let videosSent = 0;

  // Llama a la función search con el nombre del subreddit si se especifica
  await search(subredditName).then(async (videos: Video[]) => { // Pasa el nombre del subreddit como argumento a la función search
    console.log(`${videos.length} videos found`);

    // Itera a través de los videos y los envía al chat de Telegram
    for (let i = 0; i < videos.length; i++) {
      if (videosSent == nVideos) return;
      const video = videos[i];

      try {
        bot.telegram.sendVideo(idChat, video.playUrl);
        videosSent += 1;
        console.log(`videosSent ${videosSent}`);
        
        // Espera 800 milisegundos antes de enviar el próximo video
        await new Promise((resolve) => setTimeout(resolve, 800));
      } catch (error) {
        console.log(error);
      }
    }
  });
}

