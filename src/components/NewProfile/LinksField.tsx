import FormLabel from '../FormLabel';
import IconTextArea from '../common/InputBox/IconTextArea/BaseIconTextArea';
import Select from '../common/Select/BaseSelect';

import PlusIcon from '../../assets/profile/icon/icon-plus.svg?react';
import MinusIcon from '../../assets/profile/icon/icon-minus.svg?react';

import * as formOptions from '../../constants/formOptions';
import LinkIcons from '../LinksIcons';

interface LinkRow {
  id: string;
  site: string;
  url: string;
}

interface LinksFieldProps {
  links: LinkRow[];
  addLink: () => void;
  removeLink: (id: string) => void;
  updateLink: (id: string, key: 'site' | 'url', value: string) => void;
}

const LinksField = ({
  links,
  addLink,
  removeLink,
  updateLink,
}: LinksFieldProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-[0.8rem] self-stretch">
      <FormLabel title="링크" />

      {links.map((link, index) => (
        <div key={link.id} className="flex items-center gap-[0.6rem]">
          <div className="flex w-[63rem] items-center gap-[1.8rem]">
            <IconTextArea
              className="w-[30.6rem]"
              placeholder="주소"
              useRegex={false}
              useLengthValidation={false}
              value={link.url}
              onChange={(e) => updateLink(link.id, 'url', e.target.value)}
            />
            <Select
              items={formOptions.site}
              title="사이트"
              width="w-[30.6rem]"
              value={link.site}
              onChange={(v) => updateLink(link.id, 'site', v)}
              renderItem={(item) => (
                <div className="flex gap-[1rem]">
                  <LinkIcons iconKeys={[item.id]} size="medium" limit={1} />
                  <span>{item.label}</span>
                </div>
              )}
            />
          </div>

          {index === links.length - 1 && (
            <button type="button" onClick={addLink}>
              <PlusIcon />
            </button>
          )}

          {links.length > 1 && (
            <button type="button" onClick={() => removeLink(link.id)}>
              <MinusIcon />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default LinksField;
