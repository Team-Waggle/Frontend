import FormLabel from '../FormLabel';
import KeywordChip from '../common/Chip/KeywordChip/KeywordChip';
import KeywordTextArea from '../common/InputBox/KeywordTextArea/KeywordTextArea';

import { skillIconMapper } from '../../utils/skillIconMapper';
import SkillIcons from '../SkillIcons';
import { skills } from '../../constants/formOptions';
import { getSkill } from '../../utils/createMapper';

interface SkillFieldProps {
  skillKeywords: string[];
  setSkillKeywords: (v: string[]) => void;
}

const SkillField = ({ skillKeywords, setSkillKeywords }: SkillFieldProps) => {

    return(
        <div className="flex flex-col items-start gap-[0.8rem] self-stretch">
          <FormLabel title="사용스킬" isRequired />
          <KeywordTextArea
            value={skillKeywords}
            onChange={setSkillKeywords}
            items={skills}
            placeholder="스킬을 입력하세요."
            renderChip={(skill, onRemove) => {
              const displayLabel = getSkill(skill.id) || skill.label;
              const iconFileName = skillIconMapper[skill.id];
              return (
                <KeywordChip
                  key={skill.id}
                  shape="square"
                  label={displayLabel}
                  onRemove={onRemove}
                  icon={
                    iconFileName ? (
                      <SkillIcons iconKeys={[iconFileName]} size="small" />
                    ) : null
                  }
                />
              );
            }}
          />
        </div>
    );
};

export default SkillField;