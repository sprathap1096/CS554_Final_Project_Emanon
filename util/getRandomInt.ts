export default function getRandomInt(max: number, min?: number) {
  const rand = Math.floor(Math.random() * max);
  return min ? min + rand : rand;
}
