import {t} from '../../../locale';

const pathPrefix = '/settings/account';

const accountNavigation = [
  {
    name: t('Account'),
    items: [
      {
        path: `${pathPrefix}/avatar`,
        title: t('Avatar'),
      },
      {
        path: `${pathPrefix}/appearance/`,
        title: t('Appearance'),
      },
      {
        path: `${pathPrefix}/notifications/`,
        title: t('Notifications'),
      },
      {
        path: `${pathPrefix}/emails/`,
        title: t('Emails'),
      },
      {
        path: `${pathPrefix}/subscriptions/`,
        title: t('Subscriptions'),
      },
      {
        path: `${pathPrefix}/authorizations/`,
        title: t('Authorized Applications'),
      },
    ],
  },
];

export default accountNavigation;
