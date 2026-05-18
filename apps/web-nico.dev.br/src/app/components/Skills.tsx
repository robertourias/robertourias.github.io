"use client";

import { useTranslations } from "next-intl";

export default function Skills() {
  const t = useTranslations("skills");
  const items = t.raw("items") as Array<{ title: string; description: string }>;

  return (
    <section id="skills" className="py-20 md:py-24 px-6 md:px-8 bg-surface" aria-labelledby="skills-title">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-12 md:mb-16 space-y-4">
          <h2 id="skills-title" className="font-display text-3xl md:text-5xl font-bold text-on-surface tracking-tighter">
            {t("title")}
          </h2>
          <p className="text-on-surface-variant text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((skill, index) => (
            <article
              key={index}
              className="p-6 md:p-8 bg-surface-container-low rounded-2xl border border-outline-variant/10"
            >
              <h3 className="font-display font-bold text-primary mb-3 md:mb-4 uppercase text-xs tracking-widest">
                {skill.title}
              </h3>
              <p className="text-on-surface font-medium leading-relaxed">
                {skill.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
