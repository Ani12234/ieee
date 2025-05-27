import React, { useRef, useEffect } from 'react';

const UnderConstruction = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesArray = useRef([]);

  // Particle class
  class Particle {
    constructor(canvasWidth, canvasHeight) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.radius = Math.random() * 4 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 30 + 5; // Particle sensitivity
      this.velocityX = Math.random() * 1 - 0.5; // Drift velocity
      this.velocityY = Math.random() * 1 - 0.5;
    }

    update(canvasWidth, canvasHeight, mouseX, mouseY) {
      // Always moving: Drift motion
      this.x += this.velocityX;
      this.y += this.velocityY;

      // Wrap around edges
      if (this.x > canvasWidth) this.x = 0;
      if (this.x < 0) this.x = canvasWidth;
      if (this.y > canvasHeight) this.y = 0;
      if (this.y < 0) this.y = canvasHeight;

      // Mouse interaction (repel effect)
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 120;

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const directionX = dx / distance;
        const directionY = dy / distance;

        this.x -= directionX * force * this.density;
        this.y -= directionY * force * this.density;
      }
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(135, 206, 250, 0.8)';
      ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particlesArray.current = [];
      for (let i = 0; i < 250; i++) {
        particlesArray.current.push(new Particle(canvas.width, canvas.height));
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (event) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesArray.current.forEach((particle) => {
        particle.update(canvas.width, canvas.height, mouseRef.current.x, mouseRef.current.y);
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />

      <div
      className='bg-[#1a1a1a] w-[95%] sm:w-fit absolute top-1/2 left-1/2 text-center z-10 sm:px-10 px-2 py-5 rounded-lg'
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Almost There...</h1>
        <p style={{ fontSize: '1.3rem', color: '#bbbbbb' }}>
          Our team is working hard to bring you something amazing. Hang tight and check back soon for the big reveal!
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
