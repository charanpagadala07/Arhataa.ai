import { useRef, useState } from "react";
import { FileSpreadsheet, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export function ApplicantUpload({ file, onChange, disabled }) {
  const fileRef = useRef(null);
  const [error, setError] = useState("");

  function selectFile(selectedFile) {
    setError("");
    if (!selectedFile) return;
    if (!selectedFile.name.toLowerCase().endsWith(".xlsx")) {
      setError("Choose an .xlsx Excel workbook. CSV files are not supported by the screening API.");
      onChange(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("The workbook must be 20 MB or smaller.");
      onChange(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    onChange(selectedFile);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <section className="rounded-md border border-border bg-card p-4">
      <Label htmlFor="applicant-file">Applicant Spreadsheet</Label>
      <p className="mt-1 text-xs text-muted-foreground">Upload an .xlsx workbook, up to 20 MB.</p>

      <div
        className={`mt-3 rounded-md border border-dashed border-border bg-muted/40 px-4 py-6 text-center ${disabled ? "opacity-60" : "cursor-pointer"}`}
        onClick={() => !disabled && fileRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          if (!disabled) selectFile(event.dataTransfer.files[0]);
        }}
      >
        <input
          ref={fileRef}
          id="applicant-file"
          type="file"
          accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className="hidden"
          disabled={disabled}
          onChange={(event) => selectFile(event.target.files[0])}
        />
        {file ? (
          <>
            <FileSpreadsheet className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-2 text-sm font-medium">{file.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {(file.size / (1024 * 1024)).toFixed(2)} MB · Ready to screen
            </p>
          </>
        ) : (
          <>
            <Upload className="mx-auto h-5 w-5 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">Choose or drop an Excel workbook</p>
            <p className="mt-1 text-xs text-muted-foreground">The workbook is sent to the screening API.</p>
          </>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        {!file && (
          <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={disabled}>
            Select workbook
          </Button>
        )}
        {file && (
          <Button type="button" variant="outline" size="sm" onClick={() => onChange(null)} disabled={disabled}>
            <X className="h-3.5 w-3.5" />
            Remove file
          </Button>
        )}
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
    </section>
  );
}
