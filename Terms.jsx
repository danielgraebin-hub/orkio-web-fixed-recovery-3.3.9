import React from "react";
import { Link } from "react-router-dom";
export default function Page() {
  return (
    <div style={{minHeight:"100vh", background:"#070910", color:"#fff", padding:"32px"}}>
      <div style={{maxWidth:860, margin:"0 auto"}}>
        <Link to="/" style={{color:"rgba(255,255,255,.7)"}}>← Voltar</Link>
        <h1>Terms of Use – Orkio</h1>
        <div style={{lineHeight:1.7, color:"rgba(255,255,255,.85)"}}><p>Termos de uso do Orkio.</p></div>
      </div>
    </div>
  );
}
