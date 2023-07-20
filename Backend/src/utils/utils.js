import Replicate from 'replicate';
import dotenv from "dotenv";
dotenv.config();
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
export function separateIntoParts(content) {
    const parts = content.split('&').map(part => part.trim());
    return parts;
  }
  export async function generateImages(partsArray) {
    var count=0;
    const imagePromises = partsArray.map(async (part) => {
        console.log("creating",count+1);
        count++;
      const response = await replicate.run(
        "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        {
          input: {
            prompt: part
          }
        }
      );
      return response[0];
    });
  
    const images = await Promise.all(imagePromises);
    return images;
  }