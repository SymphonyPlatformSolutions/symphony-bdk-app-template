import template from '../handlebars-config';
import { actionColors } from '../js-constants';

export default class MyCurrencyQuoteBuilder {
  static build(data) {
    return template({
      tempoAccent: null,
      icon: 'https://localhost:4000/assets/favicon.png',
      headerPartial: () => 'currency-quote-header',
      bodyPartial: () => 'currency-quote-body',
      header: { details: {} },
      body: {
        details: {
          payload: data,
          fakeCard: {
            accent: actionColors.myEntity,
            headerColor: actionColors.myEntity,
            header: 'Payload Received',
          },
        },
      },
    });
  }
}
