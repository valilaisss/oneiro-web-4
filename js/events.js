document.addEventListener('DOMContentLoaded', () => {
    const folders = document.querySelectorAll('.event-cont');
    const container = document.querySelector('.events-screen-1');
    const folderLinks = {
        'event-cont-1': 'events/event-1.html',
        'event-cont-2': 'events/event-2.html',
        'event-cont-3': 'events/event-3.html',
        'event-cont-4': 'events/event-4.html'
    };

    folders.forEach(folder => {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;
        
        folder.style.cursor = 'grab';
        
        const img = folder.querySelector('img');
        if(img) img.addEventListener('dragstart', (e) => e.preventDefault());

        const startDrag = (e) => {
            isDragging = true;
            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            startX = clientX;
            startY = clientY;
            initialLeft = folder.offsetLeft;
            initialTop = folder.offsetTop;
            folder.style.cursor = 'grabbing';
            folder.style.zIndex = '100';
        };

        const doDrag = (e) => {
            if (!isDragging) return;
            if (e.type.includes('touch')) e.preventDefault(); 
            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            const dx = clientX - startX;
            const dy = clientY - startY;

            let newLeft = initialLeft + dx;
            let newTop = initialTop + dy;
            const maxLeft = container.offsetWidth - folder.offsetWidth;
            const maxTop = container.offsetHeight - folder.offsetHeight;

            newLeft = Math.max(0, Math.min(newLeft, maxLeft));
            newTop = Math.max(0, Math.min(newTop, maxTop));
            folder.style.left = `${newLeft}px`;
            folder.style.top = `${newTop}px`;
        };

        const stopDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            folder.style.cursor = 'grab';
            folder.style.zIndex = '10';
        };

        folder.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);

        folder.addEventListener('touchstart', startDrag, { passive: false });
        document.addEventListener('touchmove', doDrag, { passive: false });
        document.addEventListener('touchend', stopDrag);

        folder.addEventListener('dblclick', () => {
            for (let className in folderLinks) {
                if (folder.classList.contains(className)) {
                    window.location.href = folderLinks[className];
                    break;
                }
            }
        });
    });
});