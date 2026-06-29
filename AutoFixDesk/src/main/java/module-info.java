module com.example.autofixdesk {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.desktop;
    requires java.net.http;


    opens com.example.autofixdesk to javafx.fxml;
    exports com.example.autofixdesk;
}