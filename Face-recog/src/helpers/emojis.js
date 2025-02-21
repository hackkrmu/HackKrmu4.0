// Sets emojis according to the expression 

const emojiMap = {
  angry: "angry",
  disgusted: "grin-tongue-squint",
  fearful: "grimace",
  happy: "grin",
  neutral: "meh",
  sad: "sad-tear",
  surprised: "surprise",
  male: "male",
  female: "female",
};

export const mapExpressionToEmoji = expression => emojiMap[expression];
