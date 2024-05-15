/** Textual markov chain generator */

function pickAtRandom(l) {
  const ind = Math.trunc(l.length * Math.random());

  return l[ind];
}

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // console.log("chains for ", this.words);
    this.chains = {};
    let lastWord = null;
    const wordList = [...this.words, null]; // add null at end, so get termination for chain
    for (let word of wordList) {
      if (lastWord) {
        if (this.chains[lastWord]) {
          if (!this.chains[lastWord].includes(word)) {
            this.chains[lastWord].push(word);
          }
        } else {
          this.chains[lastWord] = [word];
        }
      }
      lastWord = word;
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    const start = pickAtRandom(Object.keys(this.chains));
    let acc = "";
    let wordsLeft = numWords;
    let cur = start;
    while (wordsLeft > 0 && cur) {
      wordsLeft--;
      acc = acc + cur + " ";
      cur = pickAtRandom(this.chains[cur]);
    }
    return acc.slice(0, -1);
  }
}

// const mym = new MarkovMachine("the cat in the hat");

const mym = new MarkovMachine(`I do not like them,
Sam-I-am.
I do not like
Green eggs and ham.

Would you like them
Here or there?

I would not like them
Here or there.
I would not like them
Anywhere.
I do not like
Green eggs and ham.
I do not like them,
Sam-I-am`);

// const mym = new MarkovMachine("the quick brown fox jumps over the lazy dog");
// const mym2 = new MarkovMachine("i am i said");
// console.log(mym);

module.exports = { pickAtRandom, MarkovMachine };
