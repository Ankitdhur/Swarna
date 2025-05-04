import os
import json
import google.generativeai as genai
import time
import io # To handle in-memory file operations
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv # For .env file
import PyPDF2 # PDF processing library

# --- Flask App Setup ---
app = Flask(__name__)       
CORS(app) # Enable CORS for all routes, allowing frontend requests

# --- Configuration ---
load_dotenv() # Load environment variables from .env file

# !! IMPORTANT: Set these paths correctly relative to where the script runs !!
# Consider using absolute paths or environment variables for robustness
ONTOLOGY_FILE = 'D:/DowryProject/dowryONTO_updated.rdf'
PROMPT_FILE = 'D:/DowryProject/code.txt'
# OUTPUT_DIR is not directly used by the API response, but can be kept if server-side saving is needed
OUTPUT_DIR = 'output'

# --- Gemini API Configuration ---
try:
    # Load API key from environment variable (recommended)
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    if not GOOGLE_API_KEY:
        raise ValueError("GOOGLE_API_KEY environment variable not set.")
    genai.configure(api_key=GOOGLE_API_KEY)
except ValueError as e:
    print(f"Configuration Error: {e}")
    exit()
except Exception as e:
    print(f"An unexpected error occurred during Gemini configuration: {e}")
    exit()

MODEL_NAME = 'gemini-1.5-flash'
generation_config = genai.types.GenerationConfig(
    response_mime_type="application/json",
    temperature=0.2
)
safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
]

# --- Helper Functions (Keep read_file, remove save_output from main flow) ---
def save_output(filename, data, output_dir):
    """
    Saves the extracted data as a JSON file in the output directory.
    Creates the directory if it doesn't exist.
    """
    try:
        os.makedirs(output_dir, exist_ok=True)  # Ensure output directory exists
        filepath = os.path.join(output_dir, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Output saved to: {filepath}")
    except Exception as e:
        print(f"Error saving output to {filepath}: {e}")


def read_file(filepath):
    """Reads the content of a text file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: File not found at {filepath}")
        return None
    except Exception as e:
        print(f"Error reading file {filepath}: {e}")
        return None

def extract_text_from_pdf(pdf_file_stream):
    """Extracts text from a PDF file stream."""
    text = ""
    try:
        reader = PyPDF2.PdfReader(pdf_file_stream)
        num_pages = len(reader.pages)
        for page_num in range(num_pages):
            page = reader.pages[page_num]
            text += page.extract_text()
        if not text:
             print("Warning: No text extracted from PDF. It might be image-based or corrupted.")
        return text
    except PyPDF2.errors.PdfReadError:
        print("Error: Invalid or corrupted PDF file.")
        return None
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return None


# --- Extraction Function using Gemini (Unchanged from original script) ---
def extract_concepts_with_gemini(document_text, ontology_text, prompt_template):
    """
    Extracts concepts from a document using the Gemini API based on an ontology.
    (Your existing function - No changes needed inside this function itself)
    """
    print("Attempting extraction with Gemini...")
    # 1. Construct the full prompt
    full_prompt = f"""{prompt_template}

    ONTOLOGY CONTEXT:
    ```xml
    {ontology_text}
    ```

    DOCUMENT TO ANALYZE:
    ```text
    {document_text}
    ```

    EXTRACTED JSON OUTPUT:"""

    # 2. Initialize the Gemini Model
    try:
        model = genai.GenerativeModel(
            MODEL_NAME,
            generation_config=generation_config,
            safety_settings=safety_settings
        )
    except Exception as e:
        print(f"Error initializing Gemini model: {e}")
        return None # Indicate failure

    # 3. Generate Content
    try:
        print(f"Sending request to Gemini ({MODEL_NAME})...")
        start_time = time.time()
        response = model.generate_content(full_prompt)
        end_time = time.time()
        print(f"Gemini response received in {end_time - start_time:.2f} seconds.")

        # 4. Process the Response
        if not response.candidates:
            print("Warning: Response might have been blocked or empty.")
            if hasattr(response, 'prompt_feedback') and response.prompt_feedback.block_reason:
                print(f"Reason: Blocked - {response.prompt_feedback.block_reason}")
            else:
                print("No candidates found in the response.")
            return None # Indicate failure

        if not response.candidates[0].content.parts:
            print("Warning: Response candidate has no parts.")
            print("--- Gemini Raw Response ---")
            print(response)
            print("--- End Gemini Raw Response ---")
            return None # Indicate failure

        json_string = response.text

        # 5. Parse the JSON String
        try:
            extracted_data = json.loads(json_string)
            print("Successfully parsed JSON response from Gemini.")
            return extracted_data # Return the parsed data
        except json.JSONDecodeError as json_err:
            print(f"Error: Gemini did not return valid JSON. Error: {json_err}")
            print("--- Gemini Raw Response ---")
            print(json_string[:1000] + "..." if len(json_string) > 1000 else json_string)
            print("--- End Gemini Raw Response ---")
            return None # Indicate failure
        except Exception as e:
            print(f"An unexpected error occurred during JSON parsing: {e}")
            print("--- Gemini Raw Response ---")
            print(json_string[:1000] + "..." if len(json_string) > 1000 else json_string)
            print("--- End Gemini Raw Response ---")
            return None # Indicate failure

    except Exception as e:
        print(f"Error during Gemini API call or processing: {e}")
        # Consider logging more specific API errors if possible
        return None # Indicate failure


# --- Flask API Endpoint ---
@app.route('/summary', methods=['POST'])
def handle_extraction():
    print("\nReceived request on /extract")

    # 1. Check if a file was uploaded
    if 'file' not in request.files:
        print("Error: No file part in the request")
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    # 2. Check if the file has a name
    if file.filename == '':
        print("Error: No selected file")
        return jsonify({"error": "No selected file"}), 400

    # 3. Check if the file is a PDF (optional but good practice)
    if not file.filename.lower().endswith('.pdf'):
         print(f"Error: Invalid file type uploaded: {file.filename}")
         return jsonify({"error": "Invalid file type. Please upload a PDF."}), 400

    # 4. Read Ontology and Prompt
    print(f"Reading ontology from: {ONTOLOGY_FILE}")
    ontology_content = read_file(ONTOLOGY_FILE)
    print(f"Reading prompt template from: {PROMPT_FILE}")
    prompt_template_content = read_file(PROMPT_FILE)

    if ontology_content is None or prompt_template_content is None:
        print("Error: Server configuration issue (ontology or prompt not found)")
        return jsonify({"error": "Server configuration error reading ontology or prompt."}), 500

    # 5. Extract Text from PDF
    print(f"Extracting text from PDF: {file.filename}")
    # Pass the file stream directly to the PDF reader
    pdf_text = extract_text_from_pdf(io.BytesIO(file.read())) # Read file content into memory stream

    if pdf_text is None:
         print("Error: Failed to extract text from PDF.")
         return jsonify({"error": "Failed to extract text from the PDF file. It might be invalid, corrupted, or image-based."}), 400
    if not pdf_text.strip():
         print("Warning: Extracted text from PDF is empty.")
         # Decide if you want to proceed or return an error
         # return jsonify({"error": "No text content found in the PDF."}), 400


    print(f"Successfully extracted {len(pdf_text)} characters from PDF.")

    # 6. Call Gemini Extraction Logic
    extracted_data = extract_concepts_with_gemini(
        pdf_text,
        ontology_content,
        prompt_template_content
    )

    # 7. Return Response
    if extracted_data is not None:
        print("Extraction successful. Returning JSON data.")
        # Optionally save the file server-side if needed *before* returning
        save_output(f"{os.path.splitext(file.filename)[0]}_extraction.json", extracted_data, OUTPUT_DIR)
        return jsonify(extracted_data), 200 # Success                
    else:
        print("Extraction failed.")
        # Provide a more generic error to the client for security/simplicity
        return jsonify({"error": "Failed to extract information using the AI model."}), 500 # Internal Server Error

# --- Main Execution ---
if __name__ == "__main__":
    print("Starting Flask server for extraction API...")
    # You can change the host and port as needed
    # host='0.0.0.0' makes it accessible on your network
    # debug=True enables auto-reloading and detailed error pages (DO NOT use in production)
    app.run(host='0.0.0.0', port=5000, debug=True)