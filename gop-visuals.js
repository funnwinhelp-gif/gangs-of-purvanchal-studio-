window.GOP_VISUALS = (() => {
  function drawCharacterFigure(ctx, x, y, angle, charName, isEnemy = false, step = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const swing = Math.sin(step * 0.25) * 4;
    const coatColor = isEnemy
      ? '#b91c1c'
      : charName === 'Vesper'
      ? '#ec4899'
      : charName === 'Seraphina'
      ? '#a855f7'
      : charName === 'Malkov'
      ? '#334155'
      : charName === 'Nova'
      ? '#06b6d4'
      : '#2563eb';

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.42)';
    ctx.beginPath();
    ctx.ellipse(0, 3, 14, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Boots / Feet stride
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(swing, -6, 3.5, 0, Math.PI * 2);
    ctx.arc(-swing, 6, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Shoulders & Torso
    ctx.fillStyle = coatColor;
    ctx.beginPath();
    ctx.roundRect(-7, -10, 14, 20, 6);
    ctx.fill();
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Arms & Aimed Weapon
    ctx.strokeStyle = '#f1c27d';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(11, -4);
    ctx.moveTo(0, 8);
    ctx.lineTo(13, 3);
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(10, 1, 10, 3);

    // Head & Hair
    ctx.fillStyle = '#f1c27d';
    ctx.beginPath();
    ctx.arc(1, 0, 6.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = isEnemy ? '#111827' : charName === 'Seraphina' ? '#f59e0b' : '#1e293b';
    ctx.beginPath();
    ctx.arc(-1, 0, 6.2, Math.PI * 0.55, Math.PI * 1.45);
    ctx.fill();

    ctx.restore();
  }

  function drawDetailedVehicle(ctx, x, y, angle, vehName, color, tick = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Ground shadow
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.beginPath();
    ctx.roundRect(-22, -11, 46, 26, 7);
    ctx.fill();

    const type = (vehName || '').toLowerCase();

    if (type.includes('bike')) {
      // Wheels
      ctx.fillStyle = '#090d16';
      ctx.fillRect(-18, -3, 9, 6);
      ctx.fillRect(10, -3, 9, 6);
      // Frame & Rider
      ctx.fillStyle = color || '#ef4444';
      ctx.beginPath();
      ctx.roundRect(-12, -5, 25, 10, 4);
      ctx.fill();
      ctx.fillStyle = '#f1c27d';
      ctx.beginPath();
      ctx.arc(-1, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    if (type.includes('chopper') || type.includes('helicopter')) {
      ctx.fillStyle = color || '#eab308';
      ctx.beginPath();
      ctx.ellipse(2, 0, 18, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-26, -2.5, 16, 5);
      // Rotor blades
      ctx.strokeStyle = 'rgba(248,250,252,0.75)';
      ctx.lineWidth = 2.5;
      const r = (tick % 18) * 0.35;
      ctx.beginPath();
      ctx.moveTo(2 + Math.cos(r) * 24, Math.sin(r) * 24);
      ctx.lineTo(2 - Math.cos(r) * 24, -Math.sin(r) * 24);
      ctx.stroke();
      ctx.restore();
      return;
    }

    if (type.includes('jet') || type.includes('flight')) {
      ctx.fillStyle = color || '#22c55e';
      ctx.beginPath();
      ctx.moveTo(24, 0);
      ctx.lineTo(-18, -11);
      ctx.lineTo(-14, 0);
      ctx.lineTo(-18, 11);
      ctx.closePath();
      ctx.fill();
      // Wings
      ctx.beginPath();
      ctx.moveTo(4, 0);
      ctx.lineTo(-10, -24);
      ctx.lineTo(-16, -24);
      ctx.lineTo(-8, 0);
      ctx.lineTo(-16, 24);
      ctx.lineTo(-10, 24);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      return;
    }

    // 4-Wheeler / SUV / Interceptor / Train body
    const len = type.includes('express') || type.includes('train') ? 48 : 40;
    const wid = type.includes('fortuner') || type.includes('scorpio') || type.includes('thar') ? 23 : 21;

    // Tyres
    ctx.fillStyle = '#090d16';
    const wOffX = len * 0.28;
    const wOffY = wid * 0.5 + 1.5;
    [[-wOffX, -wOffY], [wOffX, -wOffY], [-wOffX, wOffY], [wOffX, wOffY]].forEach(([wx, wy]) => {
      ctx.fillRect(wx - 5, wy - 2.5, 10, 5);
    });

    // Main car body
    ctx.fillStyle = color || '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(-len / 2, -wid / 2, len, wid, 6);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.28)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Windshield & Cabin Glass
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(-len * 0.16, -wid * 0.36, len * 0.44, wid * 0.72, 3);
    ctx.fill();

    // Roof highlight
    ctx.fillStyle = 'rgba(255,255,255,0.14)';
    ctx.fillRect(-len * 0.1, -wid * 0.24, len * 0.24, wid * 0.48);

    // Police light bar if Interceptor
    if (type.includes('interceptor') || type.includes('police')) {
      ctx.fillStyle = tick % 16 < 8 ? '#38bdf8' : '#ef4444';
      ctx.fillRect(-2, -wid * 0.34, 5, wid * 0.68);
    }

    // Headlights
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(len / 2 - 2, -wid * 0.36, 3, 4);
    ctx.fillRect(len / 2 - 2, wid * 0.36 - 4, 3, 4);

    ctx.restore();
  }

  function patchCanvasRender() {
    if (window._gopVisualsPatched) return;
    const canvas = document.getElementById('gameCanvas');
    if (!canvas || !window.ctx || !window.player || !window.enemies || !window.state) return;
    window._gopVisualsPatched = true;

    let frameTick = 0;
    let lastX = window.player.x, lastY = window.player.y;
    let walkStep = 0;

    function renderLoop() {
      frameTick++;
      const moved = Math.hypot(window.player.x - lastX, window.player.y - lastY);
      if (moved > 0.2) walkStep += moved * 0.35;
      lastX = window.player.x;
      lastY = window.player.y;

      const c = window.ctx;
      const w = window.WORLD || { w: 1800, h: 1300, roadStep: 360 };
      const camX = Math.max(0, Math.min(w.w - canvas.width, window.player.x - canvas.width / 2));
      const camY = Math.max(0, Math.min(w.h - canvas.height, window.player.y - canvas.height / 2));

      c.save();
      c.translate(-camX, -camY);

      // Road lane dashes
      c.strokeStyle = 'rgba(250, 204, 21, 0.38)';
      c.lineWidth = 2;
      c.setLineDash([14, 14]);
      for (let x = 0; x <= w.w; x += w.roadStep) {
        c.beginPath(); c.moveTo(x, 0); c.lineTo(x, w.h); c.stroke();
      }
      for (let y = 0; y <= w.h; y += w.roadStep) {
        c.beginPath(); c.moveTo(0, y); c.lineTo(w.w, y); c.stroke();
      }
      c.setLineDash([]);

      // Building rooftops & windows
      for (const b of (window.BUILDINGS || [])) {
        c.fillStyle = '#1e293b';
        c.fillRect(b.x + 12, b.y + 12, Math.max(20, b.w - 24), Math.max(20, b.h - 24));
        c.fillStyle = 'rgba(56, 189, 248, 0.16)';
        for (let wx = b.x + 24; wx < b.x + b.w - 30; wx += 34) {
          for (let wy = b.y + 24; wy < b.y + b.h - 30; wy += 34) {
            c.fillRect(wx, wy, 14, 12);
          }
        }
      }

      // Enemy human characters
      for (const e of window.enemies) {
        const ang = Math.atan2(window.player.y - e.y, window.player.x - e.x);
        drawCharacterFigure(c, e.x, e.y, ang, 'Enemy', true, frameTick + e.x * 0.05);
      }

      // Player 2026 vehicle + character tag
      const vehObj = (window.VEHICLES_2026 || []).find(v => v.name === window.state.vehicle);
      drawDetailedVehicle(
        c,
        window.player.x,
        window.player.y,
        window.player.angle,
        window.state.vehicle,
        vehObj ? vehObj.color : '#f59e0b',
        frameTick
      );

      // Character badge near player
      drawCharacterFigure(
        c,
        window.player.x - Math.cos(window.player.angle) * 24,
        window.player.y - Math.sin(window.player.angle) * 24,
        window.player.angle,
        window.state.char,
        false,
        walkStep
      );

      c.restore();
      requestAnimationFrame(renderLoop);
    }

    requestAnimationFrame(renderLoop);
  }

  setTimeout(patchCanvasRender, 300);
  return { drawCharacterFigure, drawDetailedVehicle, patchCanvasRender };
})();

