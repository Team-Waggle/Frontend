import React, { useEffect, useState } from 'react';
import { getSkillIcon } from '../utils/getSkillIcon';

interface SkillIconsProps {
  iconKeys: string[];
  size: 'small' | 'large';
}

const SkillIcons = ({ iconKeys, size }: SkillIconsProps) => {
  const [iconComponents, setIconComponents] = useState<
    React.FC<React.SVGProps<SVGSVGElement>>[]
  >([]);

  useEffect(() => {
    let isMounted = true;

    Promise.all(iconKeys.map((key) => getSkillIcon(key, size))).then(
      (components) => {
        if (!isMounted) return;
        setIconComponents(
          components.filter(
            (component): component is React.FC<React.SVGProps<SVGSVGElement>> =>
              component !== null,
          ),
        );
      },
    );

    return () => {
      isMounted = false;
    };
  }, [iconKeys, size]);

  if (iconComponents.length === 0) return null;

  return (
    <>
      {iconComponents.map((Icon, idx) => (
        <Icon key={idx} />
      ))}
    </>
  );
};

export default SkillIcons;
