import FormLabel from "../FormLabel";
import IconTextArea from "../common/InputBox/IconTextArea/BaseIconTextArea";

interface NickNameFieldProps {
  email: string;
  setEmail: (v: string) => void;
}

const EmailField = ({ email, setEmail }: NickNameFieldProps) => {

    return(
        <div className="flex w-full flex-col gap-[0.8rem]">
          <FormLabel title="이메일" />
          <IconTextArea
            className="pointer-events-none cursor-default bg-black-40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="waggle@gmail.com"
            type="fixed"
            state="disable"
            readOnly
          />
        </div>
    );
};

export default EmailField;