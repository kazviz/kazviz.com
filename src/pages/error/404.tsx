import Nebula from "~/components/page/Nebula"

export default function NotFoundPage() {
  return (
    <Nebula theme="ruby">
      <div style="text-align: center; padding: 2rem; max-width: 600px; margin: 0 auto;">
        <h1 style="font-size: 4rem; margin: 0; color: var(--cl-ruby);">404</h1>
        <h2 style="font-size: 1.5rem; margin: 1rem 0; color: var(--cl-4);">
          Page Not Found
        </h2>
        <p style="color: var(--cl-2); margin: 1rem 0; line-height: 1.6;">
          The page you are looking for does not exist or has been moved.
        </p>
        <div style="margin-top: 2rem;">
          <a
            href="/"
            style="display: inline-block; padding: 0.75rem 1.5rem; background: var(--cl-0); color: var(--cl-f); text-decoration: none; border-radius: 6px; font-weight: 600; transition: all 0.2s ease; cursor: pointer;"
            onMouseOver={(e) =>
              ((e.target as HTMLElement).style.transform = "translateY(-2px)")
            }
            onMouseOut={(e) =>
              ((e.target as HTMLElement).style.transform = "translateY(0)")
            }>
            ← Go to Home
          </a>
        </div>
        <div style="margin-top: 2rem; font-size: 0.9rem; color: var(--cl-1); opacity: 0.7;">
          Error Code: 404 - Resource Not Found
        </div>
      </div>
    </Nebula>
  )
}
