// Decorative math art for the home hero: a field of superposed harmonics.
// Each line is A·sin(2πf·t + φ) + a second harmonic, shaped by a sin^1.2
// envelope so every curve converges at the edges like a vibrating string.
const WIDTH = 1200;
const HEIGHT = 480;
const LINES = 18;
const POINTS = 160;

const STROKES = ["var(--accent)", "var(--accent)", "var(--rose)", "var(--accent)", "var(--mint)", "var(--accent)"];

const curves = Array.from({ length: LINES }, (_, i) => {
    const u = i / (LINES - 1);
    const baseline = HEIGHT * (0.16 + 0.68 * u);
    const amplitude = 22 + 40 * Math.sin(Math.PI * u);
    const frequency = 1.5 + 1.4 * u;
    const phase = u * Math.PI * 2.4;

    let d = "";
    for (let j = 0; j <= POINTS; j++) {
        const t = j / POINTS;
        const envelope = Math.sin(Math.PI * t) ** 1.2;
        const wave =
            amplitude * Math.sin(2 * Math.PI * frequency * t + phase) +
            10 * Math.sin(2 * Math.PI * frequency * 2.6 * t - phase * 1.6);
        const x = t * WIDTH;
        const y = baseline + envelope * wave;
        d += `${j === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }

    return {
        d,
        stroke: STROKES[i % STROKES.length],
        opacity: 0.1 + 0.16 * Math.sin(Math.PI * u),
    };
});

export default function HeroCurves() {
    return (
        <svg
            className="hero-curves"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
        >
            {curves.map((curve, i) => (
                <path key={i} d={curve.d} fill="none" stroke={curve.stroke} strokeWidth="1.1" opacity={curve.opacity} />
            ))}
        </svg>
    );
}
