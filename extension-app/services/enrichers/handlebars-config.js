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

import helpCommandHeader from './templates/base/help-command/help-command-header.hbs';
import helpCommandBody from './templates/base/help-command/help-command-body.hbs';
import welcomeMessageHeader from './templates/base/welcome-message/welcome-message-header.hbs';
import welcomeMessageAboutRoomHeader from './templates/base/welcome-message-about-room/welcome-message-about-room-header.hbs';

Handlebars.registerPartial('small-icon', smallIconPartial);
Handlebars.registerPartial('action-button', actionButtonPartial);
Handlebars.registerPartial('table', tablePartial);
Handlebars.registerPartial('tempo-icon', tempoIconPartial);

Handlebars.registerPartial('fake-card', fakeCardPartial);

Handlebars.registerPartial('action', actionTextPartial);
Handlebars.registerPartial('link', linkTextPartial);
Handlebars.registerPartial('text', textColorPartial);
Handlebars.registerPartial('user', userTextPartial);
Handlebars.registerPartial('help-command-header', helpCommandHeader);
Handlebars.registerPartial('help-command-body', helpCommandBody);
Handlebars.registerPartial('welcome-message-header', welcomeMessageHeader);
Handlebars.registerPartial('welcome-message-about-room-header', welcomeMessageAboutRoomHeader);

const unprettyCardTemplate = Handlebars.compile(basicCard);
const cardTemplate = obj => pretty(unprettyCardTemplate(obj));

const unprettyActionTemplate = Handlebars.compile(actionTextPartial);
export const actionTemplate = obj => pretty(unprettyActionTemplate(obj));
export default cardTemplate;
