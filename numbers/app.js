let num = 3
let url = 'http://numbersapi.com/'

$.getJSON(`${url}/${num}?json`).then(data => {console.log(data)})

let nums = [3, 4, 5]
$.getJSON(`${url}/${nums}?json`).then(data => {console.log(data)})

Promise.all(Array.from({length:4}, () => {
    return $.getJSON(`${url}/${num}?json`)
})).then(fact_list => {fact_list.forEach(data => $('section').append(`<h2>${data.text}</h2>`))})