"use client";

import React, { useEffect, useRef } from "react";

interface NodePoint {
  name: string;
  jp: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  z: number;
}

interface Arc {
  from: NodePoint;
  to: NodePoint;
  progress: number;
  speed: number;
  color: string;
}

export default function EarthNetCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Global Internet Gateway Cities [lat, lng, name, jp]
    const rawNodes = [
      { name: "Tokyo", jp: "東京", lat: 35.6762, lng: 139.6503 },
      { name: "Osaka", jp: "大阪", lat: 34.6937, lng: 135.5023 },
      { name: "Seoul", jp: "ソウル", lat: 37.5665, lng: 126.978 },
      { name: "Singapore", jp: "星洲", lat: 1.3521, lng: 103.8198 },
      { name: "Frankfurt", jp: "独逸", lat: 50.1109, lng: 8.6821 },
      { name: "Zurich", jp: "瑞西", lat: 47.3769, lng: 8.5417 },
      { name: "London", jp: "倫敦", lat: 51.5074, lng: -0.1278 },
      { name: "Reykjavik", jp: "氷島", lat: 64.1466, lng: -21.9426 },
      { name: "New York", jp: "紐育", lat: 40.7128, lng: -74.006 },
      { name: "San Francisco", jp: "桑港", lat: 37.7749, lng: -122.4194 },
      { name: "Sydney", jp: "雪梨", lat: -33.8688, lng: 151.2093 },
      { name: "São Paulo", jp: "聖保", lat: -23.5505, lng: -46.6333 },
    ];

    // Earth Sphere Constants
    const radius = Math.min(width, height) * 0.42;

    // Convert lat/lng to 3D Cartesian coordinates
    const latLngTo3D = (lat: number, lng: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return {
        x: -(r * Math.sin(phi) * Math.cos(theta)),
        z: r * Math.sin(phi) * Math.sin(theta),
        y: r * Math.cos(phi),
      };
    };

    const nodes: NodePoint[] = rawNodes.map((n) => {
      const p = latLngTo3D(n.lat, n.lng, radius);
      return { ...n, ...p };
    });

    // Generate Internet Cable Traffic Arcs
    const arcs: Arc[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        // Connect nearby or key backbone gateways
        if (Math.random() > 0.45) {
          arcs.push({
            from: nodes[i],
            to: nodes[j],
            progress: Math.random(),
            speed: 0.003 + Math.random() * 0.005,
            color: i % 2 === 0 ? "rgba(0, 240, 255, 0.7)" : "rgba(0, 230, 153, 0.7)",
          });
        }
      }
    }

    // Generate Earth surface dot matrix (continents representation)
    const earthDots: { x: number; y: number; z: number; size: number; alpha: number }[] = [];
    const DOT_COUNT = 900;
    for (let i = 0; i < DOT_COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      earthDots.push({
        x,
        y,
        z,
        size: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    // Background cosmic depth particles
    const starCount = 120;
    const stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.8,
      y: (Math.random() - 0.5) * height * 1.8,
      size: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.5 + 0.2,
      twinkleSpeed: 0.02 + Math.random() * 0.03,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // Scroll tracking
    let scrollY = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;
    let targetRotationX = 0.2;
    let currentRotationX = 0.2;

    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
      // Scroll smoothly rotates the Earth around its axes
      targetRotationY = scrollY * 0.0018;
      targetRotationX = 0.2 + (scrollY * 0.0006) % (Math.PI * 0.3);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Handle Window Resize
    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // 3D rotation helper
    const rotate3D = (x: number, y: number, z: number, rx: number, ry: number) => {
      // Rotate around Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      // Rotate around X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      return { x: x1, y: y2, z: z2 };
    };

    let baseAutoRotation = 0;

    // Render Loop
    const render = () => {
      baseAutoRotation += 0.0012; // Continuous gentle rotation
      currentRotationY += (targetRotationY + baseAutoRotation - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const centerX = width > 1024 ? width * 0.68 : width * 0.5;
      const centerY = height * 0.5;

      // Draw faint stars
      ctx.save();
      ctx.translate(width / 2, height / 2);
      for (const s of stars) {
        s.twinklePhase += s.twinkleSpeed;
        const alpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));
        ctx.fillStyle = `rgba(180, 205, 235, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Earth atmospheric outer aura
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.75,
        centerX,
        centerY,
        radius * 1.25
      );
      gradient.addColorStop(0, "rgba(0, 240, 255, 0.04)");
      gradient.addColorStop(0.6, "rgba(0, 240, 255, 0.015)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw Earth dark base globe circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.98, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(10, 14, 20, 0.85)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw Latitude / Longitude coordinate rings
      const rings = [-0.6, -0.3, 0, 0.3, 0.6];
      for (const latRatio of rings) {
        const ringRadius = Math.sqrt(1 - latRatio * latRatio) * radius;
        const ringY = latRatio * radius;

        ctx.beginPath();
        ctx.ellipse(
          centerX,
          centerY + ringY * Math.cos(currentRotationX),
          ringRadius,
          ringRadius * Math.abs(Math.sin(currentRotationX)) * 0.4,
          0,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = "rgba(0, 240, 255, 0.035)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw Earth Surface Matrix Dots
      for (const dot of earthDots) {
        const rot = rotate3D(dot.x, dot.y, dot.z, currentRotationX, currentRotationY);
        // Only draw dots on the front hemisphere or dim on back
        const isFront = rot.z > -radius * 0.2;
        const depthAlpha = ((rot.z + radius) / (radius * 2)) * dot.alpha;

        if (isFront && depthAlpha > 0.02) {
          ctx.beginPath();
          ctx.arc(centerX + rot.x, centerY + rot.y, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 240, 255, ${Math.min(depthAlpha * 0.7, 0.6)})`;
          ctx.fill();
        }
      }

      // Transform and Project Node Points
      const projectedNodes = nodes.map((n) => {
        const rot = rotate3D(n.x, n.y, n.z, currentRotationX, currentRotationY);
        const isVisible = rot.z > -radius * 0.3;
        return {
          ...n,
          projX: centerX + rot.x,
          projY: centerY + rot.y,
          projZ: rot.z,
          visible: isVisible,
        };
      });

      // Draw Internet Mesh Backbone Arcs
      for (const arc of arcs) {
        const fromNode = projectedNodes.find((n) => n.name === arc.from.name);
        const toNode = projectedNodes.find((n) => n.name === arc.to.name);

        if (!fromNode || !toNode) continue;
        if (!fromNode.visible && !toNode.visible) continue;

        // Calculate control point elevated above the sphere
        const midX = (fromNode.projX + toNode.projX) / 2;
        const midY = (fromNode.projY + toNode.projY) / 2;
        const dist = Math.hypot(toNode.projX - fromNode.projX, toNode.projY - fromNode.projY);
        const arcLift = Math.min(dist * 0.35, radius * 0.4);

        const ctrlX = midX;
        const ctrlY = midY - arcLift;

        // Draw faint cable line
        ctx.beginPath();
        ctx.moveTo(fromNode.projX, fromNode.projY);
        ctx.quadraticCurveTo(ctrlX, ctrlY, toNode.projX, toNode.projY);
        ctx.strokeStyle = "rgba(0, 240, 255, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Update packet progress
        arc.progress = (arc.progress + arc.speed) % 1;

        // Quadratic bezier position for packet: B(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
        const t = arc.progress;
        const invT = 1 - t;
        const pktX = invT * invT * fromNode.projX + 2 * invT * t * ctrlX + t * t * toNode.projX;
        const pktY = invT * invT * fromNode.projY + 2 * invT * t * ctrlY + t * t * toNode.projY;

        // Draw traveling glowing packet
        const pktAlpha = Math.sin(t * Math.PI) * 0.9;
        ctx.beginPath();
        ctx.arc(pktX, pktY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${pktAlpha})`;
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Draw Gateways (Nodes) with Japanese Accent Tooltips
      for (const node of projectedNodes) {
        if (!node.visible) continue;

        const pulseScale = 1 + Math.sin(Date.now() * 0.003 + node.lat) * 0.25;

        // Pulse ring
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, 5 * pulseScale, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner solid core
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // City Label
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(230, 240, 255, 0.75)";
        ctx.fillText(node.name, node.projX + 8, node.projY - 4);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic 60fps Earth + Global Internet Web Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-1000 opacity-90"
      />
      {/* Clean subtle vignette gradient to keep content legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#08090c] via-[#08090c]/85 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090c]/70 via-transparent to-[#08090c] pointer-events-none" />
    </div>
  );
}
