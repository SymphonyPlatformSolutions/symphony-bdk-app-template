import Handlebars from 'handlebars';
import pretty from 'pretty';
import basicCard from './templates/base/basic-card.hbs';
import smallIconPartial from './templates/components/small-icon.hbs';
import actionButtonPartial from './templates/components/action-button.hbs';
import tablePartial from './templates/components/table.hbs';
import tempoIconPartial from './templates/components/tempo-icon.hbs';
import fakeCardPartial from './templates/structure/fake-card.hbs';
import actionTextPartial from './templates/text/action.hbs';
import linkTextPartial from './templates/text/link.hbs';
import textColorPartial from './templates/text/text-color.hbs';
import userTextPartial from './templates/text/user.hbs';
import myEntityBody from './templates/base/my-entity/my-entity-body.hbs';
import myEntityHeader from './templates/base/my-entity/my-entity-header.hbs';

Handlebars.registerPartial('small-icon', smallIconPartial);
Handlebars.registerPartial('action-button', actionButtonPartial);
Handlebars.registerPartial('table', tablePartial);
Handlebars.registerPartial('tempo-icon', tempoIconPartial);

Handlebars.registerPartial('fake-card', fakeCardPartial);

Handlebars.registerPartial('action', actionTextPartial);
Handlebars.registerPartial('link', linkTextPartial);
Handlebars.registerPartial('text', textColorPartial);
Handlebars.registerPartial('user', userTextPartial);

Handlebars.registerPartial('my-entity-body', myEntityBody);
Handlebars.registerPartial('my-entity-header', myEntityHeader);

const unprettyCardTemplate = Handlebars.compile(basicCard);
const cardTemplate = obj => pretty(unprettyCardTemplate(obj));

const unprettyActionTemplate = Handlebars.compile(actionTextPartial);
export const actionTemplate = obj => pretty(unprettyActionTemplate(obj));
export default cardTemplate;
