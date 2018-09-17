package org.symphonyoss.symphony.template.bot.authentication.model;

import org.symphonyoss.symphony.apps.authentication.tokens.model.AppToken;

import java.util.concurrent.TimeUnit;

/**
 * Extends application token to include the expires timestamp.
 */
public class BotAppToken {

  private static final long EXPIRES_TIME = TimeUnit.MINUTES.toMillis(5);

  private String id;

  private String appToken;

  private String symphonyToken;

  private long expiresAt;

  public BotAppToken() {
  }

  public BotAppToken(AppToken token) {
    this.id = token.getAppId();
    this.appToken = token.getAppToken();
    this.symphonyToken = token.getSymphonyToken();
    this.expiresAt = System.currentTimeMillis() + EXPIRES_TIME;
  }

  public String getId() {
    return id;
  }

  public String getAppToken() {
    return appToken;
  }

  public String getSymphonyToken() {
    return symphonyToken;
  }

  public long getExpiresAt() {
    return expiresAt;
  }

  public AppToken toAppToken() {
    return new AppToken(id, appToken, symphonyToken);
  }

}