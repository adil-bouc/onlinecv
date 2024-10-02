"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ReactLenis } from "@studio-freight/react-lenis";
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, planeMesh;
    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMousePosition = { x: 0.5, y: 0.5 };
    let prevPosition = { x: 0.5, y: 0.5 };
    let easeFactor = 0.02;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform sampler2D u_texture;
      uniform vec2 u_mouse;
      uniform vec2 u_prevMouse;
      uniform float u_opacity;

      void main() {
        vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/40.0, 1.0/40.0);

        vec2 mouseDirection = u_mouse - u_prevMouse;

        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

        vec2 uvOffset = strength * -mouseDirection * 0.4;
        vec2 uv = vUv - uvOffset;

        vec4 color = texture2D(u_texture, uv);
        gl_FragColor = vec4(color.rgb, color.a * u_opacity);
      }
    `;

    function createTextTexture(text, font, size, color, fontWeight = "100") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const canvasWidth = window.innerWidth * 2;
      const canvasHeight = window.innerHeight * 2;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fontSize = size || Math.floor(canvasWidth * 0.4);

      ctx.fillStyle = color || "#ffffff";
      ctx.font = `${fontWeight} ${fontSize}px "${font || "Blanquotey"}"`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;

      const scaleFactor = Math.min(1, (canvasWidth * 0.8) / textWidth);
      const aspectCorrection = canvasWidth / canvasHeight;

      ctx.setTransform(
        scaleFactor,
        0,
        0,
        scaleFactor / aspectCorrection,
        canvasWidth / 2,
        canvasHeight / 2
      );

      ctx.fillText(text, 0, 0);

      return new THREE.CanvasTexture(canvas);
    }

    function initializeScene() {
      scene = new THREE.Scene();

      const aspectRatio = window.innerWidth / window.innerHeight;
      camera = new THREE.OrthographicCamera(
        -1,
        1,
        1 / aspectRatio,
        -1 / aspectRatio,
        0.1,
        1000
      );
      camera.position.z = 1;

      const texture = createTextTexture("adil b.", "Blanquotey", null, "#ffffff", "100");

      let shaderUniforms = {
        u_mouse: { type: "v2", value: new THREE.Vector2() },
        u_prevMouse: { type: "v2", value: new THREE.Vector2() },
        u_texture: { type: "t", value: texture },
        u_opacity: { type: "f", value: 0 }
      };

      planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader,
          fragmentShader,
          transparent: true
        })
      );

      scene.add(planeMesh);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      canvasRef.current.appendChild(renderer.domElement);
    }

    function animateScene() {
      requestAnimationFrame(animateScene);

      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

      planeMesh.material.uniforms.u_mouse.value.set(
        mousePosition.x,
        1.0 - mousePosition.y
      );

      planeMesh.material.uniforms.u_prevMouse.value.set(
        prevPosition.x,
        1.0 - prevPosition.y
      );

      renderer.render(scene, camera);
    }

    function handleMouseMove(event) {
      easeFactor = 0.035;
      let rect = canvasRef.current.getBoundingClientRect();
      prevPosition = { ...targetMousePosition };

      targetMousePosition.x = (event.clientX - rect.left) / rect.width;
      targetMousePosition.y = (event.clientY - rect.top) / rect.height;
    }

    function handleMouseEnter(event) {
      easeFactor = 0.01;
      let rect = canvasRef.current.getBoundingClientRect();

      mousePosition.x = targetMousePosition.x =
        (event.clientX - rect.left) / rect.width;
      mousePosition.y = targetMousePosition.y =
        (event.clientY - rect.top) / rect.height;
    }

    function handleMouseLeave() {
      easeFactor = 0.01;
      targetMousePosition = { ...prevPosition };
    }

    function onWindowResize() {
      const aspectRatio = window.innerWidth / window.innerHeight;
      camera.left = -1;
      camera.right = 1;
      camera.top = 1 / aspectRatio;
      camera.bottom = -1 / aspectRatio;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      const texture = createTextTexture("adil b.", "Blanquotey", null, "#ffffff", "100");
      planeMesh.material.uniforms.u_texture.value = texture;
    }

    initializeScene();
    animateScene();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", onWindowResize);

    // Fade in the 3D text immediately
    gsap.to(planeMesh.material.uniforms.u_opacity, {
      value: 1,
      duration: 1,
      ease: "power2.inOut"
    });

    const scrollTriggerSettings = {
      trigger: ".main",
      start: "top 25%",
      toggleActions: "play reverse play reverse",
    };

    const leftXValues = [-400, -450, -200];
    const rightXValues = [400, 450, 200];
    const leftRotationValues = [-15, -10, -15];
    const rightRotationValues = [15, 10, 15];
    const yValues = [50, -75, -200];

    gsap.utils.toArray(".row").forEach((row, index) => {
      const cardLeft = row.querySelector(".card-left");
      const cardRight = row.querySelector(".card-right");

      gsap.to(cardLeft, {
        x: leftXValues[index],
        scrollTrigger: {
          trigger: ".main",
          start: "top center",
          end: "150% bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            cardLeft.style.transform = `translateX(${
              progress * leftXValues[index]
            }px) translateY(${progress * yValues[index]}px) rotate(${
              progress * leftRotationValues[index]
            }deg)`;
            cardRight.style.transform = `translateX(${
              progress * rightXValues[index]
            }px) translateY(${progress * yValues[index]}px) rotate(${
              progress * rightRotationValues[index]
            }deg)`;
          },
        },
      });
    });

    gsap.to(".logo", {
      scale: 1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to(".line p", {
      y: 0,
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.1,
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to("button", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
      delay: 0.25,
      scrollTrigger: scrollTriggerSettings,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
    };
  }, []);

  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div className="row" key={i}>
          <div className="card card-left">
            <Image
              src={`/img-${2 * i - 1}.jpg`}
              alt={`Image ${2 * i - 1}`}
              width={500}
              height={300}
              layout="responsive"
              objectFit="cover"
              quality={100}
            />
          </div>
          <div className="card card-right">
            <Image
              src={`/img-${2 * i}.jpg`}
              alt={`Image ${2 * i}`}
              width={500}
              height={300}
              layout="responsive"
              objectFit="cover"
              quality={100}
            />
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <ReactLenis root>
      <section className="hero" ref={canvasRef}></section>
      <section className="main">
        <div className="main-content">
          <div className="logo">
            <Image src="/logo.webp" alt="" width={100} height={100} />
          </div>
          <div className="copy">
            <div className="line">
              <p>Front-end & Graphic Designer</p>
            </div>
            <div className="line">
              <p>Creative Development</p>
            </div>
          </div>
          <div className="btn">
            <button>↓</button>
          </div>
        </div>

        {generateRows()}
      </section>
      <section className="footer">
        <Link href="https://www.linkedin.com/in/adil-bouchayoua-a9b5322a8/">Nice to meet you !</Link>
      </section>
    </ReactLenis>
  );
}