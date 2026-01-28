import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;
  const primaryTag = tags?.[0];

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-xl font-semibold text-skin-base",
  };

  return (
    <li className="h-full">
      <a
        href={href}
        className="group flex h-full flex-col justify-between rounded-3xl border border-skin-line bg-skin-fill p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(249,115,22,0.18)] focus-visible:no-underline"
      >
        <div className="flex flex-col gap-3">
          {primaryTag && (
            <span className="inline-flex w-fit rounded-full bg-orange-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-orange-600">
              {primaryTag}
            </span>
          )}
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
          <p className="text-sm text-skin-base/70">{description}</p>
        </div>
        <div className="mt-6 flex items-center justify-between text-xs font-semibold text-skin-base/60">
          <Datetime
            pubDatetime={pubDatetime}
            modDatetime={modDatetime}
            size="sm"
          />
          <span className="inline-flex items-center gap-1 text-skin-accent">
            Read
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </a>
    </li>
  );
}
