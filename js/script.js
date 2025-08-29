document.addEventListener('DOMContentLoaded', function(){
  // Carousel arrows (if any)
  document.querySelectorAll('.arrow').forEach(function(btn){
    btn.addEventListener('click', function(){
      const target = document.querySelector('#' + btn.dataset.target + ' .strip') || btn.closest('.carousel').querySelector('.strip');
      if(!target) return;
      const amount = 260;
      if(btn.classList.contains('left')) target.scrollBy({left: -amount, behavior:'smooth'});
      else target.scrollBy({left: amount, behavior:'smooth'});
    });
  });

  // Mobile menu toggle
  var menu = document.querySelector('.nav-links');
  var hb = document.getElementById('menu-btn');
  if(hb){
    hb.addEventListener('click', function(){
      menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
      menu.style.flexDirection = 'column';
      menu.style.gap = '1rem';
      menu.style.background = 'rgba(0,0,0,0.6)';
      menu.style.padding = '1rem';
      menu.style.position = 'absolute';
      menu.style.top = '64px';
      menu.style.right = '1rem';
      menu.style.borderRadius = '8px';
    });
  }

  // Contact form validation + Netlify submission
  var form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();
      var msgEl = document.getElementById('form-msg');

      // Basic validation
      if(name.length < 2){ msgEl.textContent = 'Please enter your name.'; msgEl.style.color = '#FF4C4C'; return; }
      if(!email.match(/^\S+@\S+\.\S+$/)){ msgEl.textContent = 'Please enter a valid email.'; msgEl.style.color = '#FF4C4C'; return; }
      if(message.length < 8){ msgEl.textContent = 'Message should be at least 8 characters.'; msgEl.style.color = '#FF4C4C'; return; }

      // Prepare form data for Netlify
      var formData = new FormData(form);

      fetch("/", {
        method: "POST",
        body: formData
      })
      .then(function(){
        msgEl.textContent = "Message sent successfully!";
        msgEl.style.color = "#00FF7F"; // green success
        form.reset();
      })
      .catch(function(error){
        msgEl.textContent = "Oops! Something went wrong.";
        msgEl.style.color = "#FF4C4C"; // red error
        console.error(error);
      });
    });
  }
});
