"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function Panel() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarUsuario() {
      const { data } = await supabase.auth.getUser();
      setUsuario(data.user);
      setCargando(false);
    }

    cargarUsuario();
  }, []);

  async function salir() {
    await supabase.auth.signOut();
    window.location.href = "/ingresar";
  }

  if (cargando) {
    return (
      <main className="section">
        <div className="container">
          <p>Cargando tu panel…</p>
        </div>
      </main>
    );
  }

  if (!usuario) {
    return (
      <main className="section">
        <div className="container">
          <h1>Acceso privado</h1>
          <p>Debes iniciar sesión para ver el catálogo.</p>
          <Link href="/ingresar" className="button primary">
            Iniciar sesión
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <p className="eyebrow">Panel privado</p>

        <h1>Bienvenido a DCMERMANV</h1>

        <p className="text">
          Sesión activa con: <strong>{usuario.email}</strong>
        </p>

        <div className="actions">
          <Link href="/app/publicar" className="button primary">
            Publicar una merma
          </Link>

          <button className="button secondary" onClick={salir}>
            Cerrar sesión
          </button>
        </div>

        <div className="grid">
          <article className="card">
            <span>📦</span>
            <h3>Catálogo</h3>
            <p>
              Aquí verás las mermas publicadas por personas, talleres y
              empresas.
            </p>
          </article>

          <article className="card">
            <span>➕</span>
            <h3>Publicar</h3>
            <p>
              Crea una nueva publicación con fotos, descripción y tipo de
              operación.
            </p>
          </article>

          <article className="card">
            <span>💬</span>
            <h3>Buzón</h3>
            <p>
              Próximamente: conversaciones privadas por publicación.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
