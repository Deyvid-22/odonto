"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import notImage from "../../../../../../public/foto1.png";
import { Loader, Upload } from "lucide-react";
import { toast } from "sonner";

interface AvatarProfileProp {
  avatarUrl: string | null;
  userId: string;
}

export function AvatarProfile({ avatarUrl, userId }: AvatarProfileProp) {
  const [previewImage, setPreviewImage] = useState(avatarUrl);
  const [loading, setLoading] = useState(false);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      const image = e.target.files[0];
      console.log(image);
      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.error("Formato de imagem inválido");
        return;
      }

      const newFilename = `${userId}`;
      const newFile = new File([image], newFilename, { type: image.type });

      await uploadImage(newFile);

      setLoading(false);
    }
  }

  async function uploadImage(image: File): Promise<string | null> {
    try {
      toast("Estamos enviando sua imagem...");

      const formData = new FormData();
      formData.append("file", image);
      formData.append("userId", userId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Erro ao enviar imagem");
        return null;
      }

      toast("Imagem alterada com sucesso!");
      return data.secure_url as string; // caso você queira pegar a URL da imagem no Cloudinary
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao enviar a imagem");
      return null;
    }
  }

  return (
    <div className="relative w-40 h-40 rounded-full overflow-hidden">
      <div className="relative w-full h-full flex justify-center items-center">
        <span className="absolute bg-slate-200 cursor-pointer z-[2] p-2 shadow-2xl rounded-full">
          {loading ? (
            <Loader size={16} color="#131313" className="animate-spin" />
          ) : (
            <Upload size={16} color="#131313" />
          )}
        </span>
        <input
          type="file"
          className="opacity-0 cursor-pointer relative z-50 w-48"
          onChange={handleChange}
        />
      </div>
      {previewImage && (
        <Image
          src={previewImage}
          alt="Foto de perfil da clinica"
          fill
          className="w-full h-48 object-cover bg-slate-200"
          quality={100}
          priority
          sizes="(max-width: 400px) 100vw, (max-width: 1025px) 75vw, 60vw"
        />
      )}
      {!previewImage && (
        <Image
          src={notImage}
          alt="Foto de perfil da clinica"
          fill
          className="w-full h-48 object-cover bg-slate-200"
          quality={100}
          priority
          sizes="(max-width: 400px) 100vw, (max-width: 1025px) 75vw, 60vw"
        />
      )}
    </div>
  );
}
