import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
      <div className="inline-block border-3 border-brut bg-punch text-cream px-8 py-6 shadow-brut-lg rotate-[-2deg] mb-10">
        <p className="font-display text-7xl sm:text-9xl leading-none">404</p>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl mb-4">
        This page went off the grid.
      </h1>
      <p className="opacity-80 mb-8 max-w-md mx-auto">
        Whatever you were looking for isn't here. It might've been a typo, a
        deleted post, or a link that never existed.
      </p>
      <Link href="/" className="btn-brut">
        Back to home
      </Link>
    </div>
  );
}
