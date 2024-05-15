const { pickAtRandom, MarkovMachine } = require("./markov");

test("pick element from list", function () {
  let l = ["a", "b", "c"];
  for (let i = 0; i < 25; i++) {
    const res = pickAtRandom(l);
    expect(l.includes(res)).toBe(true);
  }
  l = ["a"];
  for (let i = 0; i < 25; i++) {
    const res = pickAtRandom(l);
    expect(l.includes(res)).toBe(true);
  }
  l = ["a", "b", "c", "d", "e", "f", "g"];
  for (let i = 0; i < 25; i++) {
    const res = pickAtRandom(l);
    expect(l.includes(res)).toBe(true);
  }
});

test("make markov chain", function () {
  const mym = new MarkovMachine("a b a c a b");
  expect(mym.chains["a"]).toEqual(["b", "c"]);
  expect(mym.chains["c"]).toEqual(["a"]);
  expect(mym.chains["b"]).toEqual(["a", null]);
  // console.log(mym);
});

test("make text from markov chain", function () {
  const mym = new MarkovMachine("a b a c a b");
  const t = mym.makeText(100);
  expect(t[t.length - 1]).toBe("b");
  const mym2 = new MarkovMachine("I am sam I am");
  const t2 = mym2.makeText(100);
  const split = t2.split(" ");
  expect(split[split.length - 1]).toEqual("am");
});
