import { getCozyScheme } from '@mui-treasury/layout/presets';

const scheme = getCozyScheme();

scheme.configureHeader((builder) => {
  builder.create('header1').registerConfig('xs', {
    position: 'fixed',
    clipped: true,
  });
});

scheme.configureSubheader((builder) => {
  builder.create('subheader').registerConfig('xs', {
    position: 'fixed',
    initialHeight: 45,
    clipped: true,
  });
});

scheme.configureEdgeSidebar((builder) => {
  builder
    .create('sidebarActions', { anchor: 'left' })
    .registerPermanentConfig('xs', {
      collapsible: true,
      collapsedWidth: 64,
      
    });
});
scheme.enableAutoCollapse('sidebarActions', 'sm');

scheme.configureEdgeSidebar((builder) => {
  builder
    .create('secondarySidebar', { anchor: 'right' })
    .registerPersistentConfig('xs', {
      width: 400,
      persistentBehavior: 'none',
      collapsible: false,
    });
});

scheme.side

export default scheme;
