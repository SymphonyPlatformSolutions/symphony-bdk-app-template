package org.symphonyoss.symphony.template.bot.authentication.token.memory;

import org.springframework.stereotype.Component;
import org.symphonyoss.symphony.template.bot.authentication.model.BotAppToken;
import org.symphonyoss.symphony.template.bot.authentication.token.AppTokenDao;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class InMemoryAppTokenDao implements AppTokenDao {

  private final Map<String, BotAppToken> tokens = new ConcurrentHashMap<>();

  @Override
  public BotAppToken saveAppToken(BotAppToken appToken) {
    this.tokens.put(appToken.getAppToken(), appToken);
    return appToken;
  }

  @Override
  public BotAppToken getAppToken(String appToken) {
    return this.tokens.get(appToken);
  }

}
