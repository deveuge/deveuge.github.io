export interface Metric {
  value: string
  label: string
  detail: string
}

export const metrics: Metric[] = [
  {
    value: "9",
    label: "hospitals live",
    detail: "On a platform that replaced a legacy distributed desktop system, plus testing work preparing a further rollout.",
  },
  {
    value: "1M+",
    label: "operations / month",
    detail: "Processed per healthcare area in production, across cases, invoices, episodes and approval workflows.",
  },
  {
    value: "80%",
    label: "faster critical processes",
    detail: "Performance gains of 30%–80% through code, architecture and data-access optimizations.",
  },
  {
    value: "1,000+",
    label: "SonarQube issues resolved",
    detail: "Alongside raising automated test coverage above internal standards.",
  },
  {
    value: "7",
    label: "production migrations",
    detail: "Legacy Informix systems migrated live into the new platform through automated SQL scripts.",
  },
  {
    value: "5",
    label: "engineers led",
    detail: "Technical leadership for cross-functional teams, plus mentoring juniors and interns.",
  },
]
