import Link from "next/link";

import ImpactItemCard from "@/components/ImpactItemCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ImpactItemsPage() {
  const items = await prisma.impactItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-300">
            Decision register
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Impact Items
          </h1>

          <p className="mt-2 text-slate-400">
            Review, update, and manage sustainability-related decisions.
          </p>
        </div>

        <Link
          href="/impact-items/new"
          className="rounded-md bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
        >
          + Add impact item
        </Link>
      </div>

      {items.length === 0 ? (
        <section className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">
          <h2 className="text-lg font-semibold text-white">
            No impact items yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
            Add your first sustainability-related engineering decision to begin
            tracking its expected impact.
          </p>

          <Link
            href="/impact-items/new"
            className="mt-6 inline-block rounded-md bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Create first item
          </Link>
        </section>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <ImpactItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}