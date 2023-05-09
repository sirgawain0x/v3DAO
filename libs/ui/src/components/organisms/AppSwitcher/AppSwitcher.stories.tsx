import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AppSwitcher } from './AppSwitcher';
import { ReactComponent as Creative } from '../../../assets/Creative_logo.svg';
import { ReactComponent as Summoner } from '../../../assets/Summoner.svg';
import { ReactComponent as Docs } from '../../../assets/Docs.svg';
import { ReactComponent as Hub } from '../../../assets/Hub.svg';

export default {
  title: 'Organisms/AppSwitcher',
  component: AppSwitcher,
} as ComponentMeta<typeof AppSwitcher>;

const Template: ComponentStory<typeof AppSwitcher> = (args) => (
  <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
    <AppSwitcher {...args} />
  </div>
);

export const DaoHausAppSwitcher = Template.bind({});

DaoHausAppSwitcher.args = {
  currentApp: {
    name: 'Hub',
    url: 'https://dao.creativeplatform.xyz/',
    Icon: Hub,
  },
  apps: [
    {
      name: 'Summoner',
      url: 'https://summon.creativeplatform.xyz/',
      Icon: Summoner,
    },
    {
      name: 'Docs',
      url: 'https://creativeplatform.xyz/docs/intro',
      Icon: Docs,
    },
    {
      name: 'Creative Organization DAO',
      url: 'https://creativeplatform.xyz/',
      Icon: Creative,
    },
  ],
};
