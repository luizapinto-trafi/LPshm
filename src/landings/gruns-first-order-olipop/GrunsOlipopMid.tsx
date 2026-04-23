import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import { GrunsOlipopGallery } from "./grunsOlipopCdn";
import { PillarIcon } from "./PillarIcon";

export const GrunsOlipopMid = () => {
  const { t } = useTranslation("grunsOlipop");
  const pillars = t("taste.pillars", { returnObjects: true }) as Array<{
    title: string;
    body: string;
    icon: string;
  }>;
  const [gut, immunity, energy, brain] = pillars;
  const collabSrc = GrunsOlipopGallery[0]!;

  return (
    <>
      <section
        className="bg-coral-100 py-12 pl-4 pr-4 sm:pl-6 sm:pr-6 md:py-20 md:pl-6 md:pr-6"
        aria-labelledby="olipop-taste-heading"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 max-w-3xl text-center sm:mb-10 md:mb-14">
            <h2
              id="olipop-taste-heading"
              className="mb-3 font-display text-2xl font-bold leading-tight tracking-tight text-ink-1000 sm:text-3xl md:mb-4 md:text-4xl"
            >
              {t("taste.title")}
            </h2>
            <p className="mx-auto max-w-2xl font-body text-base text-ink-900 sm:text-lg">
              {t("taste.leadBefore")}
              <mark className="bg-[rgba(41,41,41,0.08)] font-inherit text-inherit">
                {t("taste.leadMark")}
              </mark>
              {t("taste.leadAfter")}
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch lg:gap-4 xl:gap-8">
            <div className="flex w-full max-w-sm flex-1 flex-col items-center justify-center gap-8 sm:max-w-md md:max-w-none md:flex-row md:justify-center lg:max-w-[30%] lg:flex-col">
              <div className="mx-auto max-w-64 text-center sm:mb-0 lg:mx-0">
                <div className="mb-2 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white text-ink-1000 shadow-[2px_2px_0_0_var(--ink-1000)] sm:mb-2">
                  <PillarIcon name={gut.icon} />
                </div>
                <h3 className="text-base font-bold text-ink-1000 sm:text-base">{gut.title}</h3>
                <p className="mt-1.5 text-sm text-ink-700">{gut.body}</p>
              </div>
              <div className="mx-auto max-w-64 text-center sm:mb-0 lg:mx-0">
                <div className="mb-2 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white text-ink-1000 shadow-[2px_2px_0_0_var(--ink-1000)]">
                  <PillarIcon name={energy.icon} />
                </div>
                <h3 className="text-base font-bold text-ink-1000">{energy.title}</h3>
                <p className="mt-1.5 text-sm text-ink-700">{energy.body}</p>
              </div>
            </div>

            <div className="order-first relative flex w-full min-w-0 max-w-sm shrink-0 items-center justify-center self-center sm:max-w-xs md:max-w-sm md:shrink-0 md:pt-0 lg:order-0 lg:max-w-sm lg:px-2">
              <div
                className="relative w-full"
                style={{ maxHeight: 420, aspectRatio: "4/5" }}
              >
                <Image
                  src={collabSrc}
                  alt={t("taste.collabImageAlt")}
                  fill
                  sizes="(max-width: 1024px) 85vw, 360px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="flex w-full max-w-sm flex-1 flex-col items-center justify-center gap-8 sm:max-w-md md:max-w-none md:flex-row md:justify-center lg:max-w-[30%] lg:flex-col">
              <div className="mx-auto max-w-64 text-center lg:mx-0">
                <div className="mb-2 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white text-ink-1000 shadow-[2px_2px_0_0_var(--ink-1000)]">
                  <PillarIcon name={immunity.icon} />
                </div>
                <h3 className="text-base font-bold text-ink-1000">{immunity.title}</h3>
                <p className="mt-1.5 text-sm text-ink-700">{immunity.body}</p>
              </div>
              <div className="mx-auto max-w-64 text-center lg:mx-0">
                <div className="mb-2 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white text-ink-1000 shadow-[2px_2px_0_0_var(--ink-1000)]">
                  <PillarIcon name={brain.icon} />
                </div>
                <h3 className="text-base font-bold text-ink-1000">{brain.title}</h3>
                <p className="mt-1.5 text-sm text-ink-700">{brain.body}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex w-full justify-center sm:mt-10 md:mt-12">
            <a
              href="#offers"
              className="font-display text-base font-semibold text-gruns-primary no-underline hover:underline"
            >
              {t("taste.cta")}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 pl-4 pr-4 sm:pl-6 sm:pr-6 md:py-20 md:pl-8 md:pr-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2
            className="mb-3 scroll-m-20 text-center font-display text-2xl font-bold text-gruns-dark sm:mb-4 sm:text-3xl"
            id="gut-couple"
          >
            {t("story.title")}
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-center text-[17px] leading-relaxed text-gruns-gray md:mb-10">
            {t("story.body")}
          </p>
          <div className="mb-3 flex flex-col items-stretch text-left sm:items-start">
            <p className="mb-2 inline-block self-start rounded-full bg-coral-100 px-3 py-1.5 text-[13px] font-semibold text-ink-900">
              {t("story.badge")}
            </p>
            <h3 className="font-display text-lg font-bold text-gruns-dark sm:text-2xl">
              {t("story.offerTitle")}
            </h3>
          </div>
          <div
            className="flex w-full max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
            style={{ WebkitOverflowScrolling: "touch" }}
            aria-label="Product gallery"
          >
            {GrunsOlipopGallery.map((src, i) => (
              <div
                className="relative h-52 w-[min(17rem,80vw)] shrink-0 snap-start"
                key={i}
              >
                <div className="h-full w-full min-h-44 overflow-hidden rounded-2xl border border-ink-200 bg-ink-50">
                  <Image
                    src={src}
                    alt=""
                    width={300}
                    height={225}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 80vw, 300px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
