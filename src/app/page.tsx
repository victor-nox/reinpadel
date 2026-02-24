export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="font-display text-4xl font-bold text-brand-navy">
        Rein Padel Tour 2026
      </h1>
      <div className="flex gap-4">
        <div className="h-16 w-16 rounded-lg bg-brand-navy" title="Navy" />
        <div className="h-16 w-16 rounded-lg bg-brand-cyan" title="Cyan" />
        <div className="h-16 w-16 rounded-lg bg-brand-coral" title="Coral" />
        <div className="h-16 w-16 rounded-lg bg-brand-yellow-green" title="Yellow-green" />
        <div className="h-16 w-16 rounded-lg bg-brand-gray" title="Gray" />
        <div className="h-16 w-16 rounded-lg bg-brand-gray-light border border-brand-gray/10" title="Gray Light" />
      </div>
      <p className="font-body text-lg text-brand-gray">
        Design tokens and fonts loaded successfully.
      </p>
    </main>
  )
}
