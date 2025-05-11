"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
// import { uploadImage } from "@/actions/user/upload-profile-image";
import { Spinner } from "@/components/ui/spinner"
import { UploadCloud } from "lucide-react"
import { useRouter } from "next/navigation"

const MAX_FILE_SIZE = 5 * 1024 * 1024

export const ImageForm = () => {
  const [loading, setLoading] = useState(false)

  const [imageSrc, setImageSrc] = useState("")

  const [file, setFile] = useState<File | null>(null)

  const router = useRouter()

  // Function handling showing preview image
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0]

      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size cannot exceed 5MB")
        return
      }

      setFile(file)
      const src = URL.createObjectURL(file)
      setImageSrc(src)
    }
  }

  // Function handling removing preview image
  const removeImagePreview = () => {
    URL.revokeObjectURL(imageSrc) // Clean up the object URL
    setImageSrc("")
    setFile(null)
  }

  //
  const onSubmit = async () => {
    if (!file) {
      toast.error("Error: File Not Found")
      return
    }

    try {
      setLoading(true)

      // await uploadImage({
      //   file: file,
      // });

      // Show a success toast
      toast.success("Successfully uploaded the profile image!")

      router.refresh()
    } catch (error: unknown) {
      console.error(error)
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
    <>
      <div className="flex w-full items-center justify-center">
        <div className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed bg-gray-50 py-16 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-bray-800 dark:hover:bg-gray-600">
          {loading && (
            <div className=" max-w-md text-center">
              <Spinner />
              <p className=" font-semibold text-sm">Uploading Picture</p>
              <p className=" text-gray-400 text-xs">Do not refresh your page while performing upload</p>
            </div>
          )}

          {!loading && !imageSrc && (
            <div className="text-center">
              <div className="mx-auto max-w-min rounded-md p-2">
                <UploadCloud className="h-5 w-5" />
              </div>
              <p className="mt-2 text-gray-500 text-sm dark:text-gray-400">
                <span className="font-semibold">Upload a file</span>
              </p>
              <p className="text-gray-400 text-xs dark:text-gray-400">CSV or Excel (MAX. 5MB)</p>
            </div>
          )}

          {imageSrc && (
            <div className="text-center">
              <Image
                width={500}
                height={500}
                src={imageSrc}
                className="mx-auto mt-2 mb-3 max-h-16 w-full rounded-full object-contain opacity-70"
                alt="uploaded image"
              />
              <p className=" font-semibold text-sm">Picture Uploaded</p>
              <p className=" text-gray-400 text-xs">Next, click submit to upload the picture</p>
            </div>
          )}
          <input
            type="file"
            accept="application/csv"
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button
          size="sm"
          variant="secondary"
          disabled={!imageSrc || loading}
          onClick={removeImagePreview}
          className="my-1"
        >
          Cancel
        </Button>
        <Button size="sm" disabled={!imageSrc || loading} onClick={onSubmit} className="my-1">
          {loading ? "Uploading..." : "Submit"}
        </Button>
      </div>
    </>
  )
}
