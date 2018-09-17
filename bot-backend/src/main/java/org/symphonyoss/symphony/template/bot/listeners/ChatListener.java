package org.symphonyoss.symphony.template.bot.listeners;

import listeners.IMListener;
import model.InboundMessage;
import model.Stream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class ChatListener implements IMListener {

  private static final Logger LOGGER = LoggerFactory.getLogger(ChatListener.class);

  /**
   * It is triggered for each incoming message
   * @param inboundMessage incoming message
   */
  public void onIMMessage(InboundMessage inboundMessage) {
    LOGGER.info("New message received from " + inboundMessage.getUser().getDisplayName());
  }

  /**
   * It is triggered when a IM is created
   * @param stream {@link Stream}
   */
  public void onIMCreated(Stream stream) {
    LOGGER.info("IM created" + stream.getStreamId());
  }

}