$(function(){
    let url = 'https://deckofcardsapi.com/api/deck'
    $.getJSON(`${url}/new/draw/`).then(data => {
        let { suit, num } = data.cards[0]
        console.log(`${num} of ${suit}`)
    })

    let card1 = null
    $.getJSON(`${url}/new/draw/`).then(data => {
        card1 = data.cards[0]
        let id = data.deck_id
        return $.getJSON(`${url}/${id}/draw/`)
    }).then(data => {
        let card2 = data.cards[0]
        [card1, card2].forEach(function(card){
            console.log(`${card.value} of ${card.suit}`)
        })
    })

    let $button = $('button')
    let $cardsSection = $('section')

    let id = null
    $.getJSON(`${url}/new/shuffle/`).then(data => {
        id = data.deck_id;
        $button.show();
    })

    $button.on('click', function(){
        $.getJSON(`${url}/${id}/draw/`).then(data => {
            let cardImg = data.cards[0].image;
            let angle = Math.random() * 90 - 45
            let x = Math.random() * 40 - 20
            let y = Math.random() * 40 - 20
            $cardsSection.append($('<img>', 
                { src: cardImg, 
                css : {transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`}}))
            if (data.remaining === 0){
                $button.remove()
            }
        })
    })
})

