export const ORKIO_VOICES = [
  { id: "cedar", label: "Cedar" },
  { id: "marin", label: "Marin" },
  { id: "echo", label: "Echo" },
  { id: "alloy", label: "Alloy" },
  { id: "shimmer", label: "Shimmer" },
  { id: "verse", label: "Verse" }
];

export function coerceVoiceId(value) {
  const v = String(value || "").trim().toLowerCase();
  if (!v) return "cedar";
  const hit = ORKIO_VOICES.find((x) => x.id === v);
  return hit ? hit.id : "cedar";
}
