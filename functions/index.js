const functions = require('firebase-functions');
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

// GCP AI Clients
const { DocumentProcessorServiceClient } = require("@google-cloud/documentai");
const { VertexAI } = require("@google-cloud/vertexai");
const { Translate } = require("@google-cloud/translate").v2;
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Firebase Admin
admin.initializeApp();

// --- AI Client Initialization ---
// Use the service account key file to authenticate
const clientOptions = {
  keyFilename: "./service-account-key.json",
};

const documentAiClient = new DocumentProcessorServiceClient(clientOptions);
const vertexAiClient = new VertexAI({
    project: "sample-firebase-ai-app-5a13c",
    location: "us-central1", // Choose a valid location
});
const translateClient = new Translate(clientOptions);

// Initialize GoogleGenerativeAI with API key from environment config
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);


// --- Cloud Functions ---

/**
 * Document AI Processing Function
 *
 * NOTE: This function expects a base64 encoded file content.
 * For production, it's better to upload files to GCS and pass the GCS URI.
 */
exports.processDocument = functions.region('us-central1').https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const { fileContent, mimeType } = req.body; // Expecting base64 content and mimeType
      if (!fileContent || !mimeType) {
        return res.status(400).send("Missing fileContent or mimeType in request body.");
      }

      // The full name of the processor, e.g.:
      // projects/project-id/locations/location/processors/processor-id
      // You'll need to create a processor in the Google Cloud Console.
      const name = "projects/sample-firebase-ai-app-5a13c/locations/us/processors/1c79cb44aea4b240";

      const request = {
        name,
        rawDocument: {
          content: fileContent,
          mimeType,
        },
      };

      const [result] = await documentAiClient.processDocument(request);
      const { document } = result;

      res.status(200).send({ text: document.text });
    } catch (error) {
      console.error("Error in processDocument:", error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  });
});


/**
 * Vertex AI Content Generation Function
 */
exports.generateContent = functions.region('us-central1').https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).send("Missing prompt in request body.");
        }

        // Use the new genAI instance and Gemini 1.5 Flash model
        const generativeModel = genAI.getGenerativeModel({
            model: "gemini-1.5-flash", // Changed to Gemini 1.5 Flash
        });

        const result = await generativeModel.generateContent(prompt);
        const response = result.response;
        const text = response.candidates[0].content.parts[0].text;

        res.status(200).send({ response: text });

    } catch (error) {
        console.error("Error in generateContent:", error);
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  });
});


/**
 * Google Translate Function
 */
exports.translateText = functions.region('us-central1').https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
    }
    try {
        const { text, target } = req.body; // target language code e.g. 'es'
        if (!text || !target) {
            return res.status(400).send("Missing text or target language in request body.");
        }

        const [translation] = await translateClient.translate(text, target);
        res.status(200).send({ translatedText: translation });

    } catch (error) {
        console.error("Error in translateText:", error);
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  });
});