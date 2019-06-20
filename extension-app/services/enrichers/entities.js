export const ENRICHER_EVENTS = {
  INCIDENT_CREATION: {
    type: 'com.symphony.ms.devtools.gitlab.build',
    json: {
      instance_name: 'Instance 1',
      project_name: 'Project A',
      incident: {
        id: '1',
        name: 'Incident A',
        url: 'http://www.pagerduty.com',
        status: 'triggered',
        service: 'Design',
        opened_at: '2019-05-16 19:50:31 UTC',
        assigned_to: '',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In interdum ut ligula quis rutrum. Pellentesque ultricies, ligula id efficitur ornare, eros urna feugiat libero, hendrerit lacinia nibh erat id turpis. Sed ut diam elementum, elementum velit sit amet, dignissim ex. Cras eget enim iaculis, convallis enim eget, dapibus ante.',
      },
      user: {
        name: 'John Doe',
      },
    },
  },
};
