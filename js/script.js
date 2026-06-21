document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.album-page');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (pages.length > 0 && prevBtn && nextBtn) {
      let topIndex = pages.length - 1;

      const updateButtons = () => {
          prevBtn.disabled = (topIndex === pages.length - 1);
          nextBtn.disabled = (topIndex === 0); 
      };

      nextBtn.addEventListener('click', () => {
          if (topIndex > 0) {
              pages[topIndex].classList.add('removed');
              topIndex--; 
              updateButtons();
          }
      });

      prevBtn.addEventListener('click', () => {
          if (topIndex < pages.length - 1) {
              topIndex++; 
              pages[topIndex].classList.remove('removed');
              updateButtons();
          }
      });
      
      updateButtons();
  }


  const screen3 = document.getElementById('zinScreen3');
  if (!screen3) return;

  const totalPages = 65;
  const floatingPages = [];

  for (let i = 0; i < totalPages; i++) {
      const img = document.createElement('img');
      
      const spreadIndex = i % 20;
      img.src = `assets/images/spread-${spreadIndex}.png`;
      img.classList.add('floating-page');

      const randomWidth = 5 + Math.random() * 7;
      img.style.width = `${randomWidth}vw`;

      const pageObj = {
          el: img,
          x: (Math.random() - 0.5) * window.innerWidth * 1.5, 
          y: (Math.random() - 0.5) * window.innerHeight * 1.5,
          z: Math.random() * 2000 - 1500,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          vz: (Math.random() - 0.5) * 0.8 
      };
      floatingPages.push(pageObj);
      screen3.appendChild(img);
  }

  function animate3DPages() {
      floatingPages.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;

          if (p.x > window.innerWidth) p.x = -window.innerWidth;
          if (p.x < -window.innerWidth) p.x = window.innerWidth;
          if (p.y > window.innerHeight) p.y = -window.innerHeight;
          if (p.y < -window.innerHeight) p.y = window.innerHeight;
          if (p.z > 800) p.z = -2000;
          if (p.z < -2000) p.z = 800;

          p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, ${p.z}px)`;
      });

      requestAnimationFrame(animate3DPages);
  }

  animate3DPages();
});