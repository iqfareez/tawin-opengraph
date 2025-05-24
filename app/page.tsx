"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { OgImageParams } from "../types/og-image-params"

export default function Home() {
  const [params, setParams] = useState<OgImageParams>({
    nama: "",
    pasangan: "",
    bg: 1,
    font: 1,
  })

  const [ogUrl, setOgUrl] = useState<string>("")

  useEffect(() => {
    const url = new URL("/api/kad-nama", window.location.origin)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString())
    })
    setOgUrl(url.toString())
  }, [params])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setParams((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: Number.parseInt(value) }))
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Kad Kahwin OG Image Playground</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Parameter Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nama">Nama</Label>
                    <Input id="nama" name="nama" value={params.nama} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="pasangan">Pasangan</Label>
                    <Input id="pasangan" name="pasangan" value={params.pasangan} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bg">Background</Label>
                    <Select value={params.bg.toString()} onValueChange={(value) => handleSelectChange("bg", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select background" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="font">Font</Label>
                    <Select value={params.font.toString()} onValueChange={(value) => handleSelectChange("font", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Image URL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="break-all font-mono">{ogUrl}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(ogUrl)}
                  className="px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Copy
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-[1200/630]">
              <Image src={ogUrl || "/placeholder.svg"} alt="OG Image Preview" fill className="object-cover rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
