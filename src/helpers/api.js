const API_BASE = "https://dragonball-api.com/api";

function parseKi(raw) {
  if (!raw) return 0;
  const s = String(raw).trim().toLowerCase();
  const scales = {
    thousand: 1e3,
    million: 1e6,
    billion: 1e9,
    trillion: 1e12,
    quadrillion: 1e15,
    quintillion: 1e18,
    sextillion: 1e21,
    septillion: 1e24,
    octillion: 1e27,
    nonillion: 1e30,
  };
  const match = s.match(/([\d.,]+)\s*([a-z]+)?/);
  if (!match) return 0;
  let n = Number(match[1].replace(/\./g, "").replace(/,/g, ""));
  if (!isFinite(n)) n = 0;
  const scale = match[2] ? scales[match[2]] : undefined;
  if (scale) {
    const decimal = Number(match[1].replace(/,/g, ""));
    n = (isFinite(decimal) ? decimal : n) * scale;
  }
  return n;
}

export function kiToScore(kiRaw) {
  const ki = parseKi(kiRaw);
  if (ki <= 0) return 10;
  const log = Math.log10(ki);
  const score = ((log - 2) / 28) * 100;
  return Math.max(5, Math.min(100, Math.round(score)));
}

const VILLAIN_NAMES = new Set([
  "Frieza", "Cell", "Majin Buu", "Kid Buu", "Super Buu", "Broly",
  "Cooler", "Bills", "Beerus", "Janemba", "Hit", "Jiren", "Zamasu",
  "Black Goku", "Goku Black", "Fused Zamasu", "Moro", "Granolah",
  "Gas", "Nappa", "Raditz", "Dabura", "Babidi",
]);

export function inferSide(character) {
  if (VILLAIN_NAMES.has(character.name)) return "villain";
  const aff = (character.affiliation || "").toLowerCase();
  if (aff.includes("villain") || aff.includes("frieza") || aff.includes("red ribbon"))
    return "villain";
  return "hero";
}

export async function fetchCharacters() {
  const res = await fetch(`${API_BASE}/characters?limit=100`);
  if (!res.ok) throw new Error(`Failed to load characters: ${res.status}`);
  const json = await res.json();
  return json.items || [];
}

export async function fetchCharacter(id) {
  const res = await fetch(`${API_BASE}/characters/${id}`);
  if (!res.ok) throw new Error(`Character not found: ${id}`);
  return res.json();
}