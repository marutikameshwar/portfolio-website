
import PyPDF2

def extract_text(pdf_path, output_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(text)
            
        print(f"Successfully wrote parsed text to {output_path}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_text("resume_tests.pdf", "resume.txt")
