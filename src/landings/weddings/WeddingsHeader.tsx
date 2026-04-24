import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import { WeddingsCdn } from "./weddingsCdn";
import { ChevronDownIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "./WeddingIcons";

type NavItem = { label: string; href: string; kind: "menu" | "sale" };

export const WeddingsHeader = () => {
  const { t } = useTranslation("weddings");
  const nav = t("header.nav", { returnObjects: true }) as NavItem[];

  return (
    <header className="relative z-20 box-border flex w-full max-w-[1920px] flex-col border-b border-ink-200 bg-white transition-all duration-300 lg:static lg:border-none">
      <div className="mt-2 flex flex-row items-center justify-center lg:mx-[-10px]">
        <div className="hidden min-w-[190px] pt-3 lg:block">
          <a
            className="px-3 font-body text-[13px] capitalize text-ink-900 transition-colors hover:text-coral-500"
            href="https://shapermint.com/blogs/shapermint-blog"
          >
            {t("header.blog")}
          </a>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="mx-4 box-border flex min-h-8 max-h-8 w-full max-w-[796px] items-center justify-center rounded-full bg-coral-500 px-2 text-xs font-medium tracking-wide text-white md:px-6">
            {t("header.promo")}
          </div>
        </div>
        <div className="hidden min-w-[190px] items-center justify-end pt-3 lg:flex">
          <span className="flex h-[15px] items-center font-body text-[11px] text-ink-600">
            {t("header.countryLine")}{" "}
            <button
              type="button"
              className="ml-1 underline transition-colors hover:text-coral-500"
            >
              {t("header.countryCta")}
            </button>
          </span>
        </div>
      </div>

      <div className="relative flex h-[51px] flex-row items-center justify-between bg-white py-2 lg:h-auto lg:py-4">
        <div className="flex items-center">
          <div className="flex pl-1 lg:hidden">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-coral-100"
              aria-label={t("a11y.openMenu")}
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="hidden min-w-[203px] md:block">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-coral-100"
              aria-label={t("a11y.search")}
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="absolute left-1/2 flex flex-1 -translate-x-1/2 justify-center lg:static lg:translate-x-0">
          <a
            href="https://shapermint.com"
            className="inline-block max-w-[120px] leading-none lg:max-w-[200px]"
            aria-label={t("a11y.logoHome")}
          >
            <Image
              src={WeddingsCdn.logoHeader}
              alt=""
              width={200}
              height={40}
              className="h-auto w-full"
              priority
            />
          </a>
        </div>

        <div className="flex min-w-[74px] flex-row items-center justify-end gap-1 lg:min-w-[211px] lg:gap-2">
          <a
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-coral-100 lg:flex"
            href="https://shapermint.com/account"
            aria-label={t("a11y.account")}
          >
            <UserIcon className="h-6 w-6" />
          </a>
          <a
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-coral-100"
            href="https://shapermint.com"
            aria-label={t("a11y.favorites")}
          >
            <HeartIcon className="h-6 w-6" />
          </a>
          <a
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-coral-100"
            href="https://shapermint.com/cart"
            aria-label={t("a11y.cart")}
          >
            <Image src={WeddingsCdn.bagIcon} alt="" width={24} height={24} />
            <span className="absolute -right-1 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border border-ink-1000 bg-gold-500 px-1 text-[10px] font-bold text-ink-1000">
              0
            </span>
          </a>
        </div>
      </div>

      <nav
        className="mt-2 hidden w-full flex-row flex-wrap items-center justify-center gap-4 pb-4 text-sm lg:flex"
        aria-label="Main"
      >
        {nav.map((item) =>
          item.kind === "sale" ? (
            <a
              key={item.label}
              href={item.href}
              className="text-coral-600 transition-colors hover:text-coral-500"
            >
              {item.label}
            </a>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-1 font-mono uppercase tracking-wide text-ink-900 transition-colors hover:text-coral-500"
            >
              {item.label}
              <ChevronDownIcon className="text-ink-700" />
            </a>
          )
        )}
      </nav>

      <div className="flex w-full justify-center px-2 py-3 lg:hidden">
        <button
          type="button"
          className="flex h-10 w-full max-w-2xl items-center rounded-full border border-ink-200 bg-ink-050 px-4 text-ink-500"
          aria-label={t("a11y.search")}
        >
          <SearchIcon className="mr-2 h-4 w-4 shrink-0" />
          <span className="text-left text-sm font-body">{t("header.searchPlaceholder")}</span>
        </button>
      </div>
    </header>
  );
};
