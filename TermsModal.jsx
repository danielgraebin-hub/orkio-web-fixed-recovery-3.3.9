import React from "react";
export default function TermsModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,.55)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000}}>
      <div style={{background:"#111827", color:"#fff", padding:24, borderRadius:16, maxWidth:560, width:"92%"}}>
        <h3 style={{marginTop:0}}>Termos e privacidade</h3>
        <p>Revise os termos legais antes de continuar.</p>
        <div style={{display:"flex", justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{padding:"10px 14px", borderRadius:10, border:"none", cursor:"pointer"}}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
