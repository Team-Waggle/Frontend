import FormLabel from "../FormLabel";
import IconTextArea from "../common/InputBox/IconTextArea/BaseIconTextArea";

interface NickNameFieldProps {
  nickname: string;
  setNickname: (v: string) => void;
  requiredMessage: boolean;
}

const NickNameField = ({ nickname, setNickname, requiredMessage }: NickNameFieldProps) => {

    return(
        <div className="flex w-full flex-col gap-[0.8rem]">
          <FormLabel
            title="닉네임"
            className="w-[120rem]"
            isRequired
            requiredMessage={requiredMessage}
          />
          <IconTextArea
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="한글, 영어, 숫자 포함 2-10자리 가능"
            typingMessage="닉네임에 특수문자는 사용이 불가능합니다."
          />
        </div>
    );
};

export default NickNameField;