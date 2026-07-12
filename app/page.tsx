
import Link from "next/link";

const features = [
  {
    title: "Track crops",
    description: "Keep planting, growth, and harvest plans in one calm overview.",
  },
  {
    title: "Manage expenses",
    description: "Log spending quickly and stay on top of your farm finances.",
  },
  {
    title: "Review progress",
    description: "Check harvest history and notes to make smarter decisions.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),rgba(245,245,244,0.9))] text-zinc-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-900">
          CropTrack
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-600">
          <a href="#about" className="transition hover:text-zinc-900">
            About
          </a>
          <Link href="/dashboard" className="rounded-full bg-zinc-900 px-4 py-2 font-medium text-white transition hover:bg-zinc-800">
            Dashboard
          </Link>
        </nav>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur">
            Trusted by modern farm operators
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
            Simplify farm operations with a clear digital workspace.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600">
            Track crops, record expenses, capture harvest insights, and keep your farm notes organized in one calm platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              Open dashboard
            </Link>
            <a
              href="#about"
              className="rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-400"
            >
              Learn more
            </a>
          </div>
        </div>

        <div className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white/90 p-6 shadow-[0_20px_60px_-25px_rgba(24,24,27,0.25)] backdrop-blur">
          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
            <p className="text-sm font-medium text-zinc-500">Today at a glance</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm transition hover:translate-x-1">
                <span className="text-sm text-zinc-600">Crops in progress</span>
                <span className="font-semibold text-zinc-900">12</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm transition hover:translate-x-1">
                <span className="text-sm text-zinc-600">Expenses logged</span>
                <span className="font-semibold text-zinc-900">24</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm transition hover:translate-x-1">
                <span className="text-sm text-zinc-600">Harvest records</span>
                <span className="font-semibold text-zinc-900">8</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-zinc-950">About CropTrack</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
            CropTrack is designed for small farm operators who want calm, dependable tools to stay organized. It brings your crops, cost tracking, harvest records, and notes into one thoughtful workspace that feels simple and trustworthy.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <h3 className="text-lg font-semibold text-zinc-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 CropTrack. Built for better farm planning.</p>
          <Link href="/dashboard" className="font-medium text-zinc-900 transition hover:text-zinc-700">
            Go to dashboard
          </Link>
        </div>
      </footer>
    </main>
  );
}
