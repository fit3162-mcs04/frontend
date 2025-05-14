"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

import { createResult } from "@/actions/create-result"
import { CsvIcon } from "@/components/icons/csv"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { UploadCloud, XIcon } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "next/navigation"

const MAX_FILE_SIZE = 20 * 1024 * 1024

interface ImageFormProps {
  projectId: string
}

export const ImageForm: React.FC<ImageFormProps> = ({ projectId }) => {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [selectedModel, setSelectedModel] = useState("")
  const { executeAsync: create, isPending: isCreating } = useAction(createResult)
  const router = useRouter()

  // Function handling showing preview image
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0]

      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size cannot exceed 20MB")
        return
      }

      setFile(file)
    }
  }

  // Function handling removing file
  const removeFile = () => {
    setFile(null)
  }

  // Submit handler for form data
  const onSubmit = async () => {
    if (!file) {
      toast.error("Error: File Not Found")
      return
    }

    if (!selectedModel) {
      toast.error("Please select a model")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()

      formData.append("file", file)
      formData.append("model", selectedModel)

      await create({
        name: file.name,
        projectId,
        modelName: selectedModel,
        result: "STROKE",
      })

      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
      //   method: "POST",
      //   body: formData,
      // });

      // const data = await res.json();

      // console.log(data);

      router.refresh()
    } catch (error: unknown) {
      console.error(error)
      toast.error("Failed to process the file")
    } finally {
      setLoading(false)
    }
  }

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-center">
        <label htmlFor="file-upload" className="w-full cursor-pointer">
          <div className="relative flex w-full flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed bg-gray-50 py-16 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-bray-800 dark:hover:bg-gray-600">
            {loading && (
              <div className="max-w-md text-center">
                <Spinner />
                <p className="font-semibold text-sm">Processing Data</p>
                <p className="text-gray-400 text-xs">Do not refresh your page while processing</p>
              </div>
            )}

            {!loading && !file && (
              <div className="text-center">
                <div className="mx-auto max-w-min rounded-md p-2">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <p className="mt-2 text-gray-500 text-sm dark:text-gray-400">
                  <span className="font-semibold">Upload a file</span>
                </p>
                <p className="text-gray-400 text-xs dark:text-gray-400">CSV or Excel (MAX. 20MB)</p>
              </div>
            )}

            {file && (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center">
                  <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
                    <CsvIcon />
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <p className="font-semibold text-sm">{file.name}</p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation() // Prevent triggering file upload
                      removeFile()
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-400 text-xs">Select a model and click submit to process</p>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading || isCreating}
            />
          </div>
        </label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="model-select">Select Model</Label>
        <Select value={selectedModel} onValueChange={setSelectedModel} disabled={loading || isCreating || !file}>
          <SelectTrigger id="model-select" className="w-full">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="svm">Support Vector Machine (SVM)</SelectItem>
            <SelectItem value="knn">K-Nearest Neighbors (KNN)</SelectItem>
            <SelectItem value="ann">Artificial Neural Network (ANN)</SelectItem>
            <SelectItem value="random-forest">Random Forest (RF)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Button size="sm" variant="secondary" disabled={!file || loading || isCreating} onClick={removeFile}>
          Cancel
        </Button>
        <Button size="sm" disabled={!file || loading || !selectedModel || isCreating} onClick={onSubmit}>
          {loading ? "Processing..." : "Submit"}
        </Button>
      </div>
    </div>
  )
}
