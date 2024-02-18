const adjectives = [
  "Cool",
  "Awesome",
  "Rad",
  "Epic",
  "Funky",
  "Groovy",
  "Eythical",
  "Eelestial",
  "Enchanted",
  "Forgotten",
  "Hidden",
  "shimmering",
  "whispering",
  "Cosmic",
  "Undiscovered",
  "Mysterious",
];
const nouns = ["Room", "Space", "Lounge", "Hub", "Den", "Hangout"];

export function generateCoolRoomName(): string {
  // Generate a random index for both adjectives and nouns
  const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
  const randomNounIndex = Math.floor(Math.random() * nouns.length);

  // Combine the randomly selected adjective and noun
  const roomName = `${adjectives[randomAdjectiveIndex]} ${nouns[randomNounIndex]}`;

  return roomName;
}
