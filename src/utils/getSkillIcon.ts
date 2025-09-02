const iconCache = new Map<string, React.FC<React.SVGProps<SVGSVGElement>>>();

export const getSkillIcon = async (
  iconKey: string,
  size: 'small' | 'large',
): Promise<React.FC<React.SVGProps<SVGSVGElement>> | null> => {
  const normalizedKey =
    iconKey === 'C++' ? 'Cpp' : iconKey === 'C#' ? 'Csharp' : iconKey;

  if (iconCache.has(normalizedKey)) {
    return iconCache.get(normalizedKey)!;
  }

  try {
    const module = await import(
      `../assets/icons/skill/${size}/ic_skill_${normalizedKey}_${size}.svg?react`
    );
    const Component = module.default;
    iconCache.set(normalizedKey, Component);
    return Component;
  } catch (error) {
    console.error(`Error loading icon for key "${normalizedKey}":`, error);
    return null;
  }
};
