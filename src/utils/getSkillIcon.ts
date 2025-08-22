const iconCache = new Map<string, React.FC<React.SVGProps<SVGSVGElement>>>();

export const getSkillIcon = async (
  iconKey: string,
  size: 'small' | 'large',
): Promise<React.FC<React.SVGProps<SVGSVGElement>> | null> => {
  if (iconCache.has(iconKey)) {
    return iconCache.get(iconKey)!;
  }

  try {
    const module = await import(
      `../assets/icons/skill/${size}/ic_skill_${iconKey}_${size}.svg?react`
    );
    const Component = module.default;
    iconCache.set(iconKey, Component);
    return Component;
  } catch (error) {
    console.error(`Error loading icon for key "${iconKey}":`, error);
    return null;
  }
};
