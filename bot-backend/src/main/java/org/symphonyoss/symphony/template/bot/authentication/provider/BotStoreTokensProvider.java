package org.symphonyoss.symphony.template.bot.authentication.provider;

import org.springframework.stereotype.Component;
import org.symphonyoss.symphony.apps.authentication.tokens.StoreTokensProvider;
import org.symphonyoss.symphony.apps.authentication.tokens.model.AppToken;
import org.symphonyoss.symphony.template.bot.authentication.model.BotAppToken;
import org.symphonyoss.symphony.template.bot.authentication.token.AppTokenDao;

/**
 * Implementation class to retrieve and store the application and symphony tokens from/to Mongo DB.
 */
@Component
public class BotStoreTokensProvider implements StoreTokensProvider {

  private final AppTokenDao dao;

  public BotStoreTokensProvider(AppTokenDao dao) {
    this.dao = dao;
  }

  @Override
  public void saveAppAuthenticationToken(AppToken appToken) {
    BotAppToken token = new BotAppToken(appToken);
    dao.saveAppToken(token);
  }

  @Override
  public AppToken getAppAuthenticationToken(String appToken) {
    BotAppToken result = dao.getAppToken(appToken);

    if ((result != null) && (System.currentTimeMillis() < result.getExpiresAt())) {
      return result.toAppToken();
    }

    return null;
  }

}