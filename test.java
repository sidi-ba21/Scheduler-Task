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
