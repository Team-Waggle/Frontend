const iconCache = new Map<string, React.FC<React.SVGProps<SVGSVGElement>>>();

export const getSkillIcon = async (
  iconKey: string
): Promise<React.FC<React.SVGProps<SVGSVGElement>> | null> => {
  if (iconCache.has(iconKey)) {
    return iconCache.get(iconKey)!;
  }

  try {
    const module = await import(
      `../assets/icons/skill/small/ic_skill_${iconKey}_small.svg?react`
    );
    const Component = module.default;
    iconCache.set(iconKey, Component);
    return Component;
  } catch (e) {
    return null;
  }
};
