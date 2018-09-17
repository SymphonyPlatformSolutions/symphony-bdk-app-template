package org.symphonyoss.symphony.template.bot.authentication.provider;

import configuration.SymConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.symphonyoss.symphony.apps.authentication.keystore.KeystoreProvider;
import org.symphonyoss.symphony.apps.authentication.keystore.model.KeystoreSettings;
import org.symphonyoss.symphony.apps.authentication.spring.keystore.LoadKeyStoreException;

import java.io.FileInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.KeyStore;

/**
 * Implementation class to retrieve the keystore used to perform authentication on the POD. This
 * class get the keystore path and keystore password from config file.
 */
@Component
public class BotKeystoreProvider implements KeystoreProvider {

  private static final String DEFAULT_KEYSTORE_TYPE = "pkcs12";
  private static final String CERT_EXTENSION = ".p12";

  @Autowired
  private SymConfig symConfig;

  @Override
  public KeystoreSettings getApplicationKeystore(String appId) {
    if (symConfig.getAppCertPath().isEmpty()) {
      throw new IllegalStateException("App keystore not provided in the config file");
    }

    if (symConfig.getAppCertPassword().isEmpty()) {
      throw new IllegalStateException("App keystore password not provided in the config file");
    }
    String storeFile = symConfig.getAppCertPath() + symConfig.getAppCertName() + CERT_EXTENSION;
    KeyStore keyStore =
        loadKeyStore(storeFile, symConfig.getAppCertPassword(),
            DEFAULT_KEYSTORE_TYPE);

    return new KeystoreSettings(keyStore, symConfig.getAppCertPassword());
  }

  /**
   * Load the keystore file
   * @param storeFile Keystore path
   * @param password Keystore password
   * @param type Keystore type
   * @return Keystore object
   */
  private KeyStore loadKeyStore(String storeFile, String password, String type) {
    try (FileInputStream inputStream = new FileInputStream(storeFile)) {
      final KeyStore ks = KeyStore.getInstance(type);
      ks.load(inputStream, password.toCharArray());

      return ks;
    } catch (GeneralSecurityException | IOException e) {
      throw new LoadKeyStoreException(
          String.format("Fail to load keystore file at %s", storeFile), e);
    }
  }

}