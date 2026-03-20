export function buildProjectUrl(projectSlug: string): string {
  return `/${projectSlug}/`;
}

export function buildDocUrl(projectSlug: string, docSlug: string): string {
  return `/${projectSlug}/${docSlug}/`;
}

export function formatDate(value?: string | number | Date | null): string {
  if (!value) {
    return "未知";
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

export function prettifySlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function labelStatus(status?: string | null): string {
  if (!status) {
    return "Unknown";
  }

  const normalized = status.toLowerCase();
  const labels: Record<string, string> = {
    finalized: "Finalized",
    draft: "Draft",
    review: "In Review",
    reviewing: "In Review",
    published: "Published"
  };

  return labels[normalized] ?? status;
}
