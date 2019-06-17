let view;
let rendererService;

const service = SYMPHONY.services.register('default-entities');
console.log('Adding default entities');
service.listen('ready', onReady);
service.listen('render', onRender);

function onReady() {
  rendererService = SYMPHONY.services.subscribe('message-renderer');
  view = new DefaultEntitiesView();

  rendererService.registerEntity('userMentions', 'default-entities');
  rendererService.registerEntity('urls', 'default-entities');
  rendererService.registerEntity('hashtags', 'default-entities');
  rendererService.registerEntity('cashtags', 'default-entities');
}

function onRender(name, data, message) {
  return view.render(name, data, message);
}

function DefaultEntitiesView() {
  this.entities = {};
  this.builder = new EntityBuilder();
}

DefaultEntitiesView.prototype = {
  render(name, data) {
    const text = this.builder.renderRichContent(data);
    const selector = $(text);

    const node = $('<span class="final-render">').append(selector);

    const wrapper = document.createElement('div');
    wrapper.appendChild(node[0]);
    this.el = wrapper;

    return node;
  },
};

const URL_PROTOCOLS = 'mms|ftp|http|https';
const URL_PATTERN = new RegExp(`(?:^|\\s)(?:(?:((?:${URL_PROTOCOLS}):\/\/)(.+))|(www[.][^.]+[.][^.]{1,7}))`, 'i');
const URL_LENGTH_LIMIT = 65;

var EntityBuilder = function () {};

EntityBuilder.prototype.renderRichContent = function (entity) {
  let ret;

  switch (entity.type) {
    case 'URL':
      wrappedLink = this._wrapLink(entity);
      ret = `<a class="msg-entity link ${(wrappedLink.canPreviewContent) ? 'content-preview' : ''}" 
                    target="_blank" href="${wrappedLink.expandedUrl}" data-tooltip="${wrappedLink.expandedUrl}">
                        <span class="prefix">${wrappedLink.prefix}</span>
                        <span class="hostname text">${wrappedLink.text}</span>
                        ${(wrappedLink.suffix) ? `<span class="suffix hidden">${wrappedLink.suffix}</span>` : ''}
                        ${(wrappedLink.ellipsis) ? `<span class="ellipsis">${wrappedLink.ellipsis}</span>` : ''}
                    </a>`;
      break;
    case 'USER_FOLLOW':
      ret = `<span class="msg-entity person has-hover-profile no-focus colorable aliasable" data-userid="${entity.id}" data-usertype="${entity.userType}">
                        @<span class="subalias">
                            ${(entity.prettyName) ? entity.prettyName : entity.screenName}
                        </span>
                    </span>`;
      break;
    case 'LIST':
      ret = `<span class="msg-entity distroList has-hover-distro-list no-focus" data-distribution="${entity.id}">"
                        <span class="subalias">${entity.text}</span>
                    </span>`;
      break;
    case 'KEYWORD':
      ret = this._renderKeywordEntity(entity);
      break;
    default:
      ret = entity;
      break;
  }

  return ret.replace(/\r\n/g, '');
};

EntityBuilder.prototype._renderKeywordEntity = function (entity) {
  let ret;

  switch (entity.id[0]) {
    case '$':
      ret = `<span class="has-hover-cashtag msg-entity cashtag no-focus" data-value="${entity.text}">${entity.text}</span>`;
      break;
    case '#':
      ret = `<span class="has-hover-hashtag msg-entity hashtag no-focus" data-value="${entity.text}">${entity.text}</span>`;
      break;
    default:
      ret = `<span class="has-hover-hashtag msg-entity hashtag no-focus" data-value="${entity.text}">${entity.text}</span>`;
      break;
  }

  return ret;
};

/**
 * Helper function that wraps a link with the appropriate HTML. Links are handled in a special manner since they are
 * displayed differently based off of length.
 *
 * @param entity
 * @returns {String}
 * @private
 */
EntityBuilder.prototype._wrapLink = function (entity) {
  const linkWrapper = entity;
  const match = URL_PATTERN.exec(linkWrapper.expandedUrl);

  if (match) {
    linkWrapper.prefix = match[1];
    // the full link without 'http(s)://'
    const url = match[2] || match[3];

    if (url.length > URL_LENGTH_LIMIT) {
      linkWrapper.ellipsis = '...';
      linkWrapper.suffix = url.substring(URL_LENGTH_LIMIT);
      linkWrapper.text = url.substring(0, URL_LENGTH_LIMIT);
    } else {
      linkWrapper.text = url;
    }
  }

  if (!linkWrapper.prefix) {
    linkWrapper.prefix = 'https://';
  }

  if (!match) {
    linkWrapper.expandedUrl = `https://${linkWrapper.expandedUrl}`;
  }

  const testUrl = linkWrapper.expandedUrl.toLowerCase();
  return linkWrapper;
};

function overrideCardCollapse(id) {
  const element = document.getElementById(id);
  if (element.classList.value.includes('collapsed')) {
    element.classList.remove('collapsed');
  } else {
    element.classList.add('collapsed');
  }
}
