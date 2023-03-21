import { Card } from './App';

const emojiesAsString =
  '🍘🍖🍗🥩🍠🥟🥠🥡🍱🍤🍣🦪🍜🍛🍚🍥🍧🍨🍩🍪🎂🍰🥛🧃☕🍵🧉🍶🍾🍷🥤🧊🥃🥂🍻🍺🍹🍸🥢🍽🥝🥥🍇🍈🍉🍊🍋🍌🍍🥭🍎🌽🍆🍅🍓🍒🍑🍐🍏🌶🍄🥑🥒🥬🥦🥔🧄🌹🏵🌸💐🥜🌰🥕🧅🌺🌻🌼';

export function generateBoard(size: number) {
  if (size % 2 !== 0 || size * size > emojiesAsString.length) {
    throw new Error('Incorrect board size');
  }
  const cards: Card[][] = [];
  const randomEmojies = Array.from(emojiesAsString)
    .map((x) => ({ x, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map((a) => a.x)
    .slice(0, (size * size) / 2);
  for (let i = 0; i < size; i++) {
    cards.push([]);
    for (let j = 0; j < size; j++) {
      const item: Card = { revealed: false, emoji: '' };
      cards[i].push(item);
    }
  }

  randomEmojies.forEach((emoji) => {
    let row = Math.floor(Math.random() * size);
    let col = Math.floor(Math.random() * size);
    while (cards[row][col].emoji !== '') {
      row = Math.floor(Math.random() * size);
      col = Math.floor(Math.random() * size);
    }
    cards[row][col].emoji = emoji;

    let row2 = Math.floor(Math.random() * size);
    let col2 = Math.floor(Math.random() * size);
    while (cards[row2][col2].emoji !== '') {
      row2 = Math.floor(Math.random() * size);
      col2 = Math.floor(Math.random() * size);
    }
    cards[row2][col2].emoji = emoji;
  });
  return cards;
}
