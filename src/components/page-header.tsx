import { cn } from "@/lib/utils";

export function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "flex flex-col gap-2 mb-8",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function PageHeaderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold tracking-tight font-headline sm:text-4xl bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent",
        className
      )}
      {...props}
    />
  );
}

export function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-muted-foreground text-lg", className)}
      {...props}
    />
  );
}
