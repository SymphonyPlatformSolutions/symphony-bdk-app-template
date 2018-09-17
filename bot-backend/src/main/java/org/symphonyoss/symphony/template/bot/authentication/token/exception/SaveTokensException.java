package org.symphonyoss.symphony.template.bot.authentication.token.exception;

/**
 * Exception to throws an error if the persistence of tokens fail.
 */
public class SaveTokensException extends RuntimeException {

  public SaveTokensException(String appId, Exception cause) {
    super("Failed to save app token. App ID: " + appId, cause);
  }

}
