/* global SYMPHONY */

import React, { useState, useEffect, useRef } from 'react';
import WrapperMessageStack from '../../components/wrapper-message-stack';

const renderer = SYMPHONY.services.subscribe('extensionml-renderer');
let messagesCounter = 0;

const RendererApp = () => {
  const messagesEndRef = useRef();
  const [messages, changeMessages] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const messageReceiver = (event) => {
    messagesCounter += 1;
    // For Chrome, the origin property is in the event.originalEvent object.
    if (typeof event.data === 'object' && event.data.call === 'sendValue') {
      const { template, entityJson } = event.data.value;
      const fullHtml = renderer.render(null, null, template.template, entityJson, ['presentationML', 'messageML']);

      let htmlString = fullHtml.context.outerHTML;
      htmlString = htmlString.replace(
        'class="card collapsed has-body',
        `id="clickable_${messagesCounter}" class="card collapsed has-body" onclick="overrideCardCollapse('clickable_${messagesCounter}')"`,
      );
      changeMessages((prevState) => {
        messagesCounter += 1;
        return [...prevState, htmlString];
      });
      setTimeout(() => {
      }, 200);
    }
  };
  useEffect(() => {
    window.addEventListener('message', messageReceiver.bind(this), false);
  }, []);

  useEffect(scrollToBottom, [messages]);

  return (
    <div>
      {messages.map((el, index) => <WrapperMessageStack key={`wrapperMessageStack_${index}`} htmlContent={el} />)}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default RendererApp;
