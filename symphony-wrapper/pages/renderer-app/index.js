import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import WrapperMessageStack from '../../components/wrapper-message-stack';

const renderer = SYMPHONY.services.subscribe('message-renderer');
let outerMessages = [];
const RendererApp = () => {
  const [messages, changeMessages] = useState([]);

  const messageReceiver = (event) => {
    // For Chrome, the origin property is in the event.originalEvent object.
    if (typeof event.data === 'object' && event.data.call === 'sendValue') {
      Axios.post('http://localhost:3000/api/parser', {
        entityJson: '', // JSON.stringify(event.data.value.data),
        messageML: event.data.value.template,
      }).then((res) => {
        const fullHTML = renderer.render({
          format: 'com.symphony.messageml.v2',
          entityJSON: res.data.entityJSON,
          presentationML: res.data.presentationML,
        });
        let htmlString = fullHTML.context.outerHTML;
        console.log(htmlString);
        htmlString = htmlString.replace('class="card collapsed has-body', `id="clickable_${messages.length}" class="card collapsed has-body" onclick="overrideCardCollapse('clickable_${messages.length}')"`);
        console.log(htmlString);
        outerMessages = [...outerMessages, htmlString];
        changeMessages(outerMessages);
      });
    }
  };
  useEffect(() => {
    window.addEventListener('message', messageReceiver, false);
  }, []);

  return (
    <div>
      {messages.map((el, index) => <WrapperMessageStack key={`wrapperMessageStack_${index}`} htmlContent={el} />)}
    </div>
  );
};

export default RendererApp;
