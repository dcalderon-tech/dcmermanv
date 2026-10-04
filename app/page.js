"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) return null;

  if (!user) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#063B28", color: "#FFFFFF", fontFamily: "sans-serif" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>♻ DCMERMANV</h2>
          <button onClick={() => router.push("/ingresar")} style={{ backgroundColor: "#04291C", color: "#FFFFFF", border: "1px solid #10B981", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
            Ingresar o crear cuenta
          </button>
        </header>

        <section style={{ maxWidth: "900px", margin: "60px auto", textAlign: "center", padding: "0 20px" }}>
          <span style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", color: "#A7F3D0" }}>♻ ECONOMÍA CIRCULAR · NORTE DEL PERÚ</span>
          <h1 style={{ fontSize: "48px", fontWeight: "800", marginTop: "16px", lineHeight: "1.2" }}>
            Las mermas de hoy pueden ser recursos de mañana.
          </h1>
          <p style={{ fontSize: "18px", color: "#D1FAE5", marginTop: "20px", marginBottom: "32px" }}>
            Una plataforma privada para personas, talleres, empresas y recicladores. Publica, dona, vende, intercambia o encuentra materiales que todavía tienen valor.
          </p>
          <button onClick={() => router.push("/ingresar")} style={{ backgroundColor: "#10B981", color: "#063B28", border: "none", padding: "14px 28px", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
            Crear cuenta gratis
          </button>
        </section>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#F3F4F6", color: "#1F2937", fontFamily: "sans-serif" }}>
      {/* Header del Panel */}
      <header style={{ backgroundColor: "#063B28", color: "#FFFFFF", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>♻ DCMERMANV</h2>
          <span style={{ backgroundColor: "#04291C", color: "#A7F3D0", fontSize: "12px", padding: "4px 8px", borderRadius: "4px" }}>Panel Privado</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "14px", color: "#D1FAE5" }}>{user.email}</span>
          <button onClick={handleSignOut} style={{ backgroundColor: "#EF4444", color: "#FFFFFF", border: "none", padding: "8px 16px", borderRadius: "6px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#111827" }}>Bienvenido a DCMERMANV</h1>
          <p style={{ color: "#4B5563", marginTop: "4px" }}>Gestión de mermas e intercambio de materiales para la economía circular.</p>
        </div>

        {/* Tarjetas de Acción */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          <div style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #E5E7EB" }}>
            <span style={{ fontSize: "28px" }}>📦</span>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "12px", marginBottom: "8px" }}>Catálogo de Mermas</h3>
            <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: "1.5" }}>Explora las publicaciones de personas, talleres y empresas en la región Norte.</p>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #E5E7EB" }}>
            <span style={{ fontSize: "28px" }}>➕</span>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "12px", marginBottom: "8px" }}>Publicar Merma</h3>
            <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: "1.5" }}>Sube fotos, define el tipo de operación (venta, donación, intercambio) e información del material.</p>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #E5E7EB" }}>
            <span style={{ fontSize: "28px" }}>💬</span>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "12px", marginBottom: "8px" }}>Buzón de Mensajes</h3>
            <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: "1.5" }}>Próximamente: gestiona conversaciones privadas para coordinar entregas e intercambios.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
