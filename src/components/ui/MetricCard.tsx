import { Card, CardContent, CardHeader, CardTitle } from "./Card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  className = "",
}: MetricCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="tabular-nums text-2xl font-semibold text-[var(--foreground)]">
          {value}
        </p>
        {(subtitle || trend) && (
          <p
            className={`mt-1 text-sm ${
              trend === "up"
                ? "text-emerald-600"
                : trend === "down"
                  ? "text-red-600"
                  : "text-[var(--muted-foreground)]"
            }`}
          >
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
