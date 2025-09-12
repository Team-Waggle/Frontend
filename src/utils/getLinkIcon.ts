const linkIconCache = new Map<string, React.FC<React.SVGProps<SVGSVGElement>>>();

export const getLinkIcon = async (
  iconKey: string,
  size: 'small' | 'medium' | 'large'
): Promise<React.FC<React.SVGProps<SVGSVGElement>> | null> => {
  const normalizedKey = iconKey.toLowerCase();

  if (linkIconCache.has(normalizedKey)) {
    return linkIconCache.get(normalizedKey)!;
  }

  try {
    const module = await import(
      `../assets/icons/link/${size}/ic_link_${normalizedKey}_${size}.svg?react`
    );
    const Component = module.default;
    linkIconCache.set(normalizedKey, Component);
    return Component;
  } catch (error) {
    console.error(`Error loading link icon for key "${normalizedKey}":`, error);
    return null;
  }
};
