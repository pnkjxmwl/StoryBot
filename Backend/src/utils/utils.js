import Replicate from 'replicate';
import dotenv from "dotenv";
dotenv.config();
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export function separateIntoParts(content) {
  const paragraphs = content.split('\n');
  const title = paragraphs[0].trim();
  const restOfTheStory = paragraphs.slice(1).join('\n').trim();

  const totalParagraphs = restOfTheStory.split('\n').length;
  const paragraphsPerPart = Math.ceil(totalParagraphs / 3);

  const parts = [];
  let currentPart = '';

  restOfTheStory.split('\n').forEach((paragraph, index) => {
    if (index > 0 && index % paragraphsPerPart === 0) {
      parts.push(currentPart.trim());
      currentPart = '';
    }
    currentPart += '\n' + paragraph;
  });

  if (currentPart.trim()) {
    parts.push(currentPart.trim());
  }

  return [title, ...parts];
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