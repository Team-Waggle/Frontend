import React, { useEffect, useState } from 'react';
import { getSkillIcon } from '../utils/getSkillIcon';
import MeatBallIcon from '../assets/icons/skill/large/ic_skill_meatball_large.svg?react';

interface SkillIconsProps {
  iconKeys: string[];
  size: 'small' | 'large';
}

export const SkillIcons = ({ iconKeys, size }: SkillIconsProps) => {
  const [iconComponents, setIconComponents] = useState<
    React.FC<React.SVGProps<SVGSVGElement>>[]
  >([]);

  useEffect(() => {
    let isMounted = true;

    Promise.all(
      iconKeys.slice(0, 5).map((key) => getSkillIcon(key, size)),
    ).then((components) => {
      if (!isMounted) return;
      setIconComponents(
        components.filter(
          (component): component is React.FC<React.SVGProps<SVGSVGElement>> =>
            component !== null,
        ),
      );
    });

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
      {/* 스킬: 5개 초과 시 기타 아이콘 표시 */}
      {iconKeys.length > 5 && <MeatBallIcon />}
    </>
  );
};

export default SkillIcons;
