"use client";

import { useMemo, useState } from "react";

type Scholarship = {
  name: string; country: string; level: string; field: string; covers: string; deadline: string;
};

const DATA: Scholarship[] = [
  { name: "Chevening Scholarships", country: "United Kingdom", level: "Master's", field: "Any field", covers: "Full tuition, living costs, flights", deadline: "Nov 2026" },
  { name: "Fulbright Foreign Student Program", country: "United States", level: "Master's", field: "Any field", covers: "Tuition, stipend, health insurance", deadline: "Varies by country" },
  { name: "DAAD Study Scholarships", country: "Germany", level: "Master's", field: "Engineering & Sciences", covers: "Monthly stipend, travel allowance", deadline: "Oct 2026" },
  { name: "Global Korea Scholarship", country: "South Korea", level: "Bachelor's", field: "Any field", covers: "Tuition, allowance, Korean language year", deadline: "Mar 2027" },
  { name: "Australia Awards", country: "Australia", level: "Master's", field: "Development studies", covers: "Tuition, living costs, return airfare", deadline: "Apr 2027" },
  { name: "Erasmus Mundus Joint Masters", country: "Europe", level: "Master's", field: "Any field", covers: "Tuition, travel, monthly allowance", deadline: "Jan 2027" },
  { name: "Swedish Institute Scholarships", country: "Sweden", level: "Master's", field: "Sustainability", covers: "Tuition and living expenses", deadline: "Feb 2027" },
  { name: "MEXT Scholarship", country: "Japan", level: "PhD", field: "Any field", covers: "Tuition, monthly stipend, airfare", deadline: "May 2027" },
  { name: "Vanier Canada Graduate Scholarships", country: "Canada", level: "PhD", field: "Health & Sciences", covers: "CA$50,000 per year for 3 years", deadline: "Nov 2026" },
  { name: "Turkiye Burslari", country: "Türkiye", level: "Bachelor's", field: "Any field", covers: "Tuition, housing, stipend, flights", deadline: "Feb 2027" },
];

const ALL = "All";
const uniq = (k: keyof Scholarship) => [ALL, ...Array.from(new Set(DATA.map((d) => d[k])))];

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="block text-sm font-medium text-paper">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-paper/20 bg-paper px-3 py-2.5 text-ink"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

export default function ScholarshipFinder() {
  const [country, setCountry] = useState(ALL);
  const [level, setLevel] = useState(ALL);
  const [q, setQ] = useState("");

  const results = useMemo(
    () => DATA.filter((d) =>
      (country === ALL || d.country === country) &&
      (level === ALL || d.level === level) &&
      (q === "" || `${d.name} ${d.field}`.toLowerCase().includes(q.toLowerCase()))),
    [country, level, q],
  );

  return (
    <div id="find" className="mx-auto max-w-6xl px-5">
      <div className="grid gap-4 rounded-2xl bg-sea p-6 shadow-xl sm:grid-cols-3">
        <label className="block text-sm font-medium text-paper">
          Search by name or field
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. engineering"
            className="mt-1 w-full rounded-lg border border-paper/20 bg-paper px-3 py-2.5 text-ink"
          />
        </label>
        <Select label="Study in" value={country} options={uniq("country")} onChange={setCountry} />
        <Select label="Level" value={level} options={uniq("level")} onChange={setLevel} />
      </div>

      <p className="mt-6 text-sm text-ink/70" aria-live="polite">
        {results.length} scholarship{results.length === 1 ? "" : "s"} found
      </p>

      <ul className="mt-3 grid gap-4 md:grid-cols-2">
        {results.map((s) => (
          <li key={s.name} className="rounded-xl border border-ink/10 bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold">{s.name}</h3>
              <span className="shrink-0 rounded-full bg-sky px-3 py-1 text-xs font-medium">{s.level}</span>
            </div>
            <p className="mt-1 text-sm text-ink/70">{s.country} · {s.field}</p>
            <p className="mt-3 text-sm">{s.covers}</p>
            <p className="mt-3 text-sm font-medium text-sea">Deadline: {s.deadline}</p>
          </li>
        ))}
      </ul>
      {results.length === 0 && (
        <p className="mt-6 rounded-xl bg-sky p-5">No matches. Set Study in or Level to All, or shorten your search.</p>
      )}
      <p className="mt-4 text-xs text-ink/60">Sample listings. Always confirm dates and eligibility on the official scholarship website.</p>
    </div>
  );
}
