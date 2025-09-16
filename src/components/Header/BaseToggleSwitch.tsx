interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

const BaseToggleSwitch = ({ isOn, onToggle }: ToggleSwitchProps) => {
  return (
    <div
      onClick={onToggle}
      className={`flex h-[1.6rem] w-[3rem] cursor-pointer items-center rounded-full p-[0.2rem] transition-all duration-300 ${
        isOn ? 'bg-primary' : 'bg-black-50'
      }`}
    >
      <div
        className={`h-[1.2rem] w-[1.2rem] transform rounded-full bg-white shadow-md transition-all duration-300 ${
          isOn ? 'translate-x-[1.4rem]' : 'translate-x-0'
        }`}
      />
    </div>
  );
};

export default BaseToggleSwitch;
