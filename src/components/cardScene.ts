// The JSA card's opening scene, worked out frame by frame so it can be drawn live in the page.
// It is the same maths as tools/card-video/scene/scene.html (which renders the tour video's
// outro), so the live scene and the video line up exactly where they hand over.
//
//   tf  "flight time": 0 = the sun just sitting there, 0.8 -> 2.95 = the sun shrinks into the
//       header logo of the framed site window and the site fades in
//   ti  plain clock time in seconds, used only for the idle motion (breathing, floating, spinning)

const CX = 312 // the sun's resting position, in card pixels (the card is 624 x 380)
const CY = 176
// where the header logo sits inside the framed site window (measured from the live site)
const CREST = { x: 105.3, y: 64.3, d: 8.44 }

export const FLIGHT_START = 0.8
export const FLIGHT_END = 2.95

// idle motion; at ti = 0 everything is at rest, which is also where the tour video's outro ends
const BREATHE_PERIOD = 2.5
const BOB_PERIOD = 2.0
const SPIN = 7.2 // degrees per second (the white flower, always a multiple of its 72 degree symmetry)
const SIDE_SPIN = 21.6

export type Place = { transform: string; opacity: number }

export type Scene = {
  bg: number // opacity of the pink backdrop
  site: number // opacity of the site window
  patch: number // opacity of the white patch that hides the real logo until the sun lands
  halo: Place
  glow: Place
  sun: Place
  sakura: Place
  sideL: Place
  sideR: Place
}

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a))
const eio = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const eo = (x: number) => 1 - Math.pow(1 - x, 3)
const lerp = (a: number, b: number, x: number) => a + (b - a) * x

function place(w: number, h: number, cx: number, cy: number, scale = 1, rot = 0, opacity = 1): Place {
  return { transform: `translate(${cx - w / 2}px, ${cy - h / 2}px) rotate(${rot}deg) scale(${scale})`, opacity }
}

export function sceneAt(tf: number, ti: number): Scene {
  const t = Math.max(tf, 0)
  const breathe = Math.sin((ti * 2 * Math.PI) / BREATHE_PERIOD)
  const bob = 4 * Math.sin((ti * 2 * Math.PI) / BOB_PERIOD)

  const pb = prog(t, 0.8, 1.5) // petals and glow leave
  const z = eio(prog(t, 1.1, 2.65)) // the sun flies to the logo
  const zs = eio(prog(t, 1.1, 2.55)) // and its size settles a hair early
  const d = Math.exp(lerp(Math.log(200), Math.log(CREST.d), zs))
  const px = lerp(CX, CREST.x, z)
  const py = lerp(CY, CREST.y, z) - 22 * Math.sin(Math.PI * z) // a gentle arc on the way
  const handoff = 1 - prog(t, 2.62, 2.95) // fades into the real logo on the site
  const so = eo(pb)
  const site = eio(prog(t, 1.5, 2.5))

  return {
    bg: 1 - eo(prog(t, 0.8, 1.6)),
    site,
    patch: (1 - eo(prog(t, 2.55, 3.0))) * site,
    halo: place(290, 290, CX, CY, 1 + 0.02 * breathe, 0, 1 - eo(pb)),
    glow: place(300, 300, CX, CY, 1 + 0.04 * breathe, 0, 1 - eo(pb)),
    sun: place(200, 200, px, py, d / 200, 0, handoff),
    sakura: place(130, 130, px, py, d / 200, ((ti * SPIN) % 72) * (1 - z), handoff),
    sideL: place(47, 47, 97 - 120 * so, 176 + bob - 30 * so, 1 - 0.3 * so, -ti * SIDE_SPIN - 140 * so, 1 - so),
    sideR: place(47, 47, 527 + 120 * so, 176 - bob - 30 * so, 1 - 0.3 * so, ti * SIDE_SPIN + 140 * so, 1 - so),
  }
}
