"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { SiteImage } from "@/data/images";

export function Gallery({ images, title }: { images: SiteImage[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index !== null ? images[index] : null;

  return (
    <>
      <ul className="grid auto-rows-[9rem] grid-cols-2 gap-2.5 sm:auto-rows-[12rem] sm:gap-3 lg:auto-rows-[13.5rem] lg:grid-cols-3">
        {images.map((image, i) => (
          <li
            key={image.src}
            className={
              i === 0
                ? "col-span-2 row-span-2"
                : i === images.length - 1 && images.length % 2 === 0
                  ? "col-span-2 lg:col-span-1"
                  : ""
            }
          >
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block h-full w-full overflow-hidden rounded-lg bg-sand"
              aria-label={`View larger: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${title} photo gallery`}
        className="m-auto h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/90"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current && index !== null && (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 sm:p-10" onClick={(e) => e.target === e.currentTarget && close()}>
            <figure className="relative flex max-h-full w-full max-w-6xl flex-col items-center">
              <div className="relative h-[72vh] w-full">
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              </div>
              <figcaption className="mt-4 text-center text-sm text-white/80">
                {current.alt}
                <span className="block text-xs text-white/50">
                  Photo: {current.credit} / Unsplash · {index + 1} of {images.length}
                </span>
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/25 hover:bg-black/75"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/25 hover:bg-black/75"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/25 hover:bg-black/75"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
