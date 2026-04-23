export function PillarIcon({ name }: { name: string }) {
  const s = { width: 30, height: 30 } as const;
  switch (name) {
    case "gut":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 4C9.5 4 8 6.5 8 9c0 2 1 3.5 2 4.5V19c0 1 .8 2 2 2s2-1 2-2v-5.5c1-1 2-2.5 2-4.5 0-2.5-1.5-5-4-5Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "immunity":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3 5 6v6c0 5 3.5 9 7 10 3.5-1 7-5 7-10V6l-7-3Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "energy":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M8 11c2-3 5-5 8-6-1 3-1 6 0 9-3-1-6-1-8-3Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "brain":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9.5 4C8 4 6.5 5 6 6.5 5 8 5.5 9.5 7 10c-1 .5-1.5 2-1.5 3.5.5 2 2 3.5 4 3.5h2c2 0 3.5-1.5 4-3.5 0-1.5-.5-3-1.5-3.5 1.5-.5 2-2 2-3.5C14 5 12.5 4 11 4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}
