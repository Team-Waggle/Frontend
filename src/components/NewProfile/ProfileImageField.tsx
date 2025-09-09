import ProfileIcon from '../common/Profile/ProfileIcon/BaseProfileIcon'

interface ProfileImageFieldProps {
    ProfileImgFieldUrl?: string;
    onFileSelect: (file: File) => void;
}

const ProfileImageField = ({ ProfileImgFieldUrl, onFileSelect }: ProfileImageFieldProps) => {

    return(
        <div className="mb-[2rem] mt-[4.2rem]">
        <ProfileIcon
          size="large"
          type="edit"
          imageUrl={ProfileImgFieldUrl}
          onFileSelect={onFileSelect}
        />
      </div>
    );
};

export default ProfileImageField;