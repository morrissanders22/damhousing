import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "Woningaanbod",
    description: "Beheer en toon beschikbare woningen op één plek.",
  },
  {
    title: "Verhuur",
    description: "Stroomlijn aanvragen, contracten en huurders.",
  },
  {
    title: "Beheer",
    description: "Overzicht van onderhoud, betalingen en communicatie.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 py-24 text-center">
        <Badge variant="secondary">Next.js · React · Tailwind · shadcn/ui</Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Damhousing
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          De basis staat klaar. Begin met bouwen door deze pagina te bewerken in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            src/app/page.tsx
          </code>
          .
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" render={<Link href="/" />}>
            Aan de slag
          </Button>
          <Button
            variant="outline"
            size="lg"
            render={
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Documentatie
          </Button>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-6 px-6 pb-24 sm:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Klaar om in te vullen.
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
