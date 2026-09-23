import LoginDialog, { OpenLoginButton } from "@/components/LoginDialog";
import ScholarshipFinder from "@/components/ScholarshipFinder";

const stats = [
  ["60+", "countries with funded study options"],
  ["1,200+", "scholarships listed"],
  ["150k", "students helped to apply"],
];

const destinations = [
  ["🇬🇧", "United Kingdom", "Chevening, Commonwealth"],
  ["🇺🇸", "United States", "Fulbright, university awards"],
  ["🇩🇪", "Germany", "DAAD, Deutschlandstipendium"],
  ["🇯🇵", "Japan", "MEXT, JASSO"],
  ["🇦🇺", "Australia", "Australia Awards"],
  ["🇨🇦", "Canada", "Vanier, Lester B. Pearson"],
  ["🇰🇷", "South Korea", "Global Korea Scholarship"],
  ["🇸🇪", "Sweden", "Swedish Institute"],
];

const steps = [
  ["Set your profile", "Choose your destination, study level and field."],
  ["Check eligibility", "See what each award covers and who can apply."],
  ["Track deadlines", "Save scholarships and get a reminder before each closing date."],
];

const quotes = [
  ["I found a fully funded master's in Germany in one evening. The deadline reminders kept me on track.", "Ayesha K., Pakistan → Germany"],
  ["The eligibility summary saved me weeks. I knew exactly which awards to apply for.", "Daniel O., Nigeria → United Kingdom"],
  ["Everything in one place. I applied to four scholarships and received two offers.", "Mai T., Vietnam → Australia"],
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="font-display text-xl font-bold text-sea">🎓 ScholarWorld</a>
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#find" className="hover:text-sea">Find scholarships</a>
            <a href="#destinations" className="hover:text-sea">Destinations</a>
            <a href="#how" className="hover:text-sea">How it works</a>
            <a href="#faq" className="hover:text-sea">FAQ</a>
          </nav>
          <OpenLoginButton className="rounded-full bg-sea px-5 py-2 text-sm font-semibold text-paper hover:bg-sea/90" />
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-sea text-paper">
          <div aria-hidden className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-saffron/25 blur-3xl" />
          <div aria-hidden className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-sky/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-28">
            <div>
              <p className="inline-block rounded-full bg-paper/10 px-4 py-1.5 text-sm">Applications are open for 2027 intakes</p>
              <h1 className="mt-6 text-5xl font-bold leading-[1.05] sm:text-7xl">
                Study anywhere. Let a scholarship pay for it.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-paper/80">
                Search funded scholarships for bachelor's, master's and PhD study across the world, then track every deadline in one place.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#find" className="rounded-full bg-saffron px-7 py-3.5 font-semibold text-ink hover:brightness-95">Find my scholarship</a>
                <a href="#how" className="rounded-full border border-paper/40 px-7 py-3.5 font-semibold hover:bg-paper/10">See how it works</a>
              </div>
            </div>

            {/* Featured award stack */}
            <div className="relative mx-auto w-full max-w-sm" aria-label="Featured scholarships">
              {[
                ["Chevening", "United Kingdom · Master's", "Fully funded", "rotate-[-4deg]"],
                ["DAAD", "Germany · Master's", "Monthly stipend", "translate-x-6 rotate-[2deg]"],
                ["Global Korea", "South Korea · Bachelor's", "Tuition + allowance", "-translate-x-2 rotate-[-1deg]"],
              ].map(([n, m, c, r]) => (
                <div key={n} className={`mb-4 rounded-2xl bg-paper p-5 text-ink shadow-2xl ${r}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{n}</h3>
                    <span className="rounded-full bg-saffron/30 px-3 py-1 text-xs font-semibold text-sea">{c}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink/65">{m}</p>
                </div>
              ))}
            </div>
          </div>

          <dl className="relative mx-auto grid max-w-6xl gap-6 border-t border-paper/15 px-5 py-8 sm:grid-cols-3">
            {stats.map(([n, l]) => (
              <div key={n}>
                <dt className="font-display text-4xl font-bold text-saffron">{n}</dt>
                <dd className="mt-1 text-sm text-paper/75">{l}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Finder, pulled up to overlap the hero */}
        <section className="py-16"><ScholarshipFinder /></section>

        <section id="destinations" className="mx-auto max-w-6xl px-5 pb-20">
          <h2 className="text-3xl font-bold text-sea sm:text-4xl">Popular study destinations</h2>
          <p className="mt-3 max-w-xl text-ink/70">Start with a country and see which awards are open to international students.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {destinations.map(([flag, c, s]) => (
              <a key={c} href="#find" className="group rounded-2xl border border-ink/10 bg-white p-5 transition hover:border-sea hover:shadow-lg">
                <span className="text-4xl">{flag}</span>
                <h3 className="mt-3 font-semibold group-hover:text-sea">{c}</h3>
                <p className="mt-1 text-xs text-ink/60">{s}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="how" className="bg-sky py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-3xl font-bold text-sea sm:text-4xl">From search to application in three steps</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {steps.map(([t, d], i) => (
                <li key={t} className="rounded-2xl bg-paper p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sea font-display text-lg font-bold text-paper">{i + 1}</span>
                  <h3 className="mt-4 text-xl font-semibold">{t}</h3>
                  <p className="mt-2 text-ink/75">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-bold text-sea sm:text-4xl">Students who made it abroad</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {quotes.map(([q, a]) => (
              <figure key={a} className="rounded-2xl border border-ink/10 bg-white p-6">
                <blockquote className="text-ink/85">“{q}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-sea">{a}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-20">
          <div className="rounded-3xl bg-sea px-8 py-14 text-center text-paper">
            <h2 className="text-3xl font-bold sm:text-4xl">Your scholarship is waiting.</h2>
            <p className="mx-auto mt-3 max-w-md text-paper/80">Create a free account to save awards and never miss a deadline.</p>
            <OpenLoginButton className="mt-7 rounded-full bg-saffron px-8 py-3.5 font-semibold text-ink hover:brightness-95" />
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-3xl px-5 pb-24">
          <h2 className="text-3xl font-bold text-sea sm:text-4xl">Common questions</h2>
          {[
            ["Do I have to pay to use this site?", "No. Searching, saving and deadline reminders are free."],
            ["Can international students apply?", "Yes. Every listing shows which nationalities are eligible."],
            ["Are the scholarships fully funded?", "Each card lists exactly what the award covers, from tuition only to full living costs."],
          ].map(([q, a]) => (
            <details key={q} className="mt-4 rounded-xl border border-ink/15 bg-white p-5">
              <summary className="cursor-pointer font-semibold">{q}</summary>
              <p className="mt-3 text-ink/75">{a}</p>
            </details>
          ))}
        </section>
      </main>

      <footer className="bg-ink py-10 text-paper/70">
        <div className="mx-auto max-w-6xl px-5 text-sm">© {new Date().getFullYear()} ScholarWorld. Not affiliated with any scholarship provider.</div>
      </footer>

      <LoginDialog />
    </>
  );
}
