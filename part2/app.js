$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';
  
    // 1.
    async function getCard(){
    let data = await $.getJSON(`${baseURL}/new/draw/`)
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }
    getCard();
  
    // 2.
    async function getCards(){
    let firstCard = null;
    let data = await $.getJSON(`${baseURL}/new/draw/`)
    firstCard = data.cards[0];
    let deckId = data.deck_id;
    data = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    let secondCard = data.cards[0];
    [firstCard, secondCard].forEach(function(card) {
      console.log(
        `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
      );
    });
    }
    getCards();
  
    // 3.
    async function hitMe(){
    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');
  
    let data = await $.getJSON(`${baseURL}/new/shuffle/`);
    deckId = data.deck_id;
    $btn.show();
    
  
    $btn.on('click', async function() {
      let data = await $.getJSON(`${baseURL}/${deckId}/draw/`);
      let cardSrc = data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
        
      if (data.remaining === 0) $btn.remove();
      
    });
    }
    hitMe();
  });
  