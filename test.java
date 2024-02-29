import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {

    public static void main(String[] args) {
        try {
            // Read JSON file containing filter parameters
            ObjectMapper objectMapper = new ObjectMapper();
            File jsonFile = new File("filter_params.json");
            JsonNode rootNode = objectMapper.readTree(jsonFile);

            // Modify date range
            LocalDateTime fromDate = LocalDateTime.now().minusDays(7); // Change as needed
            LocalDateTime toDate = LocalDateTime.now(); // Change as needed
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            String fromDateString = fromDate.format(formatter);
            String toDateString = toDate.format(formatter);

            // Update range in JSON
            if (rootNode.has("range")) {
                ObjectNode rangeNode = (ObjectNode) rootNode.get("range");
                rangeNode.put("from", fromDateString);
                rangeNode.put("to", toDateString);
            }

            // Send HTTP request with modified JSON body containing filter parameters
            // Your code to send the HTTP request goes here

            // Example printing the modified JSON body
            System.out.println(rootNode.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

public class CurlToJava {
    public static void main(String[] args) {
        try {
            // Create a custom SSL context that trusts all certificates
            SSLContext sslContext = SSLContext.getInstance("SSL");
            sslContext.init(null, new TrustManager[] { new X509TrustManager() {
                public X509Certificate[] getAcceptedIssuers() {
                    return null;
                }

                public void checkClientTrusted(X509Certificate[] certs, String authType) {
                }

                public void checkServerTrusted(X509Certificate[] certs, String authType) {
                }
            } }, new java.security.SecureRandom());

            // Set the custom SSL context to the HttpClient
            HttpClient client = HttpClient.newBuilder()
                    .sslContext(sslContext)
                    .build();

            // Create and send the request
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://example.com"))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Response code: " + response.statusCode());
            System.out.println("Response body: " + response.body());
        } catch (NoSuchAlgorithmException | KeyManagementException | IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            // Commande avec des arguments
            String[] command = {"commande", "arg1", "arg2"};

            // Si les arguments contiennent des espaces, vous pouvez les définir comme suit
            // Dans cet exemple, arg1 et arg2 contiennent des espaces
            String arg1 = "toto@toto.com, tata@tata.com";
            String arg2 = "test send mail";

            // Créer le process builder avec la commande et ses arguments
            ProcessBuilder pb = new ProcessBuilder(command[0], arg1, arg2);

            // Exécuter la commande
            Process process = pb.start();

            // Attendre que le processus se termine
            int exitCode = process.waitFor();

            // Afficher le code de sortie du processus
            System.out.println("Code de sortie : " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
