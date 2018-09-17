package org.symphonyoss.symphony.template.bot.authentication.token;

import org.symphonyoss.symphony.template.bot.authentication.model.BotAppToken;

/**
 * DAO for application tokens.
 */
public interface AppTokenDao {

  /**
   * Save application token into database.
   * @param appToken Application token
   * @return success response with created/updated application token.
   */
  BotAppToken saveAppToken(BotAppToken appToken);

  /**
   * Gets an application token from database.
   * @param appToken application token.
   * @return success response with retrieved application token object.
   */
  BotAppToken getAppToken(String appToken);

}
