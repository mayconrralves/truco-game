import verso from "../assets/cards/verso.jpg";

const cardsImages = {
  copas: importAll(
    require.context("../assets/cards/copas/", false, /\.(png|jpe?g|svg)$/)
  ),
  ouros: importAll(
    require.context("../assets/cards/ouros/", false, /\.(png|jpe?g|svg)$/)
  ),
  paus: importAll(
    require.context("../assets/cards/paus/", false, /\.(png|jpe?g|svg)$/)
  ),
  espadas: importAll(
    require.context("../assets/cards/espadas/", false, /\.(png|jpe?g|svg)$/)
  ),
  verso,
};
/*Cards Rank 
  ('zap', 15),
  ('sete de copas', 14),
  ('espadilha', 13),
  ('dunga',12),
  ('sete de ouros',11),
  ('3',10),
  ('2',9),
  ('A',8),
  ('K',7),
  ('J',6),
  ('Q',5),
  ('7',4),
  ('6',3),
  ('5',2),
  ('4',1) 
*/
export const CardsRank = {
  1: [{ rank: 8 }, { naipe: "espadas", rank: 14, name: "espadilha" }],
  2: [{ rank: 9 }, { naipe: "paus", rank: 13, name: "dunga" }],
  3: [{ rank: 10 }],
  4: [{ rank: 1 }, { naipe: "paus", rank: 15, name: "zap" }],
  5: [{ rank: 2 }],
  6: [{ rank: 3 }],
  7: [
    { rank: 4 },
    { naipe: "copas", rank: 12, name: "sete de copas" },
    { naipe: "ouros", rank: 11, name: "sete de ouros" },
  ],
  11: [{ rank: 5, name: "valete" }],
  12: [{ rank: 6, name: "rainha" }],
  13: [{ rank: 7, name: "rei" }],
};
//import all images
export function importAll(r) {
  return r.keys().map(r);
}

//shuffle deck
export function shuffle(array) {
  let m = array.length,
    t,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

export const printCard = (card) => {
  if (card === "verso") {
    return cardsImages.verso;
  }
  const { naipe, number } = card;
  return cardsImages[naipe][number - 1];
};

//build and return shuffled deck
export const buildDeck = () => {
  const returnRank = (number, naipe) => {
    const card = CardsRank[number].filter((card) => card.naipe === naipe);
    if (card.length) return card[0];
    return CardsRank[number][0];
  };
  const aux = ["ouros", "paus", "espadas", "copas"];
  const deckAux = [];
  for (let naipe = 0; naipe < 4; naipe++) {
    for (let number = 1; number <= 13; number++) {
      if (number > 7 && number < 11) continue;
      else {
        const { name, rank } = returnRank(number, aux[naipe]);
        deckAux.push({
          number,
          naipe: aux[naipe],
          rank,
          ...(name && { name }),
        });
      }
    }
  }
  return shuffle(deckAux);
};
