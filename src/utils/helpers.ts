export function getAvatarSrc(name: string): string {
  const baseUrl = "https://ui-avatars.com/api/";
  const params = new URLSearchParams({
    name,
    background: "2563EB",
    color: "ffffff",
    bold: "true",
  });
  return `${baseUrl}?${params.toString()}`;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
