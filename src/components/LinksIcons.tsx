import React, { useEffect, useState } from 'react';
import { getLinkIcon } from '../utils/getLinkIcon';
import MeatBallIcon from '../assets/icons/skill/small/ic_skill_meatball_small.svg?react';

interface LinkIconsProps {
  iconKeys: string[];
  size: 'small' | 'medium' | 'large';
  limit?: number | null;
}

export const LinkIcons = ({ iconKeys, size, limit = 10 }: LinkIconsProps) => {
  const [iconComponents, setIconComponents] = useState<
    React.FC<React.SVGProps<SVGSVGElement>>[]
  >([]);

  useEffect(() => {
    let isMounted = true;

    const keysToLoad = limit !== null ? iconKeys.slice(0, limit) : iconKeys;

    Promise.all(keysToLoad.map((key) => getLinkIcon(key, size))).then(
      (components) => {
        if (!isMounted) return;
        setIconComponents(
          components.filter(
            (component): component is React.FC<React.SVGProps<SVGSVGElement>> =>
              component !== null
          )
        );
      }
    );

    return () => {
      isMounted = false;
    };
  }, [iconKeys, size, limit]);

  if (iconComponents.length === 0) return null;

  return (
    <>
      {iconComponents.map((Icon, idx) => (
        <Icon key={idx} />
      ))}
      {limit !== null && iconKeys.length > limit && <MeatBallIcon />}
    </>
  );
};

export default LinkIcons;