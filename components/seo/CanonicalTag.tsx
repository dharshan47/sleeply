'use client';
import { usePathname } from "next/navigation";

export default function CanonicalTag() {
  const pathname = usePathname();
  const canonicalUrl = `https://sleeply.vercel.app${pathname}`;
  return <link rel="canonical" href={canonicalUrl} />;
}
