package org.symphonyoss.symphony.template.bot.authentication.token.exception;

/**
 * Exception to throws an error if can't retrieve tokens from db.
 */
public class RetrieveTokensException extends RuntimeException {

  public RetrieveTokensException(String appToken, Exception cause) {
    super("Failed to get app token. App token: " + appToken, cause);
  }

}
