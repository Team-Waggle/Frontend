import { useState } from 'react';
import { teamPlay } from '../../constants/formOptions';

interface TeamPlayLabelBtnProps {
    className?: string;
}

const TeamPlayLabelBtn = ({ className }: TeamPlayLabelBtnProps) => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleClick = (label: string) => {
        if (selected === label) {
          setSelected(null);
        } else {
          setSelected(label);
        }
      };

    return (
        <div className={`flex justify-between items-start self-stretch ${className}`}>
            {teamPlay.map((label) => {
                const isActive = selected === label;
                return (
                    <button
                        key={label}
                        onClick={() => handleClick(label)}
                        className={`flex w-[140px] h-[32px] justify-center items-center rounded-[4px] text-[13px] font-[500] leading-[150%] text-center
                            ${isActive ? 'bg-[#D9E8FF] text-[#000]' : 'bg-[#fff] text-[#949598]'}`}>
                        {label}
                    </button>
                    );
            })}
        </div>
    );
};

export default TeamPlayLabelBtn;