const envelope =
  document.getElementById(
    'envelope-wrap'
  );

const letterSection =
  document.getElementById(
    'letter-section'
  );

let opened = false;


envelope.addEventListener(
  'click',
  () => {

    if(opened) return;

    opened = true;

    envelope.classList.add(
      'open'
    );

    /*
      Start music when the envelope
      is clicked. This works because
      the browser now has a user click.
    */

    music.play()
      .then(() => {

        musicBtn.textContent = '♫';

        musicBtn.title =
          'Pause music';

      })
      .catch(() => {});


    /*
      Reveal the letter after
      the envelope animation.
    */

    setTimeout(() => {

      letterSection.classList.add(
        'show'
      );

      letterSection.scrollIntoView({
        behavior:'smooth',
        block:'center'
      });

    },1000);

  }
);


/* =========================
   MUSIC
   ========================= */

const music =
  document.getElementById(
    'bg-music'
  );

const musicBtn =
  document.getElementById(
    'music-toggle'
  );


musicBtn.addEventListener(
  'click',
  (event) => {

    /*
      Prevent the music button
      from doing anything else.
    */

    event.stopPropagation();


    if(music.paused){

      music.play()
        .then(() => {

          musicBtn.textContent =
            '♫';

          musicBtn.title =
            'Pause music';

        })
        .catch(() => {

          musicBtn.textContent =
            '♡';

          musicBtn.title =
            'Music could not be played';

        });

    }else{

      music.pause();

      musicBtn.textContent =
        '♪';

      musicBtn.title =
        'Play music';

    }

  }
);


/* =========================
   PHOTO FADE-IN ON SCROLL
   ========================= */

const cards =
  document.querySelectorAll(
    '.photo-card'
  );


const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          entry.target.style.opacity =
            '1';

        }

      });

    },
    {
      threshold:.15
    }
  );


cards.forEach(card => {

  observer.observe(card);

});


/* =========================
   LITTLE CLICK SPARKLES
   ========================= */

document.addEventListener(
  'click',
  (event) => {

    /*
      Don't create sparkles when
      clicking the music button.
    */

    if(
      event.target.closest(
        '#music-toggle'
      )
    ) return;


    const sparkle =
      document.createElement(
        'span'
      );

    sparkle.textContent =
      Math.random() > .5
      ? '♡'
      : '✦';


    sparkle.style.position =
      'fixed';

    sparkle.style.left =
      event.clientX + 'px';

    sparkle.style.top =
      event.clientY + 'px';

    sparkle.style.pointerEvents =
      'none';

    sparkle.style.zIndex =
      '999';

    sparkle.style.fontSize =
      '20px';

    sparkle.style.color =
      '#a76d62';

    sparkle.style.transition =
      'all 1s ease';

    document.body.appendChild(
      sparkle
    );


    requestAnimationFrame(() => {

      sparkle.style.transform =
        `
        translate(
          ${Math.random()*60-30}px,
          -70px
        )
        rotate(30deg)
        scale(1.4)
        `;

      sparkle.style.opacity =
        '0';

    });


    setTimeout(() => {

      sparkle.remove();

    },1000);

  }
);