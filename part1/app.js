let favoriteNumber = 5;
let baseURL = "http://numbersapi.com";

// 1.
async function getLuckyNum() {
  let data = await $.getJSON(`${baseURL}/${favoriteNumber}?json`);
  console.log(data);
}
getLuckyNum();

// 2.
let favoriteNumbers = [2, 4, 10];
async function getLuckyNums() {
  let data = await $.getJSON(`${baseURL}/${favoriteNumbers}?json`);
  console.log(data);
}
getLuckyNums();

// 3.
async function getFourFacts() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favoriteNumber}?json`)));
  facts.forEach(data => {$("body").append(`<p>${data.text}</p>`);});
}
getFourFacts();