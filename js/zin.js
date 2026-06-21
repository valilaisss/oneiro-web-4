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

    const totalPages = 70; 
    const floatingPages = [];

    let isMouseMoving = false;
    let mouseTimeout;

    window.addEventListener('mousemove', () => {
        isMouseMoving = true;
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 150);
    });

    let boxWidth = screen3.offsetWidth;
    let boxHeight = screen3.offsetHeight;

    window.addEventListener('resize', () => {
        boxWidth = screen3.offsetWidth;
        boxHeight = screen3.offsetHeight;
    });
    const isMobileSmall = window.innerWidth <= 360;
    const sizeMultiplier = isMobileSmall ? 2.5 : 1;
    for (let i = 0; i < totalPages; i++) {
        const img = document.createElement('img');
        
        const spreadIndex = i % 20;
        img.src = `assets/images/spread-${spreadIndex}.png`;
        img.classList.add('floating-page');

        const baseWidthVw = 3 + Math.random() * 4;
        const randomWidthVw = baseWidthVw * sizeMultiplier;
        
        img.style.width = `${randomWidthVw}vw`;

        const pageObj = {
            el: img,
            vw: randomWidthVw, 
            x: (Math.random() - 0.5) * boxWidth, 
            y: (Math.random() - 0.5) * boxHeight,
            z: Math.random() * 2000 - 1500,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            vz: (Math.random() - 0.5) * 1.0 
        };

        floatingPages.push(pageObj);
        screen3.appendChild(img);
    }

    function animate3DPages() {
        const halfWidth = boxWidth / 2;
        const halfHeight = boxHeight / 2;
        const vwInPx = window.innerWidth / 100;
        const perspective = 1200; 

        floatingPages.forEach(p => {
            
            if (isMouseMoving) {
                const shakeX = (Math.random() - 0.5) * 20; 
                const shakeY = (Math.random() - 0.5) * 20;
                const shakeRot = (Math.random() - 0.5) * 8; 

                p.el.style.transform = `translate(-50%, -50%) translate3d(${p.x + shakeX}px, ${p.y + shakeY}px, ${p.z}px) rotate(${shakeRot}deg)`;
                
            } else {
                p.x += p.vx;
                p.y += p.vy;
                p.z += p.vz;
                
                const imgWidthPx = p.vw * vwInPx;
                const imgHeightPx = imgWidthPx * 1.4; 
                const halfImgW = imgWidthPx / 2;
                const halfImgH = imgHeightPx / 2;
                let zDist = perspective - p.z;
                if (zDist < 1) zDist = 1; 
                const scale = perspective / zDist;
                const boundTop = (-halfHeight / scale) + halfImgH;
                const boundBottom = (halfHeight / scale) - halfImgH;
                const boundLeft = (-halfWidth / scale) + halfImgW;
                const boundRight = (halfWidth / scale) - halfImgW;

                if (p.y < boundTop) { p.y = boundTop; p.vy *= -1; }
                if (p.y > boundBottom) { p.y = boundBottom; p.vy *= -1; }
                if (p.x < boundLeft) { p.x = boundLeft; p.vx *= -1; }
                if (p.x > boundRight) { p.x = boundRight; p.vx *= -1; }
                if (p.z > 600) { p.z = 600; p.vz *= -1; }
                if (p.z < -1500) { p.z = -1500; p.vz *= -1; }

                p.el.style.transform = `translate(-50%, -50%) translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotate(0deg)`;
            }
        });

        requestAnimationFrame(animate3DPages);
    }

    animate3DPages();
});