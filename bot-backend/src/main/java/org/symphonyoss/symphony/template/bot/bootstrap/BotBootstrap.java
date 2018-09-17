package org.symphonyoss.symphony.template.bot.bootstrap;

import authentication.SymBotAuth;
import clients.SymBotClient;
import configuration.SymConfig;
import configuration.SymConfigLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.symphonyoss.symphony.template.bot.config.BotConfig;
import org.symphonyoss.symphony.template.bot.listeners.ChatListener;
import services.DatafeedEventsService;

@Component
public class BotBootstrap {
  private static final Logger LOGGER = LoggerFactory.getLogger(BotBootstrap.class);
  private static final String KEYSTORE_TYPE = "pkcs12";
  private static final String CERT_EXTENSION = ".p12";

  private final BotConfig botConfig;

  public BotBootstrap(BotConfig botConfig) {
    this.botConfig = botConfig;
  }

  /**
   * Method to set properties on System related to SSL Certificates
   * @param symConfig configuration from bot-config.json
   */
  private void setSystemProperties(SymConfig symConfig) {
    System.setProperty("javax.net.ssl.keyStoreType", KEYSTORE_TYPE);
    System.setProperty("javax.net.ssl.keyStore",
        symConfig.getBotCertPath() + symConfig.getBotCertName() + CERT_EXTENSION);
    System.setProperty("javax.net.ssl.keyStorePassword", symConfig.getBotCertPassword());
  }

  /**
   * Bean that loads the configurations of config.json file and set it in a SymConfig instance
   * @return {@link SymConfig}
   */
  @Bean
  public SymConfig symConfig() {
    LOGGER.info("Getting the configuration file on " + botConfig.getBotConfig() + " ...");
    SymConfigLoader configLoader = new SymConfigLoader();
    SymConfig symConfig = configLoader.loadFromFile(botConfig.getBotConfig());
    setSystemProperties(symConfig);
    return symConfig;
  }

  /**
   * Bean that creates a bot client to access data feed
   * @param symConfig configuration from bot-config.json
   * @param symBotAuth bean of authentication
   * @return {@link SymBotClient}
   */
  @Bean
  public SymBotClient symBotClient(SymConfig symConfig, SymBotAuth symBotAuth) {
    LOGGER.info("Creating the bot client...");
    return SymBotClient.initBot(symConfig, symBotAuth);
  }

  /**
   * Bean that authenticates the bot into a POD using the certificates
   * @param symConfig configuration from bot-config.json
   * @return {@link SymBotAuth}
   */
  @Bean
  public SymBotAuth symBotAuth(SymConfig symConfig) {
    LOGGER.info("Authenticating user...");
    SymBotAuth botAuth = new SymBotAuth(symConfig);
    botAuth.authenticate();
    return botAuth;
  }

  /**
   * Bean that add the chat listener
   * @param symBotClient configuration from bot-config.json
   * @param chatListener IMListener instance
   * @return {@link DatafeedEventsService}
   */
  @Bean
  public DatafeedEventsService datafeedEventsService(SymBotClient symBotClient,
      ChatListener chatListener) {
    LOGGER.info("Getting datafeed events...");
    DatafeedEventsService datafeedEventsService = symBotClient.getDatafeedEventsService();

    LOGGER.info("Adding my IMListener...");
    datafeedEventsService.addIMListener(chatListener);

    return datafeedEventsService;
  }

  /**
   * Bean to initiate chat listener
   * @return {@link ChatListener}
   */
  @Bean
  public ChatListener chatListener() {
    return new ChatListener();
  }

}
