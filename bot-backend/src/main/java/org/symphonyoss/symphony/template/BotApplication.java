package org.symphonyoss.symphony.template;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication(scanBasePackages = "org.symphonyoss.symphony.template")
@EnableSwagger2
@EnableWebMvc
public class BotApplication {

  public static void main(String[] args) {
    new SpringApplication(BotApplication.class).run(args);
  }
}
