import template from '../handlebars-config';

export default class TestEntityBuilder {
  static build() {
    return template({
      icon: 'https://via.placeholder.com/50',
      tempoAccent: 'blue',
      header: {
        genericTitle: 'My enriched message',
        details: {
          content: 'Some other stuff to be said in the title',
        },
      },
      body: {
        details: {
          content: 'Body content inside body',
        },
      },
      headerPartial: () => 'test-header',
      bodyPartial: () => 'test-body',
    });
  }
}
