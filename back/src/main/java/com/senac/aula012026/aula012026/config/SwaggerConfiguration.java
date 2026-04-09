package com.senac.aula012026.aula012026.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public OpenAPI customOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("API ChefOrder")
                        .version("1.0")
                        .description("API de apoio ao sistema de comandas e gestão de restaurantes")
                        .termsOfService("http://mtxsistemas.com")
                );
    }
}
