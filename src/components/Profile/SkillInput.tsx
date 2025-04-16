import React from 'react';
import StyledInput from '../Profile/StyledInput';

const SkillInput = () => {
    return (
        <div className='inline-flex flex-col items-start'>
            <StyledInput
                placeholder="프로그램 이름을 입력하세요."
                useRegex={false}
                useLengthValidation={false}
            />
            <div>
                안녕
            </div>
        </div>
    );
};

export default SkillInput;