import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Fr } from '@/lib/typography'

/**
 * VideoSection — full-width section with a centered heading and a responsive
 * 16:9 YouTube embed. Placed between HeroSection and TourSection to give
 * visitors an immediate visual introduction to the Rein Padel Tour.
 *
 * Layout:
 *   - SectionWrapper with white background
 *   - Centered <h2> heading
 *   - max-w-3xl aspect-video container with YouTube iframe
 *
 * Type: Server Component (no interactivity needed — YouTube handles its own JS)
 */
export function VideoSection() {
  return (
    <SectionWrapper id="video" className="bg-white">
      <h2 className="mb-10 text-center font-display text-3xl font-bold text-brand-navy md:text-4xl">
        <Fr>{"Decouvrez le Rein Padel Tour"}</Fr>
      </h2>

      <div className="mx-auto max-w-3xl aspect-video">
        <iframe
          src="https://www.youtube.com/embed/8Yl50pd5FhI"
          title="Decouvrez le Rein Padel Tour"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full rounded-xl"
        />
      </div>
    </SectionWrapper>
  )
}
