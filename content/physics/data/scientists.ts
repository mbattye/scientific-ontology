import type { Scientist } from "../types";

// `quantityIds` is derived by the loader from each scientist's equations.
// Any ids listed here are merged in addition to the derived set (useful for
// scientists associated with a quantity but no specific equation in the seed).
export type ScientistSeed = Omit<Scientist, "quantityIds"> & {
  quantityIds?: string[];
};

export const scientists: ScientistSeed[] = [
  {
    id: "hooke",
    name: "Robert Hooke",
    born: 1635,
    died: 1703,
    blurb:
      "English polymath who formulated the law of elasticity relating force and extension.",
    equationIds: ["hookes-law"],
  },
  {
    id: "newton",
    name: "Isaac Newton",
    born: 1643,
    died: 1727,
    blurb:
      "Laid the foundations of classical mechanics with his laws of motion and universal gravitation.",
    equationIds: ["newtons-second-law", "momentum", "newton-gravitation"],
  },
  {
    id: "coulomb",
    name: "Charles-Augustin de Coulomb",
    born: 1736,
    died: 1806,
    blurb:
      "Quantified the electrostatic force between charges, giving his name to the unit of charge.",
    equationIds: ["coulombs-law"],
  },
  {
    id: "watt",
    name: "James Watt",
    born: 1736,
    died: 1819,
    blurb:
      "Improved the steam engine; the SI unit of power is named in his honour.",
    equationIds: ["power-work"],
  },
  {
    id: "carnot",
    name: "Sadi Carnot",
    born: 1796,
    died: 1832,
    blurb:
      "Founder of thermodynamics, who analysed the efficiency of heat engines.",
    equationIds: ["first-law", "entropy-change"],
  },
  {
    id: "ohm",
    name: "Georg Ohm",
    born: 1789,
    died: 1854,
    blurb:
      "Discovered the proportionality between voltage and current in a conductor.",
    equationIds: ["ohms-law"],
  },
  {
    id: "faraday",
    name: "Michael Faraday",
    born: 1791,
    died: 1867,
    blurb:
      "Pioneer of electromagnetism and electrochemistry; discovered electromagnetic induction.",
    equationIds: ["capacitance-def", "faradays-law", "magnetic-flux-def"],
  },
  {
    id: "joule",
    name: "James Prescott Joule",
    born: 1818,
    died: 1889,
    blurb:
      "Established the mechanical equivalent of heat, unifying work and energy.",
    equationIds: [
      "kinetic-energy",
      "work-done",
      "electric-power",
      "first-law",
      "specific-heat",
    ],
  },
  {
    id: "maxwell",
    name: "James Clerk Maxwell",
    born: 1831,
    died: 1879,
    blurb:
      "Unified electricity, magnetism and light into a single electromagnetic theory.",
    equationIds: ["faradays-law"],
    quantityIds: ["electric-field", "magnetic-field"],
  },
  {
    id: "boltzmann",
    name: "Ludwig Boltzmann",
    born: 1844,
    died: 1906,
    blurb:
      "Founder of statistical mechanics, linking entropy to microscopic states.",
    equationIds: ["ideal-gas-law", "entropy-change", "boltzmann-entropy"],
  },
  {
    id: "lorentz",
    name: "Hendrik Lorentz",
    born: 1853,
    died: 1928,
    blurb:
      "Described the force on charges in fields and the transformations underpinning relativity.",
    equationIds: ["lorentz-force", "lorentz-factor-def"],
  },
  {
    id: "tesla",
    name: "Nikola Tesla",
    born: 1856,
    died: 1943,
    blurb:
      "Inventor and engineer of alternating-current systems; the unit of magnetic field bears his name.",
    equationIds: [],
    quantityIds: ["magnetic-field", "voltage", "electric-current"],
  },
  {
    id: "planck",
    name: "Max Planck",
    born: 1858,
    died: 1947,
    blurb:
      "Originated quantum theory by proposing that energy is emitted in discrete quanta.",
    equationIds: ["planck-relation"],
  },
  {
    id: "einstein",
    name: "Albert Einstein",
    born: 1879,
    died: 1955,
    blurb:
      "Revolutionised physics with relativity and the quantum explanation of the photoelectric effect.",
    equationIds: [
      "planck-relation",
      "photoelectric",
      "mass-energy",
      "lorentz-factor-def",
    ],
  },
  {
    id: "de-broglie",
    name: "Louis de Broglie",
    born: 1892,
    died: 1987,
    blurb:
      "Proposed that all matter exhibits wave-like behaviour, founding wave mechanics.",
    equationIds: ["de-broglie"],
  },
];
