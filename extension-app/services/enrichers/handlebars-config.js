import Handlebars from 'handlebars';
import pretty from 'pretty';
import smallIconPartial from './templates/components/small-icon.hbs';
import actionButtonPartial from './templates/components/action-button.hbs';
import tablePartial from './templates/components/table.hbs';
import tempoIconPartial from './templates/components/tempo-icon.hbs';
import fakeCardPartial from './templates/structure/fake-card.hbs';
import actionTextPartial from './templates/text/action.hbs';
import linkTextPartial from './templates/text/link.hbs';
import textColorPartial from './templates/text/text-color.hbs';
import userTextPartial from './templates/text/user.hbs';

Handlebars.registerPartial('small-icon', smallIconPartial);
Handlebars.registerPartial('action-button', actionButtonPartial);
Handlebars.registerPartial('table', tablePartial);
Handlebars.registerPartial('tempo-icon', tempoIconPartial);

Handlebars.registerPartial('fake-card', fakeCardPartial);

Handlebars.registerPartial('action', actionTextPartial);
Handlebars.registerPartial('link', linkTextPartial);
Handlebars.registerPartial('text', textColorPartial);
Handlebars.registerPartial('user', userTextPartial);

const unprettyActionTemplate = Handlebars.compile(actionTextPartial);
export const actionTemplate = obj => pretty(unprettyActionTemplate(obj));
