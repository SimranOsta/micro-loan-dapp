import React, { useEffect, useRef } from 'react';

export default function FallingCoins() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const symbols = ['Ξ', '₿', '$', '⟠', '₮'];
    const coins = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      radius: Math.random() * 12 + 10,
      speed: Math.random() * 2 + 1,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      opacity: Math.random() * 0.6 + 0.3,
      rotation: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.03
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      coins.forEach((coin) => {
        coin.y += coin.speed;
        coin.rotation += coin.spinSpeed;

        if (coin.y > height + 40) {
          coin.y = -40;
          coin.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(coin.x, coin.y);
        ctx.rotate(coin.rotation);

        // Draw coin circle background with a yellow/gold theme (234, 179, 8)
        ctx.beginPath();
        ctx.arc(0, 0, coin.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234, 179, 8, ${coin.opacity * 0.3})`;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `rgba(234, 179, 8, ${coin.opacity})`;
        ctx.stroke();

        // Draw symbol inside coin
        ctx.font = `bold ${coin.radius * 1.1}px sans-serif`;
        ctx.fillStyle = `rgba(255, 247, 200, ${coin.opacity + 0.2})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(coin.symbol, 0, 0);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="falling-coins-canvas" />;
}