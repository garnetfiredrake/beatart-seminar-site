import { lazy, Suspense, useEffect, useState } from "react";

export const SPLINE_HERO_SCENE_URL = "https://prod.spline.design/PjgpD9hHdnjTeTwJ/scene.splinecode";

const Spline = lazy(() => import("@splinetool/react-spline"));

type SplineHeroProps = {
  className?: string;
  sceneUrl?: string;
};

function useShouldRenderSpline() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const updateShouldRender = () => setShouldRender(mediaQuery.matches);

    updateShouldRender();
    mediaQuery.addEventListener("change", updateShouldRender);

    return () => {
      mediaQuery.removeEventListener("change", updateShouldRender);
    };
  }, []);

  return shouldRender;
}

export function SplineHero({ className = "", sceneUrl = SPLINE_HERO_SCENE_URL }: SplineHeroProps) {
  const shouldRenderSpline = useShouldRenderSpline();

  return (
    <div className={`spline-hero pointer-events-none absolute inset-0 hidden overflow-hidden bg-ink sm:block ${className}`} aria-hidden="true">
      {shouldRenderSpline ? (
        <Suspense fallback={null}>
          <Spline scene={sceneUrl} className="h-full w-full" />
        </Suspense>
      ) : null}
    </div>
  );
}
