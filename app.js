//index.html 

let guessingGameBtn = document.getElementById('redirect-btn1');
guessingGameBtn.addEventListener('click',function (params) {
    window.location.href = 'numberGuesser.html';
})

const redirectBtn1 = document.querySelector('#redirect-btn1');

redirectBtn1.addEventListener('mouseenter', function (params) {
    document.getElementById('redirect-btn1').style.color = 'red';
})
redirectBtn1.addEventListener('mouseout', function (params) {
    document.getElementById('redirect-btn1').style.color = 'black';
})















