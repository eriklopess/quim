/* eslint-disable @typescript-eslint/no-explicit-any */
// Quim Design System — single-file drop-in (React + Tailwind + lucide-react optional)
// -----------------------------------------------------------------------------
// How to use:
// 1) Drop this file anywhere in your Next.js app, e.g., `src/ui/design-system.tsx`.
// 2) Import components/tokens: `import { Button, Card, Section, tokens } from "@/ui/design-system"`.
// 3) Tailwind required. No Tailwind config changes are mandatory; classes are embedded.
// 4) Optional: add the keyframes in your globals.css (provided at end as a snippet comment).
// -----------------------------------------------------------------------------

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Star } from "lucide-react";
import { JSX } from "react/jsx-dev-runtime";

/* =========================================
   TOKENS
========================================= */
export const tokens = {
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    pill: "9999px",
  },
  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  },
  // Brand palette — tune freely
  color: {
    bg: {
      base: "#F7F7F9", // page background
      surface: "#FFFFFF",
      muted: "#F2F3F5",
    },
    ink: {
      DEFAULT: "#14151A",
      soft: "#353843",
      mute: "#707585",
    },
    brand: {
      50: "#FFF7ED",
      100: "#FFEAD5",
      200: "#FED7AA",
      300: "#FDBA74",
      400: "#FB923C",
      500: "#F97316", // primary
      600: "#EA580C",
      700: "#C2410C",
      800: "#9A3412",
      900: "#7C2D12",
    },
    accent: {
      green: "#10B981",
      yellow: "#FACC15",
      red: "#EF4444",
      blue: "#3B82F6",
    },
  },
  spacing: {
    sectionY: "py-20 md:py-24",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  },
};
    
/* =========================================
   UTILS
========================================= */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* =========================================
   TYPOGRAPHY
========================================= */
export const Heading: React.FC<{ as?: keyof JSX.IntrinsicElements; className?: string; children: React.ReactNode }>
= ({ as = "h2", className, children }) => {
  const Comp: any = as;
  return (
    <Comp className={cn("font-extrabold tracking-tight text-3xl md:text-4xl text-[#14151A]", className)}>
      {children}
    </Comp>
  );
};

export const Subheading: React.FC<React.ComponentProps<"p">> = ({ className, ...props }) => (
  <p className={cn("text-lg md:text-xl text-[#707585] leading-relaxed", className)} {...props} />
);

export const Text: React.FC<React.ComponentProps<"p">> = ({ className, ...props }) => (
  <p className={cn("text-base text-[#353843] leading-relaxed", className)} {...props} />
);

/* =========================================
   LAYOUT BASICS
========================================= */
export const Container: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={cn(tokens.spacing.container, className)} {...props} />
);

export const Section: React.FC<{ tone?: "white" | "base" | "muted"; className?: string; children: React.ReactNode }>
= ({ tone = "white", className, children }) => {
  const bg = {
    white: tokens.color.bg.surface,
    base: tokens.color.bg.base,
    muted: tokens.color.bg.muted,
  }[tone];
  return (
    <section className={cn(tokens.spacing.sectionY, className)} style={{ backgroundColor: bg }}>
      <Container>{children}</Container>
    </section>
  );
};

/* =========================================
   BUTTONS
========================================= */
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, variant = "primary", size = "md", ...props }, ref) => {
    const Comp: any = asChild ? Slot : "button";

    const base = cn(
      "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "active:scale-[0.98]",
      "rounded-2xl",
    );

    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      primary: cn(
        "text-white",
        "bg-[#F97316] hover:bg-[#EA580C]",
        "focus-visible:ring-[#FDBA74] ring-offset-white",
        tokens.shadow.lg
      ),
      secondary: cn(
        "text-[#14151A] bg-white/90 hover:bg-white",
        "border border-black/5 backdrop-blur",
        "focus-visible:ring-black/20 ring-offset-white",
        tokens.shadow.md
      ),
      outline: cn(
        "text-[#14151A] bg-transparent",
        "border border-black/10 hover:border-black/20",
        "focus-visible:ring-black/20 ring-offset-white"
      ),
      ghost: cn(
        "text-[#14151A] bg-transparent hover:bg-black/[0.04]",
        "focus-visible:ring-black/10 ring-offset-white"
      ),
    };

    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-5 text-base",
      lg: "h-12 px-6 text-base",
    };

    return (
      <Comp ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
    );
  }
);
Button.displayName = "Button";

export const IconButton: React.FC<React.ComponentProps<typeof Button>> = ({ className, ...props }) => (
  <Button className={cn("aspect-square p-0 w-12 h-10", className)} {...props} />
);

/* =========================================
   CARD
========================================= */
export const Card: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div
    className={cn(
      "bg-white rounded-3xl border border-black/5",
      tokens.shadow.lg,
      "transition-all duration-300 hover:shadow-xl ",
      className
    )}
    {...props}
  />
);

export const CardHeader: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={cn("p-6 pb-3", className)} {...props} />
);
export const CardContent: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={cn("px-6 pb-6", className)} {...props} />
);
export const CardFooter: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={cn("px-6 pb-6 pt-0", className)} {...props} />
);

/* =========================================
   BADGE / CHIP
========================================= */
export const Badge: React.FC<{ tone?: "brand" | "ink" | "success" | "danger" | "warning"; children: React.ReactNode; className?: string }>
= ({ tone = "brand", children, className }) => {
  const tones = {
    brand: "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",
    ink: "bg-black/5 text-[#14151A] border-black/10",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  } as const;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium", tones[tone], className)}>
      {children}
    </span>
  );
};

export const Chip: React.FC<React.ComponentProps<"button"> & { selected?: boolean }>
= ({ selected, className, ...props }) => (
  <button
    className={cn(
      "px-3 h-9 rounded-full text-sm border transition-colors",
      selected
        ? "bg-[#14151A] text-white border-transparent"
        : "bg-white text-[#353843] border-black/10 hover:bg-black/[0.04]",
      className
    )}
    {...props}
  />
);

/* =========================================
   FORMS
========================================= */
export const Label: React.FC<React.ComponentProps<"label">> = ({ className, ...props }) => (
  <label className={cn("block text-sm font-medium text-[#353843] mb-1", className)} {...props} />
);

const baseInput =
  "w-full h-11 rounded-xl border border-black/10 bg-white px-3 text-[15px] text-[#14151A] placeholder:text-[#707585] focus:outline-none focus:ring-2 focus:ring-[#FDBA74] transition";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input className={cn(baseInput, className)} {...props} />
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className, ...props }) => (
  <textarea className={cn(baseInput, "h-auto min-h-[120px] py-2", className)} {...props} />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className, children, ...props }) => (
  <select className={cn(baseInput, className)} {...props}>
    {children}
  </select>
);

/* =========================================
   RATING + SKELETON + DIVIDER
========================================= */
export const StarRating: React.FC<{ value: number; outOf?: number; className?: string }>
= ({ value, outOf = 5, className }) => (
  <div className={cn("flex items-center gap-1", className)}>
    {Array.from({ length: outOf }).map((_, i) => (
      <Star key={i} className={cn("w-5 h-5", i < value ? "text-yellow-400 fill-yellow-400" : "text-black/20")}/>
    ))}
  </div>
);

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("animate-pulse rounded-xl bg-black/10", className)} />
);

export const Divider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("h-px w-full bg-black/10", className)} />
);

/* =========================================
   MEDIA WRAPPER (hover zoom)
========================================= */
export const Media: React.FC<{
  src: string;
  alt: string;
  aspect?: "square" | "video" | "golden"; // 1/1, 16/9, 4/3
  className?: string;
}>
= ({ src, alt, aspect = "golden", className }) => {
  const aspectCls = {
    square: "aspect-square",
    video: "aspect-video",
    golden: "aspect-[4/3]",
  }[aspect];
  return (
    <div className={cn("relative overflow-hidden rounded-2xl group", aspectCls, className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
  );
};

/* =========================================
   GRID HELPERS
========================================= */
export const GridAuto: React.FC<{ className?: string; children: React.ReactNode }>
= ({ className, children }) => (
  <div className={cn("grid grid-cols- sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8", className)}>{children}</div>
);

/* =========================================
   COMPOSED EXAMPLES
========================================= */
export const SectionHeader: React.FC<{ title: string; subtitle?: string; center?: boolean; className?: string }>
= ({ title, subtitle, center = true, className }) => (
  <div className={cn("mb-12", center && "text-center", className)}>
    <Heading className="mb-3">{title}</Heading>
    {subtitle && <Subheading className={cn(center && "mx-auto max-w-2xl")}>{subtitle}</Subheading>}
  </div>
);

export const TestimonialCard: React.FC<{ name: string; text: string; rating?: number }>
= ({ name, text, rating = 5 }) => (
  <Card className="p-6">
    <StarRating value={rating} className="mb-3" />
    <Text className="italic text-[#353843] mb-3">{text}</Text>
    <p className="font-semibold text-[#14151A]">— {name}</p>
  </Card>
);

/* =========================================
   CTA BLOCK
========================================= */
export const CtaBlock: React.FC<{ title: string; text?: string; primary?: React.ReactNode; secondary?: React.ReactNode }>
= ({ title, text, primary, secondary }) => (
  <Card className="p-8 md:p-10 bg-gradient-to-br from-white to-[#FFF7ED]">
    <Heading className="mb-2">{title}</Heading>
    {text && <Subheading className="mb-6">{text}</Subheading>}
    <div className="flex flex-wrap items-center gap-3">
      {primary}
      {secondary}
    </div>
  </Card>
);

/* =========================================
   EXAMPLE USAGE (copy into any page)
========================================= */
export function ExamplePageSnippet() {
  return (
    <>
      <Section tone="white">
        <SectionHeader
          title="Destaques do Chef"
          subtitle="Pratos especiais criados com ingredientes selecionados e técnicas refinadas"
        />
        <GridAuto>
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <Media src={`https://picsum.photos/600/400?random=${i+1}`} alt="Prato" />
              <CardHeader>
                <Heading as="h3" className="text-2xl">Rigatoni ao Ragu de Cupim</Heading>
                <Subheading className="text-base">12h de cocção lenta, finalizado com gremolata da casa</Subheading>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge>Chef</Badge>
                  <Text className="font-semibold">R$ 79</Text>
                </div>
              </CardContent>
            </Card>
          ))}
        </GridAuto>
      </Section>

      <Section tone="base">
        <CtaBlock
          title="Reserve sua mesa"
          text="Garanta seu lugar e viva uma experiência gastronômica inesquecível."
          primary={<Button>Fazer Reserva</Button>}
          secondary={<Button variant="outline">Ver Cardápio</Button>}
        />
      </Section>

      <Section tone="white">
        <SectionHeader title="O que dizem nossos clientes" />
        <GridAuto>
          <TestimonialCard name="Maria Silva" text="Uma experiência gastronômica única! O rigatoni ao ragu de cupim estava perfeito." />
          <TestimonialCard name="João Santos" text="Ambiente aconchegante e pratos incríveis. O atendimento é impecável!" />
          <TestimonialCard name="Ana Costa" text="O melhor bistrô da cidade! Sempre volto para experimentar as novidades do chef." />
        </GridAuto>
      </Section>
    </>
  );
}

/* =========================================
   OPTIONAL — globals.css snippets (paste in your CSS file)
========================================= */
/*
:root {
  --ring: #FDBA74;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in { animation: fade-in 500ms ease-out both; }
*/
