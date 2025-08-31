import React, { useEffect, useState } from 'react';
import { getSkillIcon } from '../utils/getSkillIcon';
import MeatBallIcon from '../assets/icons/skill/large/ic_skill_meatball_large.svg?react';

interface SkillIconsProps {
  iconKeys: string[];
  size: 'small' | 'large';
  limit?: number | null;
}

export const SkillIcons = ({ iconKeys, size, limit = 5 }: SkillIconsProps) => {
  const [iconComponents, setIconComponents] = useState<
    React.FC<React.SVGProps<SVGSVGElement>>[]
  >([]);

  useEffect(() => {
    let isMounted = true;

    // slice 로직을 처리할 임시 변수 사용
    const keysToLoad = limit !== null ? iconKeys.slice(0, limit) : iconKeys;

    Promise.all(keysToLoad.map((key) => getSkillIcon(key, size))).then(
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
  }, [iconKeys, size, limit]);

  if (iconComponents.length === 0) return null;

  return (
    <>
      {iconComponents.map((Icon, idx) => (
        <Icon key={idx} />
      ))}
      {/* 스킬: 5개 초과 시 기타 아이콘 표시 */}
      {limit !== null && iconKeys.length > limit && <MeatBallIcon />}
      {/* {iconKeys.length > 5 && <MeatBallIcon />} */}
    </>
  );
};

export default SkillIcons;
