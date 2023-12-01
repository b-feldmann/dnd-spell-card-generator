"use client";

import { Button } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SelectHeroButton({ heroName }: { heroName: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectHero = () => {
    const current = new URLSearchParams(searchParams);

    current.set("hero", heroName);

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <Button type="primary" className="w-full !text-left" onClick={selectHero}>
      {heroName}
    </Button>
  );
}
