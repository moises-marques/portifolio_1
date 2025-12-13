// // particles.js - canvas particles leves com interação de mouse
// (function () {
//   const canvas = document.getElementById('particles-canvas');
//   if (!canvas) return;
//   const ctx = canvas.getContext('2d');

//   let width = 0, height = 0, DPR = window.devicePixelRatio || 1;
//   let particles = [];
//   let mouse = { x: null, y: null, radius: 100 };

//   // Configuração — ajuste aqui se quiser mais/menos partículas
//   const CONFIG = {
//     baseCount: 60,         // número base de partículas em desktop
//     maxRadius: 3.2,
//     minRadius: 0.9,
//     speed: 0.35,           // velocidade base
//     color: 'rgba(255,215,0,0.9)', // cor amarela (ajuste se quiser)
//     connectDistance: 110,  // linhas entre partículas próximas (0 = desativa)
//     repulse: true          // partículas afastam do mouse
//   };

//   // Ajusta número de partículas conforme largura (performance)
//   function calcCount() {
//     const w = Math.max(width, 320);
//     if (w < 560) return Math.round(CONFIG.baseCount * 0.45);
//     if (w < 900) return Math.round(CONFIG.baseCount * 0.7);
//     return CONFIG.baseCount;
//   }

//   function resize() {
//     DPR = window.devicePixelRatio || 1;
//     width = canvas.clientWidth || canvas.offsetWidth || window.innerWidth;
//     height = canvas.clientHeight || canvas.offsetHeight || window.innerHeight;
//     canvas.width = Math.floor(width * DPR);
//     canvas.height = Math.floor(height * DPR);
//     ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

//     // recria partículas com nova densidade
//     initParticles();
//   }

//   function rand(min, max) {
//     return Math.random() * (max - min) + min;
//   }

//   function initParticles() {
//     particles = [];
//     const count = calcCount();
//     for (let i = 0; i < count; i++) {
//       particles.push({
//         x: Math.random() * width,
//         y: Math.random() * height,
//         vx: rand(-CONFIG.speed, CONFIG.speed),
//         vy: rand(-CONFIG.speed, CONFIG.speed),
//         r: rand(CONFIG.minRadius, CONFIG.maxRadius),
//         alpha: rand(0.35, 0.95)
//       });
//     }
//   }

//   function updateParticles() {
//     for (let p of particles) {
//       // movimento
//       p.x += p.vx;
//       p.y += p.vy;

//       // pequena oscilação
//       p.vx += rand(-0.02, 0.02);
//       p.vy += rand(-0.02, 0.02);

//       // limites: reaparece do outro lado
//       if (p.x > width + 10) p.x = -10;
//       if (p.x < -10) p.x = width + 10;
//       if (p.y > height + 10) p.y = -10;
//       if (p.y < -10) p.y = height + 10;

//       // interação com o mouse (repulsão)
//       if (mouse.x !== null && CONFIG.repulse) {
//         const dx = p.x - mouse.x;
//         const dy = p.y - mouse.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         if (dist < mouse.radius) {
//           const force = (mouse.radius - dist) / mouse.radius;
//           p.vx += (dx / dist) * 0.6 * force;
//           p.vy += (dy / dist) * 0.6 * force;
//         }
//       }

//       // leve fricção pra manter controle de velocidade
//       p.vx *= 0.995;
//       p.vy *= 0.995;
//     }
//   }

//   function draw() {
//     ctx.clearRect(0, 0, width, height);

//     // partículas
//     for (let p of particles) {
//       ctx.beginPath();
//       ctx.fillStyle = `rgba(255,215,0,${p.alpha})`; // amarelo dourado
//       ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//       ctx.fill();
//     }

//     // linhas de conexão opcionais
//     if (CONFIG.connectDistance > 0) {
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const a = particles[i];
//           const b = particles[j];
//           const dx = a.x - b.x;
//           const dy = a.y - b.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (dist < CONFIG.connectDistance) {
//             const alpha = 0.15 * (1 - dist / CONFIG.connectDistance);
//             ctx.beginPath();
//             ctx.strokeStyle = `rgba(255,215,0,${alpha})`;
//             ctx.lineWidth = 1 * (1 - dist / CONFIG.connectDistance);
//             ctx.moveTo(a.x, a.y);
//             ctx.lineTo(b.x, b.y);
//             ctx.stroke();
//           }
//         }
//       }
//     }
//   }

//   function loop() {
//     updateParticles();
//     draw();
//     requestAnimationFrame(loop);
//   }

//   // eventos do mouse (somente para desktop)
//   function onMouseMove(e) {
//     const rect = canvas.getBoundingClientRect();
//     mouse.x = (e.clientX - rect.left);
//     mouse.y = (e.clientY - rect.top);
//   }
//   function onMouseLeave() {
//     mouse.x = null;
//     mouse.y = null;
//   }

//   // desabilitar interação em touch (melhor pra perf)
//   function onTouchMove(e) {
//     if (!e.touches || e.touches.length === 0) return;
//     const rect = canvas.getBoundingClientRect();
//     mouse.x = (e.touches[0].clientX - rect.left);
//     mouse.y = (e.touches[0].clientY - rect.top);
//   }

//   // inicialização
//   function start() {
//     resize();
//     loop();

//     // eventos
//     window.addEventListener('resize', () => {
//       // debounce simples
//       clearTimeout(window.__pResizeTimer);
//       window.__pResizeTimer = setTimeout(resize, 120);
//     });

//     // somente ativar mouse em telas maiores para economizar recursos
//     if (window.innerWidth > 560) {
//       window.addEventListener('mousemove', onMouseMove);
//       window.addEventListener('mouseleave', onMouseLeave);
//     } else {
//       // em mobile, dá uma interação por toque leve (opcional)
//       window.addEventListener('touchmove', onTouchMove, { passive: true });
//       window.addEventListener('touchend', onMouseLeave, { passive: true });
//     }
//   }

//   // início
//   start();
// })();
