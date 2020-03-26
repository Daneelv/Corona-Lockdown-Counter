/*jslint browser: true*/
/*global window */
(function () {

    var start = new Date("March 26, 2020 23:59:59").getTime();

    function pad(num) {
        return ("0" + parseInt(num)).substr(-2);
    }

    function tick() {
        audio = document.getElementById("beepAudio");
        audio.pause();
        audio.currentTime = 0;
        var now = new Date().getTime();
        var distance = start - now;
        var timeElement = document.getElementById('time');

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timeElement.innerHTML =
            days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";
        timer = setTimeout(tick, 1000);

        if (parseInt(days + hours + minutes + seconds) <= 0) {
            timeElement.innerHTML = "0d 0h 0m 0s";
            timeElement.classList.add("animationBlink");
            document.querySelector(".its-time").style.display = "block";
            timer && clearTimeout(timer);
            audio.play();
            audio.muted = false;
        }
    }



    //Drums
    function removeTransition(e) {
        if (e.propertyName !== 'transform') return;
        e.target.classList.remove('playing');
    }

    function playSound(e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
        if (!audio) return;

        key.classList.add('playing');
        audio.currentTime = 0;
        audio.play();
    }

    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    window.addEventListener('keydown', playSound);




    // Init
    document.getElementById("beepAudio").src = "sound/siren.mp3";
    document.getElementById("beepAudio").load();
    document.addEventListener('DOMContentLoaded', tick);
}());