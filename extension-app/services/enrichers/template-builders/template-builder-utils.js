import moment from 'moment';
import marked from 'marked';

marked.setOptions({ headerIds: false, xhtml: true });

export function getHTMLFromMarkdown(str) {
  return marked(str).replace(/<blockquote>/g, '<pre>').replace(/<\/blockquote>/g, '</pre>');
}

export function shortenDescription(description, url) {
  // As long as there are no tables....
  if (description.length <= 30) {
    return {
      content: getHTMLFromMarkdown(description),
    };
  }

  return {
    content: getHTMLFromMarkdown(description.slice(0, 30)),
    url,
    shortened: true,
  };
}

export function buildTime(dateTime) {
  const currTimezoneOffset = new Date().getTimezoneOffset();
  const formatedTime = moment(dateTime).utcOffset(currTimezoneOffset).format('MMM-D-YYYY, h:m a');
  if (formatedTime === 'Invalid date') {
    return dateTime;
  }
  return formatedTime;
}

export function convertToHashtag(txt) {
  return txt.toLowerCase().replace(/ /g, '');
}

export function formatDurationMinutes(duration) {
  const days = Math.floor(duration / (24 * 60));
  const hours = Math.floor((duration - days * (24 * 60)) / 60);
  const minutes = duration - days * 24 * 60 - hours * 60;
  return `${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
}
