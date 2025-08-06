import LogoIcon from '../../assets/icons/ic_logo_large.svg?react';

const Footer = () => {
  return (
    <footer className="flex h-[23.8rem] w-full justify-center bg-black-30">
      <div className="mt-[3.65rem] flex h-[7.9rem] w-[64rem] flex-col justify-between">
        <div className="flex justify-between">
          <LogoIcon className="text-black-80" />
          <div className="flex gap-[3.2rem] text-body-16_M500 text-black-100">
            <span className="">고객센터</span>
            <span className="">서비스 이용약관</span>
            <span className="">개인정보취급방침</span>
          </div>
        </div>
        <span className="pl-[1rem] text-body-14_R400 text-black-80">
          waggle.official@gmail.com
        </span>
      </div>
    </footer>
  );
};

export default Footer;
