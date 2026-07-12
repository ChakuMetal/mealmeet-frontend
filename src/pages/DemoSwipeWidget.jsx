import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SwipeRecipesPage.css";

const DEMO_RECIPES = [
  {
    _id: "demo-1",
    title: "Costillas a baja temperatura",
    image:
      "https://content-cocina.lecturas.com/medio/2022/04/06/costillar-a-baja-temperatura_00000000_240216123113_1200x1200.jpg",
    category: "Carnes",
    level: "Fácil",
    preptime: 120,
  },
  {
    _id: "demo-2",
    title: "Ensalada de frutas exóticas",
    image: "https://cdn7.kiwilimon.com/recetaimagen/610/640x640/13211.jpg.webp",
    category: "Postres",
    level: "Fácil",
    preptime: 15,
  },
  {
    _id: "demo-3",
    title: "Pasta al ajillo",
    image:
      "https://d2j9trpqxd6hrn.cloudfront.net/uploads/recipe/picture/1030/espaguetis_al_ajillo_3.webp",
    category: "Pasta",
    level: "Fácil",
    preptime: 20,
  },
  {
    _id: "demo-4",
    title: "Ceviche peruano",
    image:
      "https://static1.squarespace.com/static/60ff20587f00f42b9b296006/t/6116e7fc05bb7e105006999a/1628891139137/ceviche+peruano.JPG?format=1500w",
    category: "Pescado",
    level: "Medio",
    preptime: 30,
  },
  {
    _id: "demo-5",
    title: "Brownies de chocolate",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/brownie-chocolate-helado-elle-gourmet-64d48f5ba8668.jpg?crop=0.9655555555555556xw:1xh;center,top&resize=1200:*",
    category: "Postres",
    level: "Fácil",
    preptime: 35,
  },
  {
    _id: "demo-6",
    title: "Tacos al pastor",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    category: "Mexicana",
    level: "Medio",
    preptime: 40,
  },
];

function DemoSwipeWidget({ compact = false }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef(null);
  const dragStart = useRef(null);

  const currentRecipe = useMemo(
    () => DEMO_RECIPES[currentIndex],
    [currentIndex],
  );
  const total = DEMO_RECIPES.length;
  const progress = total > 0 ? currentIndex + 1 : 0;

  const handleLike = useCallback(() => {
    if (!currentRecipe || isExiting) return;
    setShowModal(true);
  }, [currentRecipe, isExiting]);

  const handlePass = useCallback(() => {
    if (!currentRecipe || isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsExiting(false);
    }, 300);
  }, [currentRecipe, isExiting]);

  const handlePointerDown = useCallback(
    (e) => {
      if (isExiting) return;
      dragStart.current = e.clientX;
    },
    [isExiting],
  );

  const handlePointerMove = useCallback((e) => {
    if (dragStart.current === null) return;
    const deltaX = e.clientX - dragStart.current;
    const clampedDeltaX = Math.max(-140, Math.min(140, deltaX));

    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${clampedDeltaX}px) rotate(${clampedDeltaX * 0.04}deg)`;
      cardRef.current.style.transition = "none";
      cardRef.current.classList.toggle("swipe-drag-like", clampedDeltaX > 20);
      cardRef.current.classList.toggle("swipe-drag-pass", clampedDeltaX < -20);
    }
  }, []);

  const handlePointerUp = useCallback(
    (e) => {
      if (dragStart.current === null) return;
      const deltaX = e.clientX - dragStart.current;
      dragStart.current = null;

      if (cardRef.current) {
        cardRef.current.style.transform = "";
        cardRef.current.style.transition = "";
        cardRef.current.classList.remove("swipe-drag-like", "swipe-drag-pass");
      }

      if (deltaX > 100) handleLike();
      else if (deltaX < -100) handlePass();
    },
    [handleLike, handlePass],
  );

  const handlePointerCancel = useCallback(() => {
    dragStart.current = null;
    if (cardRef.current) {
      cardRef.current.style.transform = "";
      cardRef.current.style.transition = "";
      cardRef.current.classList.remove("swipe-drag-like", "swipe-drag-pass");
    }
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      const tagName = event.target?.tagName;
      const isTyping =
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        event.target?.isContentEditable;
      if (isTyping || !currentRecipe || isExiting) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePass();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleLike();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentRecipe, isExiting, handleLike, handlePass]);

  if (!currentRecipe) {
    return (
      <div className="swipe-card">
        <h2>¡Demo finalizado!</h2>
        <p className="recipes-state">Has visto todas las recetas demo.</p>
        <button
          type="button"
          className="swipe-btn swipe-btn-like"
          style={{ marginTop: "14px" }}
          onClick={() => navigate("/register")}
        >
          Crear cuenta gratis
        </button>
      </div>
    );
  }

  return (
    <div className={compact ? "home-demo-wrap" : "page-section"}>
      <div
        className={`swipe-card ${isExiting ? "swipe-card-exit" : ""}`}
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerCancel}
      >
        <h1>{compact ? "Prueba Swipe en vivo" : "Modo Demo"}</h1>
        <p className="swipe-hint">
          Desliza la receta a la derecha si te gusta y a la izquierda si la
          quieres saltar.
        </p>
        <p className="recipes-total">
          Receta {progress} de {total}
        </p>

        <img
          src={currentRecipe.image}
          alt={currentRecipe.title}
          className="swipe-image"
          draggable="false"
        />

        <h2 className="swipe-title">{currentRecipe.title}</h2>
        <p>
          <strong>Categoría:</strong> {currentRecipe.category}
        </p>
        <p>
          <strong>Dificultad:</strong> {currentRecipe.level}
        </p>
        <p>
          <strong>Tiempo:</strong> {currentRecipe.preptime} minutos
        </p>

        <div className="swipe-actions">
          <button
            type="button"
            className="swipe-btn swipe-btn-pass"
            onClick={handlePass}
            disabled={isExiting}
          >
            Saltar
          </button>
          <button
            type="button"
            className="swipe-btn swipe-btn-like"
            onClick={handleLike}
            disabled={isExiting}
          >
            Me gusta
          </button>
        </div>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "24px",
              maxWidth: "420px",
              textAlign: "center",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#355c4b" }}>
              ¡Te gusta esta receta!
            </h2>
            <p style={{ color: "#666", marginBottom: "18px" }}>
              Regístrate para guardar tus favoritas y desbloquear el modo
              completo.
            </p>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="swipe-btn"
              >
                Seguir probando
              </button>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="swipe-btn swipe-btn-like"
              >
                Crear cuenta gratis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DemoSwipeWidget;
