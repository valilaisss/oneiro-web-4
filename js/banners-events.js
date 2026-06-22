window.addEventListener("load", () => {
    if (window.innerWidth <= 360) {
        const mobScroll = document.getElementById('mob-scroll');
        if (mobScroll) {
            setTimeout(() => {
                const centerBanner = mobScroll.querySelector('.center-banner');
                if (centerBanner) {
                    const scrollPos = centerBanner.offsetLeft - (window.innerWidth / 2) + (centerBanner.offsetWidth / 2);
                    mobScroll.scrollLeft = scrollPos;
                }
            }, 100);
        }
        return;
    }

    const screen4 = document.querySelector('.screen-4');
    const marquee = document.querySelector('.marquee-container');
    const domButton = document.getElementById('html-button');
    const domTopText = document.getElementById('html-top-text');

    if (!screen4) return;

    const currentPath = window.location.pathname;
    let textures = {
        center: '../assets/images/banner-main-center.png',
        left: '../assets/images/banner-main-left.png',
        right: '../assets/images/banner-main-right.png'
    };
 
    if (currentPath.includes('event-1.html')) {
        textures = {
            center: '../assets/images/banner-main-center-g.png',
            left: '../assets/images/banner-main-left-g.png',
            right: '../assets/images/banner-main-right-g.png'
        };
    } else if (currentPath.includes('event-2.html')) {
        textures = {
            center: '../assets/images/banner-2-center.png',
            left: '../assets/images/banner-2-left.png',
            right: '../assets/images/banner-2-right.png'
        };
    } else if (currentPath.includes('event-3.html')) {
        textures = {
            center: '../assets/images/banner-3-center.png',
            left: '../assets/images/banner-3-left.png',
            right: '../assets/images/banner-3-right.png'
        };
    } else if (currentPath.includes('event-4.html')) {
        textures = {
            center: '../assets/images/banner-4-center.png',
            left: '../assets/images/banner-4-left.png',
            right: '../assets/images/banner-4-right.png'
        };
    }

    const vw = (px) => (px / 1920) * window.innerWidth;
    const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Events = Matter.Events,
        Bodies = Matter.Bodies;

    const engine = Engine.create(), world = engine.world;
    engine.gravity.y = 1.4;

    const overlapY = 400;

    let baseWidth = screen4.clientWidth;
    let baseHeight = screen4.clientHeight;

    const render = Render.create({
        element: screen4, 
        engine: engine,
        options: {
            width: baseWidth,
            height: baseHeight + overlapY,
            wireframes: false,
            background: 'transparent',
            pixelRatio: window.devicePixelRatio
        }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    let topTextW = domTopText ? domTopText.offsetWidth : vw(324);
    let topTextH = domTopText ? domTopText.offsetHeight : vw(64);
    let btnW = domButton ? domButton.offsetWidth : vw(180);
    let btnH = domButton ? domButton.offsetHeight : vw(42);

    let anchorY = vw(20); 
    if (marquee) {
        anchorY = marquee.offsetTop + marquee.offsetHeight;
    }

    const centerX = baseWidth / 2;
    const isTablet = window.innerWidth <= 768; 

    let baseBannerW = 387, baseBannerH = 540, baseScale = 0.23;
    let baseSideW = 338, baseSideH = 475, baseSideScale = 0.23;
    let baseSideOffset = 500;

    let baseRope1 = 70, baseRope2 = 70, baseRope3 = 90, baseSideRope = 250;
 
    if (isTablet) {
        baseBannerW = 500; baseBannerH = 700; baseScale = 0.29;
        baseSideW = 420; baseSideH = 600; baseSideScale = 0.285;
        baseSideOffset = 550;
        baseRope1 = 120; baseRope2 = 480; baseRope3 = 480; baseSideRope = 725;
    }

    const bannerW = vw(baseBannerW); 
    const bannerH = vw(baseBannerH);
    const rope1Len = vw(baseRope1); 
    const rope2Len = vw(baseRope2); 
    const rope3Len = vw(baseRope3);
    const imgScale = baseScale * (window.innerWidth / 1920);
    const topTextY = anchorY + rope1Len + (topTextH / 2);  
    const bannerY = topTextY + (topTextH / 2) + rope2Len + (bannerH / 2); 
    const buttonY = bannerY + (bannerH / 2) + rope3Len + (btnH / 2);  
    const sideBannerW = vw(baseSideW);
    const sideBannerH = vw(baseSideH);
    const sideRopeLen = vw(baseSideRope);
    const sideOffset = vw(baseSideOffset);  
    const sideImgScale = baseSideScale * (window.innerWidth / 1920);
    const leftX = centerX - sideOffset;
    const rightX = centerX + sideOffset;
    const sideBannerY = anchorY + sideRopeLen + (sideBannerH / 2);
    const ropeLineWidth = Math.max(vw(5), 2);
    const topAnchor = { x: centerX, y: anchorY + overlapY };

    const topTextBody = Bodies.rectangle(centerX, topTextY + overlapY, topTextW, topTextH, {
        frictionAir: 0.04, render: { visible: false } 
    });

    const rope1 = Constraint.create({
        pointA: topAnchor, bodyB: topTextBody, pointB: { x: 0, y: -topTextH / 2 }, 
        stiffness: 1, length: rope1Len,
        render: { strokeStyle: '#FFFFFF', lineWidth: ropeLineWidth, anchors: false }
    });

    const bannerBody = Bodies.rectangle(centerX, bannerY + overlapY, bannerW, bannerH, {
        frictionAir: 0.02,
        render: { sprite: { texture: textures.center, xScale: imgScale, yScale: imgScale } }
    });

    const rope2 = Constraint.create({
        bodyA: topTextBody, pointA: { x: 0, y: topTextH / 2 }, bodyB: bannerBody, pointB: { x: 0, y: -bannerH / 2 }, 
        stiffness: 1, length: rope2Len,
        render: { strokeStyle: '#FFFFFF', lineWidth: ropeLineWidth, anchors: false }
    });

    const buttonBody = Bodies.rectangle(centerX, buttonY + overlapY, btnW, btnH, {
        frictionAir: 0.05, render: { visible: false }
    });

    const rope3 = Constraint.create({
        bodyA: bannerBody, pointA: { x: 0, y: bannerH / 2 }, bodyB: buttonBody, pointB: { x: 0, y: -btnH / 2 },     
        stiffness: 1, length: rope3Len,
        render: { strokeStyle: '#FFFFFF', lineWidth: ropeLineWidth, anchors: false }
    });

    const leftAnchor = { x: leftX, y: anchorY + overlapY };
    
    const leftBannerBody = Bodies.rectangle(leftX, sideBannerY + overlapY, sideBannerW, sideBannerH, {
        frictionAir: 0.02,
        render: { sprite: { texture: textures.left, xScale: sideImgScale, yScale: sideImgScale } }
    });

    const leftRope = Constraint.create({
        pointA: leftAnchor, bodyB: leftBannerBody, pointB: { x: 0, y: -sideBannerH / 2 },
        stiffness: 1, length: sideRopeLen,
        render: { strokeStyle: '#FFFFFF', lineWidth: ropeLineWidth, anchors: false }
    });

    const rightAnchor = { x: rightX, y: anchorY + overlapY };
    
    const rightBannerBody = Bodies.rectangle(rightX, sideBannerY + overlapY, sideBannerW, sideBannerH, {
        frictionAir: 0.02,
        render: { sprite: { texture: textures.right, xScale: sideImgScale, yScale: sideImgScale } }
    });

    const rightRope = Constraint.create({
        pointA: rightAnchor, bodyB: rightBannerBody, pointB: { x: 0, y: -sideBannerH / 2 },
        stiffness: 1, length: sideRopeLen,
        render: { strokeStyle: '#FFFFFF', lineWidth: ropeLineWidth, anchors: false }
    });

    Composite.add(world, [
        topTextBody, rope1, bannerBody, rope2, buttonBody, rope3,
        leftBannerBody, leftRope, rightBannerBody, rightRope
    ]);

    const mouse = Mouse.create(screen4);
    Mouse.setOffset(mouse, { x: 0, y: overlapY });

    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.15, render: { visible: false } }
    });

    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    Events.on(engine, 'afterUpdate', function() {
        const posBtn = buttonBody.position;
        const angleBtn = buttonBody.angle;
        if (domButton) {
            domButton.style.transform = `translate(${posBtn.x - btnW / 2}px, ${posBtn.y - btnH / 2 - overlapY}px) rotate(${angleBtn}rad)`;
        }

        const posText = topTextBody.position;
        const angleText = topTextBody.angle;
        if (domTopText) {
            domTopText.style.transform = `translate(${posText.x - topTextW / 2}px, ${posText.y - topTextH / 2 - overlapY}px) rotate(${angleText}rad)`;
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 360 && baseWidth > 360) location.reload();
        if (window.innerWidth > 360 && baseWidth <= 360) location.reload();
        if (window.innerWidth <= 768 && baseWidth > 768) location.reload(); 
        if (window.innerWidth > 768 && baseWidth <= 768) location.reload();

        baseWidth = screen4.clientWidth;
        baseHeight = screen4.clientHeight;
        render.canvas.width = baseWidth;
        render.canvas.height = baseHeight + overlapY;

        if (domTopText) {
            topTextW = domTopText.offsetWidth;
            topTextH = domTopText.offsetHeight;
        }
        if (domButton) {
            btnW = domButton.offsetWidth;
            btnH = domButton.offsetHeight;
        }

        if (marquee) {
            const newAnchorY = marquee.offsetTop + marquee.offsetHeight;
            const currentIsTablet = window.innerWidth <= 768; 
            const newSideOffset = currentIsTablet ? vw(450) : vw(500);

            rope1.pointA.y = newAnchorY + overlapY;
            rope1.pointA.x = baseWidth / 2;

            leftRope.pointA.y = newAnchorY + overlapY;
            leftRope.pointA.x = (baseWidth / 2) - newSideOffset;

            rightRope.pointA.y = newAnchorY + overlapY;
            rightRope.pointA.x = (baseWidth / 2) + newSideOffset;
        }
    });
});