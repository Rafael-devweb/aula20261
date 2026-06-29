package com.example.autofixdesk;

import javafx.concurrent.Task;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.stage.Stage;


import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class MenuController {

    @FXML
    private Button btnSyncVeiculos;
    @FXML
    private ProgressIndicator progressSync;
    @FXML
    private Label lblStatusSync;

    private static final String SECRET_KEY = "slkfjh9428ryh932rh92r";

    @FXML
    private void onVoltarButtonClick(ActionEvent event) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("login-view.fxml"));
        Scene scene = new Scene(loader.load());
        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        stage.setScene(scene);
    }

    @FXML
    private void onCadastroUsuarioButtonClick(ActionEvent event) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("usuario-view.fxml"));
        Scene scene = new Scene(loader.load());
        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        stage.setScene(scene);
    }

    // No seu controller JavaFX (ex: ColdStartController.java)


    @FXML
    private void handleSyncVeiculos() {
        btnSyncVeiculos.setDisable(true);
        progressSync.setVisible(true);
        lblStatusSync.setText("Sincronizando marcas e modelos...");

        Task<SyncResultDTO> task = new Task<>() {
            @Override
            protected SyncResultDTO call() throws Exception {
                HttpClient client = HttpClient.newHttpClient();

                String body = "{\"secretKey\": \"" + SECRET_KEY + "\"}";

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("http://localhost:8080/veiculos/sync/brasil"))
                        .POST(HttpRequest.BodyPublishers.ofString(body))
                        .header("Content-Type", "application/json")
                        .build();

                HttpResponse<String> response = client.send(
                        request,
                        HttpResponse.BodyHandlers.ofString()
                );

                if (response.statusCode() != 200) {
                    throw new RuntimeException("Erro na sincronização: HTTP " + response.statusCode());
                }

                // Parseia o retorno { "marcasSalvas": 10, "modelosSalvos": 150 }
                return parseSyncResult(response.body());
            }
        };

        task.setOnSucceeded(e -> {
            SyncResultDTO result = task.getValue();
            progressSync.setVisible(false);
            btnSyncVeiculos.setDisable(false);
            lblStatusSync.setText(String.format(
                    "✅ Concluído! %d marcas e %d modelos salvos.",
                    result.marcasSalvas(), result.modelosSalvos()
            ));
        });

        task.setOnFailed(e -> {
            progressSync.setVisible(false);
            btnSyncVeiculos.setDisable(false);
            lblStatusSync.setText("❌ Erro: " + task.getException().getMessage());
        });

        new Thread(task).start();
    }

    private SyncResultDTO parseSyncResult(String json) {
        // json: {"marcasSalvas":10,"modelosSalvos":150}
        int marcas = Integer.parseInt(json.replaceAll(".*\"marcasSalvas\":(\\d+).*", "$1"));
        int modelos = Integer.parseInt(json.replaceAll(".*\"modelosSalvos\":(\\d+).*", "$1"));
        return new SyncResultDTO(marcas, modelos);
    }

    public record SyncResultDTO(int marcasSalvas, int modelosSalvos) {
    }
}

